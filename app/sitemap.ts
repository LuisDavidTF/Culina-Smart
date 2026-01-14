import { MetadataRoute } from 'next'
import { slugify } from '@utils/slugify';

async function getAllRecipes() {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];

    try {
        // Robust API URL construction
        let endpoint = '/api/recipes';
        if (apiUrl.includes('/api/v1')) {
            endpoint = '/recipes';
        }

        // Fetch all recipes
        const res = await fetch(`${apiUrl}${endpoint}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) return [];

        const data = await res.json();
        return data.data || data || [];
    } catch (error) {
        console.error("Sitemap fetch error:", error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://culinasmart.vercel.app';
    const recipes = await getAllRecipes();

    const recipeUrls = recipes.map((recipe) => {
        const item: any = {
            url: `${baseUrl}/recipes/${slugify(recipe.name)}/${recipe.id}`,
            lastModified: new Date(recipe.updated_at || recipe.created_at || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        };

        // Google Image Sitemap extension
        if (recipe.image_url) {
            item.images = [recipe.image_url];
        }

        return item;
    });

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1,
        },
        {
            url: `${baseUrl}/recipes`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/register`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...recipeUrls,
    ]
}
