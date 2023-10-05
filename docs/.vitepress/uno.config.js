import {
	defineConfig,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss'

export default defineConfig({
	presets: [
		presetUno(),
		presetIcons({
			collections: {
				logos: () => import('@iconify/json/logos.json').then(i => i.default),
			},
			scale: 1.2,
			warn: true,
			unit: 'em',
		}),
	],

	transformers: [
		// just in cse
		transformerDirectives(),
		transformerVariantGroup(),
	],
})
