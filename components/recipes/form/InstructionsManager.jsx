import React from 'react';
import { TrashIcon } from '@components/ui/Icons';
import { Button } from '@components/ui/Button';
import { useSettings } from '@context/SettingsContext';

/**
 * Manages the rendering and interaction for the instructions list.
 * Expects a simple Array<String> data structure.
 */
export function InstructionsManager({ instructions, onChange, onAdd, onRemove, error }) {
  const { t } = useSettings();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.createRecipe.instrTitle}
        </label>
        {error && (
          <span className="text-xs text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded border border-red-100 dark:border-red-800 font-medium">
            {error}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {instructions.map((step, index) => (
          <div key={index} className="flex gap-3 items-start group">
            {/* Visual index is decoupled from data persistence (1-based for UI) */}
            <span className="mt-2.5 text-xs font-bold text-gray-400 dark:text-gray-500 w-12 text-right select-none">
              {t.createRecipe.step} {index + 1}
            </span>

            <div className="flex-grow relative">
              <textarea
                value={step}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder={`${t.createRecipe.stepPlaceholder} ${index + 1}...`}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-300 dark:placeholder:text-gray-500"
              />
            </div>

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="mt-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Eliminar paso"
              // Prevent removing the last item to ensure form usability
              disabled={instructions.length <= 1}
              aria-disabled={instructions.length <= 1}
            >
              <TrashIcon className={`w-5 h-5 ${instructions.length <= 1 ? 'opacity-30' : ''}`} />
            </button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={onAdd}
        className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm pl-0 hover:bg-transparent font-medium"
      >
        {t.createRecipe.addStep}
      </Button>
    </div>
  );
}