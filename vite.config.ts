import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port:8081,
    proxy: {
      '^/api.php/': {
        target: 'http://pb-dzh.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api.php/, '/api.php'),
      },
    },
  }, 
})
