import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	root: resolve(__dirname, '.'),

	resolve: {
		alias: {
			'@lib': resolve(__dirname, '../lib'),
			'@demo': resolve(__dirname, '.'),
		},
	},

	server: {
		open: true,
		port: 3000,
	},
})
