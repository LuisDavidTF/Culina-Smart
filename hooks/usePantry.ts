import { useLiveQuery } from 'dexie-react-hooks';
import { db, type LocalPantryItem } from '@/lib/db';
import { useEffect } from 'react';

export function usePantry() {
    const items = useLiveQuery(() => db.pantryItems.toArray());

    const addItem = async (item: Omit<LocalPantryItem, 'id' | 'isSynced'>) => {
        try {
            await db.pantryItems.add({
                ...item,
                isSynced: false,
            });
        } catch (error) {
            console.error('Failed to add item to pantry:', error);
            throw error;
        }
    };

    const updateItem = async (id: number, updates: Partial<LocalPantryItem>) => {
        try {
            await db.pantryItems.update(id, {
                ...updates,
                isSynced: false
            });
        } catch (error) {
            console.error('Failed to update pantry item:', error);
            throw error;
        }
    };

    const removeItem = async (id: number) => {
        try {
            await db.pantryItems.delete(id);
        } catch (error) {
            console.error('Failed to delete pantry item:', error);
            throw error;
        }
    };

    // Helper to get items by ingredient ID (handling multiple batches)
    const getItemsByIngredient = async (ingredientId: number) => {
        return await db.pantryItems.where('ingredientId').equals(ingredientId).toArray();
    };

    const syncFromBackend = async () => {
        // Stub: Implement backend fetch here
        console.log('Bootstrapping: Syncing pantry from backend...');
        // const response = await fetch('/api/pantry');
        // const data = await response.json();
        // await db.pantryItems.bulkAdd(data);
    };

    // Bootstrapping: Check if local DB is empty, if so, try to sync from backend
    useEffect(() => {
        const init = async () => {
            try {
                const count = await db.pantryItems.count();
                if (count === 0 && typeof navigator !== 'undefined' && navigator.onLine) {
                    await syncFromBackend();
                }
            } catch (error) {
                console.error('Bootstrapping failed:', error);
            }
        };
        init();
    }, []);

    return {
        items: items || [], // Ensure it always returns an array
        addItem,
        updateItem,
        removeItem,
        getItemsByIngredient,
        syncFromBackend
    };
}
