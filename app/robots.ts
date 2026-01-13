import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/edit-recipe/', '/create-recipe/'],
        },
        sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://culinasmart.com'}/sitemap.xml`,
    }
}
