import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // استخدام "0.0.0.0" بدلاً من "::" لزيادة التوافق
    port: 8080,
    cors: {
      origin: mode === 'development' ? '*' : process.env.VITE_ALLOWED_ORIGIN || '*', // تحديد المصدر بناءً على البيئة
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    },
  },
  preview: {
    port: 8080,
    cors: {
      origin: process.env.VITE_ALLOWED_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    },
  },
  plugins: [
    react(),
    mode === 'development' ? componentTagger() : null, // تحسين شرط إضافة `lovable-tagger`
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: mode === 'development', // تعطيل sourcemaps في الإنتاج لتحسين الأداء
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // فصل مكتبات الطرف الثالث لتسريع التحميل
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}));