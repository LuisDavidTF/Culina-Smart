'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { FormInput } from '@components/ui/FormInput';
import { Button } from '@components/ui/Button';
import { ErrorState } from '@components/ui/ErrorState';
import { useSettings } from '@context/SettingsContext';

// Feature Components
import { InstructionsManager } from './form/InstructionsManager';
import { IngredientsManager } from './form/IngredientsManager';
import { MagicGenerator } from './form/MagicGenerator';

// Logic Hook
import { useRecipeForm } from '@hooks/useRecipeForm';

export function RecipeForm({ recipeId }) {
  const {
    formData,
    status,
    errors,
    apiError,
    handlers
  } = useRecipeForm(recipeId);
  const { t } = useSettings();

  const isEditMode = !!recipeId;

  // Refs for UX enhancements (scroll to error) can be implemented here if needed

  if (status === 'loading') {
    return <div className="p-12 text-center text-gray-500 dark:text-gray-400 animate-pulse">Cargando datos de la receta...</div>;
  }

  if (status === 'error') {
    return <ErrorState message={apiError} onRetry={handlers.retry} />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 mb-20 transition-colors duration-300">
      <div className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {isEditMode ? t.createRecipe.editTitle : t.createRecipe.newTitle}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {isEditMode ? t.createRecipe.editSubtitle : t.createRecipe.newSubtitle}
        </p>
      </div>

      {/* AI Feature - Only for Create Mode */}
      {!isEditMode && (
        <div className="mb-8">
          <MagicGenerator onDraftGenerated={handlers.handleDraftLoaded} />
        </div>
      )}

      <form onSubmit={handlers.submit} className="space-y-8">

        {/* --- General Information Section --- */}
        <div className="space-y-5">
          <FormInput
            id="name"
            label={t.createRecipe.name}
            value={formData.name}
            onChange={(e) => handlers.setFieldValue('name', e.target.value)}
            error={errors.name}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.createRecipe.desc}</label>
            <textarea
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              value={formData.description}
              onChange={(e) => handlers.setFieldValue('description', e.target.value)}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              id="prepTime"
              label={t.createRecipe.prepTime}
              type="number"
              value={formData.preparationTime}
              onChange={(e) => handlers.setFieldValue('preparationTime', e.target.value)}
              error={errors.preparationTime}
            />
            <FormInput
              id="imageUrl"
              label={t.createRecipe.imgUrl}
              value={formData.imageUrl}
              onChange={(e) => handlers.setFieldValue('imageUrl', e.target.value)}
              error={errors.imageUrl}
            />
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-700" />

        {/* --- Ingredients Section --- */}
        <IngredientsManager
          ingredients={formData.ingredients}
          onChange={handlers.handleIngredientChange}
          onAdd={() => handlers.modifyList('ingredients', 'add')}
          onRemove={(index) => handlers.modifyList('ingredients', 'remove', index)}
          error={errors.ingredientsRoot}
        />

        <hr className="border-gray-100 dark:border-gray-700" />

        {/* --- Instructions Section (Strict Array Handling) --- */}
        <InstructionsManager
          instructions={formData.instructions}
          onChange={handlers.handleInstructionChange}
          onAdd={() => handlers.modifyList('instructions', 'add')}
          onRemove={(index) => handlers.modifyList('instructions', 'remove', index)}
          error={errors.instructionsRoot}
        />

        <hr className="border-gray-100 dark:border-gray-700" />

        {/* --- Metadata Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-700/30 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              {t.createRecipe.type}
            </label>
            <select
              value={formData.type}
              onChange={(e) => handlers.setFieldValue('type', e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-100"
            >
              <option value="breakfast">{t.createRecipe.breakfast}</option>
              <option value="lunch">{t.createRecipe.lunch}</option>
              <option value="dinner">{t.createRecipe.dinner}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              {t.createRecipe.visibility}
            </label>
            <select
              value={formData.visibility}
              onChange={(e) => handlers.setFieldValue('visibility', e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-100"
            >
              <option value="public">{t.createRecipe.public}</option>
              <option value="private">{t.createRecipe.private}</option>
            </select>
          </div>
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

        {/* --- Action Buttons --- */}
        <div className="flex gap-4 pt-4">
          <Link
            href="/"
            className="flex-1 text-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
          >
            {t.createRecipe.cancel}
          </Link>
          <Button
            type="submit"
            isLoading={status === 'submitting'}
            className="flex-1 py-3 text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            {isEditMode ? t.createRecipe.save : t.createRecipe.publish}
          </Button>
        </div>

      </form>
    </div>
  );
}