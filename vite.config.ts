/// <reference types="vitest" />

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import PKG from './package.json'
import { resolve } from 'path'

// @ts-ignore: passed via cli
const isDemo = process?.argv?.at(-1) === 'demo'

// @ts-ignore
export default defineConfig(({ mode, command }) => {
	// default: library config
	const defaultConfig = {
		resolve: {
			alias: {
				'@lib': resolve(__dirname, './src/lib'),
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
				fileName: (fmt: string, name: string) => [name, fmt, 'js'].join('.'),
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
	}

	if (isDemo)
		return Object.assign(
			{
				server: {
					open: './demo/index.html',
					port: 3000,
				},
			},
			defaultConfig,
		)

	return defaultConfig
})
