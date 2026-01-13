'use client'

import { RecipeForm } from '@components/recipes/RecipeForm';

export default function CreateRecipePage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <RecipeForm />
      </div>
    </div>
  );
}