/// <reference types="vitest" />

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import PKG from '../package.json'
import { resolve } from 'path'

export const LIB_BUILD = defineConfig({
	resolve: {
		alias: {
			'@lib': resolve(__dirname, '../lib'),
		},
	},

	plugins: [
		dts({
			insertTypesEntry: true,
			exclude: ['node_modules/**', 'demo/**'],
		}),
	],

	build: {
		rollupOptions: {
			external: Object.keys(PKG.peerDependencies),

			input: {
				index: resolve('lib/api/index'),
				core: resolve('lib/api/core'),
				client: resolve('lib/api/client'),
				helpers: resolve('lib/api/helpers'),
			},

			output: {
				entryFileNames: '[name].js',
			},
		},

		lib: {
			entry: 'lib/api/index.ts',
			formats: ['es'],
		},

		copyPublicDir: false,
	},

	/* test: {
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
	}, */
})
