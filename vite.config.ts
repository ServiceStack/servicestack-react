import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

import fs from 'fs'
import { env } from 'process'
const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:5001';
const apiUrl = process.env.NODE_ENV === 'development' ? target : ''
const baseUrl = process.env.NODE_ENV === 'development'
    ? "https://locahost:5173"
    : process.env.DEPLOY_HOST ? `https://${process.env.DEPLOY_HOST}` : undefined


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: 'dist',
      rollupTypes: true,
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname,'src/index.ts'),
      name: 'ServiceStackReact',
      fileName: (fmt,name) => fmt == 'es' ? `servicestack-react.mjs` : `servicestack-react.${fmt}.cjs`,
    },
    rollupOptions: {
      external:['react','react-dom','react/jsx-runtime','react-router-dom','@servicestack/client'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react-router-dom': 'ReactRouterDOM',
          '@servicestack/client': 'Servicestack',
          '@servicestack/react': 'ServicestackReact'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
        server: {
            proxy: {
                '^/api': {
                    target,
                    secure: false
                }
            },
            port: 5173,
            // ...(fs.existsSync(keyFilePath) && fs.existsSync(certFilePath) ? {
            //     https: {
            //         key: fs.readFileSync(keyFilePath),
            //         cert: fs.readFileSync(certFilePath),
            //     }
            // } : {})
        }

})
