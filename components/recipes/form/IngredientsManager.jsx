import React from 'react';
import { TrashIcon } from '@components/ui/Icons';
import { Button } from '@components/ui/Button';
import { useSettings } from '@context/SettingsContext';

export function IngredientsManager({ ingredients, onChange, onAdd, onRemove, error }) {
  const { t } = useSettings();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.createRecipe.ingrTitle}
        </label>
        {error && (
          <span className="text-xs text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded border border-red-100 dark:border-red-800 font-medium">
            {error}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {ingredients.map((ing, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-start">
            {/* Ingredient Name */}
            <div className="col-span-5">
              <input
                type="text"
                placeholder={t.createRecipe.ingrName}
                value={ing.name}
                onChange={(e) => onChange(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            {/* Quantity */}
            <div className="col-span-3">
              <input
                type="text"
                placeholder={t.createRecipe.ingrQty}
                value={ing.quantity}
                onChange={(e) => onChange(index, 'quantity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            {/* Unit */}
            <div className="col-span-3">
              <input
                type="text"
                placeholder={t.createRecipe.ingrUnit}
                value={ing.unit_of_measure}
                onChange={(e) => onChange(index, 'unit_of_measure', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            {/* Actions */}
            <div className="col-span-1 flex justify-center pt-2">
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                disabled={ingredients.length <= 1}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={onAdd}
        className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm pl-0 hover:bg-transparent font-medium"
      >
        {t.createRecipe.addIngr}
      </Button>
    </div>
  );
}