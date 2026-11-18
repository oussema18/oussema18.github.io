import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { projects } from './src/data/projects'

function githubPagesRoutes(): Plugin {
  return {
    name: 'github-pages-routes',
    apply: 'build',
    async writeBundle({ dir }) {
      if (!dir) return

      const entry = join(dir, 'index.html')
      await Promise.all([
        copyFile(entry, join(dir, '404.html')),
        ...projects.map(async ({ slug }) => {
          const routeDir = join(dir, 'projects', slug)
          await mkdir(routeDir, { recursive: true })
          await copyFile(entry, join(routeDir, 'index.html'))
        }),
      ])
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesRoutes()],
  base: '/', // For a username.github.io repository
})
