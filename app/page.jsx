import { RecipeFeed } from '@components/recipes/RecipeFeed';

async function getInitialRecipes() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Revalidates cache every 60 seconds.
    // Ensure your API supports public access for this to work for SEO.
    const res = await fetch(`${baseUrl}/recipes`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      // If 404/500, return empty to allow client-side to try or show empty state
      console.error("Failed to fetch initial recipes", res.status);
      return [];
    }

    // Check content type in case 204 No Content
    if (res.status === 204) return { data: [], nextCursor: null };

    const data = await res.json();
    return data; // Returns { data: [...], nextCursor: ... }
  } catch (error) {
    console.error("Error fetching initial recipes:", error);
    return { data: [], nextCursor: null };
  }
}

export default async function HomePage() {
  const initialData = await getInitialRecipes();
  return <RecipeFeed initialData={initialData} />;
}
