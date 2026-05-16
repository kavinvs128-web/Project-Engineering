import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        bypass: (req, res) => {
          if (req.url === '/api/login' && req.method === 'POST') {
            const body = []
            req.on('data', (chunk) => body.push(chunk))
            req.on('end', () => {
              const { email, password } = JSON.parse(Buffer.concat(body).toString())
              if (email === 'admin@formflow.io' && password === 'password123') {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ user: { id: 1, email: 'admin@formflow.io', name: 'Admin User' }, token: 'mock-jwt-token' }))
              } else {
                res.writeHead(401, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Invalid credentials' }))
              }
            })
            return true
          }
          if (req.url === '/api/orders' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify([
              { id: 1, name: 'Premium Wireless Headphones', status: 'Delivered', date: '2024-03-15' },
              { id: 2, name: 'Mechanical Keyboard (RGB)', status: 'In Transit', date: '2024-03-18' },
              { id: 3, name: 'Ergonomic Standing Desk', status: 'Processing', date: '2024-03-19' }
            ]))
            return true
          }
        }
      }
    }
  }
})
