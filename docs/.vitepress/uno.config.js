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
			autoInstall: true,
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

	content: {
		pipeline: {
			exclude: [/\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/, /VP*\.vue/],
		},
	},
})
