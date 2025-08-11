import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [ react() ],
  server: {
    allowedHosts: [ "ec2-3-131-91-133.us-east-2.compute.amazonaws.com" ],
    host: '0.0.0.0'
  }
});
