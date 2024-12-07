// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja', prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '自動麻雀点数計算アプリ' },
        { property: 'og:image', content: 'https://mahjong-point-front.vercel.app/ogp.jpg', },
        { hid: 'og-url', property: 'og:url', content: 'https://mahjong-point-front.vercel.app' },
        {
          hid: 'description',
          name: 'description',
          content: '麻雀の点数計算を初心者の方にも優しく簡単にできるサイトです。初心者の方や点数計算が苦手な方は是非ご活用ください。'
        },
        {
          hid: 'description',
          name: 'keywords',
          content: '麻雀,ドラ表示牌,点数,点数計算,自動,麻雀点数計算,麻雀牌'
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: '麻雀の点数計算を初心者の方にも優しく簡単にできるサイトです。初心者の方や点数計算が苦手な方は是非ご活用ください。',
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
    '@nuxtjs/robots',
  ],
  runtimeConfig: {
    public: {
      apiUrl: '',
    },
  },
  gtag: { id: 'G-NKQTEC146J' },
})
