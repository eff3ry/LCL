import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    root: 'src',
    server: {
        port: 3000,
        strictPort: true,
        fs: {
            strict: false
        }
    },
    build: {
        emptyOutDir: true,
        outDir: '../public',
        target: 'safari15',
        minify: 'esbuild',
        sourcemap: false,
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'assets/icon.png',
                    dest: 'assets'
                }
            ]
        })
    ]
});