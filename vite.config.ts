import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 允许来自局域网的访问
    port: 5173, // 可以根据需要修改端口
    open: true, // 启动时自动打开浏览器
  },
})
