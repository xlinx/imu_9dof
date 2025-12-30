import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import mkcert from 'vite-plugin-mkcert'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),mkcert({hosts:['xmax.local']})],
  server: {
    https: true,
    port: 5555,

    // disableHostCheck: true,
    // open: false,
    host: true,
    allowedHosts: [  'xmax.local'],
  }
})
