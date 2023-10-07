import { withPwa } from '@vite-pwa/vitepress'
import { defineConfig } from 'vitepress'
import PKG from '../../package.json'
import UnoCss from 'unocss/vite'
import { resolve } from 'path'

export default withPwa(
	defineConfig({
		title: PKG.name,

		description: PKG.description,

		themeConfig: {
			logo: './blogger-feeds-logo.svg',

			nav: [
				{
					text: 'Home',
					link: '/',
				},
				{
					text: 'Guide',
					link: '/intro',
				},
				{
					text: 'Examples',
					link: '/examples',
				},
			],

			sidebar: [
				{
					text: 'Overview',
					items: [
						{
							text: 'Introduction',
							link: '/intro',
						},
						{
							text: 'Get started',
							link: '/get-started',
						},
					],
				},
				{
					text: 'Exports',
					items: [
						{
							text: 'Url builder',
							link: './builder',
						},
						{
							text: 'Client generator',
							link: './client',
						},
						{
							text: 'Helpers',
							link: './helpers',
						},
					],
				},
				{
					text: 'Examples',
					link: './examples',
				},
			],

			footer: {
				message:
					'This library is neither affiliated or approved by <a href="https://www.blogger.com" target="_blank" rel="noopener,nofollow">Google Blogger</a>',
				copyright:
					'We &#10084; <a href="https://www.blogger.com" target="_blank" rel="noopener,nofollow">Blogger</a>',
			},

			/* sidebar: [
				{
					text: 'Examples',
					items: [
						{
							text: 'Markdown Examples',
							link: '/markdown-examples',
						},
						{
							text: 'Runtime API Examples',
							link: '/api-examples',
						},
					],
				},
			], */

			socialLinks: [
				{
					icon: 'github',
					link: PKG.repository.url.replace('git+', ''),
				},
			],
		},

		head: [
			[
				'link',
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Fira+Sans&family=Fira+Code&display=swap',
				},
			],
		],

		pwa: {
			// TODO: pwa, enforce caching options
			registerType: 'autoUpdate',
			workbox: {
				runtimeCaching: [
					/* {
						urlPattern: ({ request }) => request.destination === 'image',
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'images-cache',
							expiration: {
								maxEntries: 10,
							},
						},
					}, */
				],
			},
		},

		vite: {
			resolve: {
				alias: {
					'@lib': resolve(__dirname, '../../lib/src'),
				},
			},
			server: {
				port: 7777,
			},

			plugins: [
				UnoCss({
					configFile: resolve(__dirname, './uno.config.js'),
				}),
			],
		},
	}),
)
