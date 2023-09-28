import { LIB_BUILD } from './vite/lib.vite.config'
import { DEMO_BUILD } from './vite/demo.vite.config'
import { defineConfig } from 'vite'

export default defineConfig(
	conf =>
		(process.argv.includes('lib') && LIB_BUILD) ||
		(process.argv.includes('demo') && DEMO_BUILD) ||
		{}, // default config
)
