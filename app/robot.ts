import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Menutup akses ke route API jika ada
    },
    sitemap: 'https://pakju.com/sitemap.xml', // Sesuaikan dengan domain kamu
  }
}