import { MetadataRoute } from 'next'
import { projects } from '@/lib/data'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://webiss.shop'
  
  // Static routes
  const staticRoutes = [
    '',
    '/team',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
 
  // Dynamic portfolio routes
  const portfolioRoutes = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
 
  return [...staticRoutes, ...portfolioRoutes]
}
