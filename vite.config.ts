import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');
        return path.resolve(__dirname, 'src/assets', filename);
      }
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production' || command === 'build';

  return {
    plugins: [figmaAssetResolver(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
    build: {
      minify: 'esbuild',
      target: 'es2020',
      sourcemap: false,
      brotliSize: true,
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      reportCompressedSize: true,
      // 🔧 حل مشكلة recharts و CommonJS
      commonjsOptions: {
        include: [/recharts/, /node_modules/],
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          sourcemap: false,
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('recharts') || id.includes('d3')) {
                return 'chart-vendor';
              }
              if (id.includes('@mui') || id.includes('emotion')) {
                return 'ui-vendor';
              }
              return 'vendor';
            }
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },
    server: {
      preload: true,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
    esbuild: {
      legalComments: 'none',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      treeShaking: true,
      drop: isProduction ? ['console', 'debugger'] : [],
      pure: isProduction ? ['console.log', 'console.warn'] : [],
    },
    optimizeDeps: {
      include: ['recharts', 'lucide-react'], // تم إزالة motion-utils
    },
  };
});
