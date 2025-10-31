import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

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
      external:['react','react-dom','react/jsx-runtime','@servicestack/client'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
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
  }
})
