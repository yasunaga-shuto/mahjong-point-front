// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja', prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '麻雀点数計算' },
        { property: 'og:image', content: 'https://mahjong-point-front.vercel.app/ogp.jpg', },
        { hid: 'og-url', property: 'og:url', content: 'https://mahjong-point-front.vercel.app' },
        {
          hid: 'og-description',
          property: 'og:description',
          content: '麻雀の点数計算をシンプルにできるサイトです。初心者の方や点数計算が苦手な方、是非ご活用ください。',
        },
        {
          hid: "twitter-card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter-url",
          name: "twitter:url",
          content: "https://mahjong-point-front.vercel.app/",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://mahjong-point-front.vercel.app/ogp.jpg",
        },
        {
          hid: "twitter-image-src",
          name: "twitter:image:src",
          content: "https://mahjong-point-front.vercel.app/ogp.jpg",
        },
        {
          hid: "twitter-image-alt",
          name: "twitter:image:alt",
          content: "麻雀点数計算",
        },
        {
          hid: "twitter-text-title",
          name: "twitter:text:title",
          content: "麻雀点数計算",
        },
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    'nuxt-gtag',
    'nuxt-og-image',
  ],
  runtimeConfig: {
    public: {
      apiUrl: '',
    },
  },
  gtag: { id: 'G-NKQTEC146J' },
})
