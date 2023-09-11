/// <reference types="vitest" />

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import PKG from './package.json'
import { resolve } from 'path'

export default defineConfig({
	server: {
		// please make it standard!
		port: 3000,
	},

	resolve: {
		alias: {
			'@lib': resolve(__dirname, './src/lib/index'),
		},
	},

	plugins: [
		dts({
			entryRoot: './src',
		}),
	],

	build: {
		rollupOptions: {
			external: Object.keys(PKG.peerDependencies),
		},

		lib: {
			fileName: (fmt, name) => [name, fmt, 'js'].join('.'),
			entry: resolve('./src/main.ts'),
			name: 'BloggerFeeds',
		},

		copyPublicDir: false,
	},

	test: {
		globals: true,
		outputFile: './www/tests/index.html',

		dir: './tests',

		reporters: ['default', 'basic', 'json', 'html'],
		cache: {
			dir: '../node_modules/.vitest',
		},

		coverage: {
			reporter: ['html', 'html-spa', 'json', 'text'],
			reportsDirectory: './www/coverage',
			enabled: true, // only prod
			provider: 'v8',
		},
	},
})
