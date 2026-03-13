import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    root: 'src',
    build: {
        emptyOutDir: true,
        outDir: '../renderer',
        target: 'safari15',
        minify: 'esbuild',
        sourcemap: false,
        rollupOptions: {
            external: [
                './vendor/neutralino/neutralino.mjs',
                '../vendor/neutralino/neutralino.mjs',
                '../../vendor/neutralino/neutralino.mjs'
            ],
        },
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'assets/icon.png',
                    dest: 'assets'
                },
                {
                    src: 'vendor/neutralino/neutralino.mjs',
                    dest: 'vendor/neutralino/'
                }
            ]
        })
    ]
});