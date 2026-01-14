import { RecipeFeed } from '@components/recipes/RecipeFeed';

import { RecipeService } from '@/lib/services/recipes';

async function getInitialRecipes() {
  try {
    // Revalidates cache every 60 seconds.
    // Ensure your API supports public access for this to work for SEO.
    // Service layer calls might need to handle 'next' config if passed?
    // fetchApi in Service doesn't support passing 'next' config dynamically yet.
    // However, for now let's just use the default fetch behavior of the service (no-cache by default usually unless configured).
    // The service uses `fetch` so Next.js extends it.
    // To support `next: { revalidate: 60 }`, I might need to update Service layer to accept fetch options.

    // For now, simple call:
    const data = await RecipeService.getAll({}, { next: { tags: ['recipes'], revalidate: 60 } });
    return data;
  } catch (error) {
    console.error("Error fetching initial recipes:", error);
    return { data: [], meta: { nextCursor: null } };
  }
}

export default async function HomePage() {
  const initialData = await getInitialRecipes();
  return <RecipeFeed initialData={initialData} />;
}
