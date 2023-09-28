import { defineConfig } from 'vite'
import { resolve } from 'path'

export const DEMO_BUILD = defineConfig({
	root: resolve(__dirname, '../demo'),

	resolve: {
		alias: {
			'@lib': resolve(__dirname, '../lib'),
			'@demo': resolve(__dirname, '../demo'),
		},
	},

	plugins: [],

	server: {
		open: './demo',
		port: 3000,
	},
})
