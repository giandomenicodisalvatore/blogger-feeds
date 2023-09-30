import { defineConfig } from 'vite'
import PKG from '../package.json'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
	resolve: {
		alias: {
			'@lib': resolve(__dirname, 'src'),
			'@root': resolve(__dirname, '..'),
		},
	},

	plugins: [
		dts({
			insertTypesEntry: true,
			exclude: ['node_modules/**', 'dist/**', 'vite.*'],
		}),
	],

	build: {
		rollupOptions: {
			external: Object.keys(PKG.peerDependencies),

			input: {
				index: resolve(__dirname, 'src/index'),
				core: resolve(__dirname, 'src/exports/core'),
				client: resolve(__dirname, 'src/exports/client'),
				helpers: resolve(__dirname, 'src/exports/helpers'),
			},

			output: {
				entryFileNames: '[name].js',
			},
		},

		lib: {
			entry: resolve(__dirname, 'src/index'),
			formats: ['es'],
		},
	},

	/*/
	/// <reference types="vitest" />
	/*/

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
