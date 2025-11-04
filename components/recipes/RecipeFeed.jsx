'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApiClient } from '@hooks/useApiClient';
import { useToast } from '@context/ToastContext';
import { RecipeCard } from '@components/recipes/RecipeCard';
import { Modal } from '@components/ui/Modal';
import { Button } from '@components/ui/Button';
import { Spinner } from '@components/ui/Spinner';
import { LoadingState } from '@components/ui/LoadingState';
import { ErrorState } from '@components/ui/ErrorState'; // Importa ErrorState

// 1. Ya no aceptamos props iniciales
export function RecipeFeed() {
  // --- Estados ---
  const [status, setStatus] = useState('loading'); // ¡De vuelta!
  const [recipes, setRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSlowLoadMessage, setShowSlowLoadMessage] = useState(false);
  
  // Paginación
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Para el spinner de paginación

  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, recipe: null });

  // --- Hooks ---
  const api = useApiClient();
  const router = useRouter();
  const { showToast } = useToast();
  const observer = useRef(null);
  const sentinelRef = useRef(null);

  const stateRef = useRef({ isLoadingMore, hasMore, nextCursor });
  stateRef.current = { isLoadingMore, hasMore, nextCursor };

  // 2. Lógica de "Carga Lenta" (¡De vuelta!)
  useEffect(() => {
    let timer;
    if (status === 'loading') {
      timer = setTimeout(() => {
        // Solo muestra el mensaje si sigue cargando
        setStatus(currentStatus => {
          if (currentStatus === 'loading') {
            setShowSlowLoadMessage(true);
          }
          return currentStatus;
        });
      }, 3000); // Tu lógica de 3 segundos (la ajusté de 7s)
    } else {
      setShowSlowLoadMessage(false);
    }
    return () => clearTimeout(timer);
  }, [status]);

  // 3. Carga de Datos Inicial (¡De vuelta!)
  const fetchInitialRecipes = useCallback(() => {
    setStatus('loading');
    setErrorMessage('');
    setShowSlowLoadMessage(false);
    
    // El backend usa 10 por defecto, lo cual está bien.
    api.getRecipes() 
      .then(data => {
        setRecipes(data.data || []);
        setNextCursor(data.nextCursor);
        setHasMore(!!data.nextCursor);
        setStatus('success');
      })
      .catch(error => {
        setErrorMessage(error.message);
        setStatus('error');
      });
  }, [api]);

  // 4. useEffect para Carga Inicial
  useEffect(() => {
    fetchInitialRecipes();
  }, [fetchInitialRecipes]);

  // 5. Carga de Paginación (Tu código nuevo, está perfecto)
  const fetchMoreRecipes = useCallback(async () => {
    if (stateRef.current.isLoadingMore || !stateRef.current.hasMore) return;
    
    setIsLoadingMore(true);
    try {
      const params = {};
      if (stateRef.current.nextCursor) {
        params.cursorId = stateRef.current.nextCursor.id;
        params.cursorDate = stateRef.current.nextCursor.createdAt;
      }
      
      const { data: newRecipes, nextCursor: newNextCursor } = await api.getRecipes(params);
      
      setRecipes(prevRecipes => {
        const newRecipeIds = new Set(prevRecipes.map(r => r.id));
        const uniqueNewRecipes = newRecipes.filter(r => !newRecipeIds.has(r.id));
        return [...prevRecipes, ...uniqueNewRecipes];
      });

      setNextCursor(newNextCursor);
      setHasMore(!!newNextCursor && newRecipes.length > 0);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsLoadingMore(false);
    }
  }, [api, showToast]);

  // 6. useEffect para Scroll Infinito
  useEffect(() => {
    if (status !== 'success' || !hasMore) return; // No observar si está cargando o no hay más

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchMoreRecipes();
      }
    });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.current.observe(currentSentinel);
    }

    return () => {
      if (observer.current && currentSentinel) {
        observer.current.unobserve(currentSentinel);
      }
    };
  }, [status, hasMore, fetchMoreRecipes]); // Depende del status y 'hasMore'

  // 7. Acciones (tu lógica está bien, solo un cambio)
  const handleEdit = (recipe) => router.push(`/edit-recipe/${recipe.id}`);
  const handleDelete = (recipe) => setDeleteModalState({ isOpen: true, recipe: recipe });
  
  const confirmDelete = async () => {
    if (!deleteModalState.recipe) return;
    try {
      await api.deleteRecipe(deleteModalState.recipe.id);
      showToast('Receta eliminada exitosamente', 'success');
      // Actualiza el estado localmente, es más rápido que 'fetchInitialRecipes'
      setRecipes(currentRecipes => currentRecipes.filter(r => r.id !== deleteModalState.recipe.id));
      setDeleteModalState({ isOpen: false, recipe: null });
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  // 8. Lógica de Renderizado (¡De vuelta a 'status'!)
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <LoadingState showSlowLoadMessage={showSlowLoadMessage} />;
      
      case 'error':
        return <ErrorState message={errorMessage} onRetry={fetchInitialRecipes} />;
      
      case 'success':
        if (recipes.length === 0) {
          return (
            <div className="text-center py-16">
              {/* ... tu JSX de 'No hay recetas' ... */}
            </div>
          );
        }
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                viewHref={`/recipes/${recipe.id}`} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Descubre Recetas</h1>
        <p className="text-lg text-gray-600 mt-1">Inspiración diaria para tus comidas.</p>
      </div>
      
      <div className="transition-opacity duration-300">
        {renderContent()}
      </div>
      
      {/* 9. Indicadores de Paginación */}
      <div ref={sentinelRef}></div>

      {/* Muestra el spinner solo si estamos cargando MÁS (no en la carga inicial) */}
      {isLoadingMore && <Spinner />}

      {!hasMore && recipes.length > 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay más recetas que mostrar.</p>
        </div>
      )}

      {/* ... (Tu Modal de Eliminación se queda igual) ... */}
    </div>
  );
}
