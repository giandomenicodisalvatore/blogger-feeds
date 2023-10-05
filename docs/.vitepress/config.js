import { withPwa } from '@vite-pwa/vitepress'
import { defineConfig } from 'vitepress'
import PKG from '../../package.json'
import UnoCss from 'unocss/vite'
import path from 'path'

export default withPwa(
	defineConfig({
		title: PKG.name,

		description: PKG.description,

		themeConfig: {
			nav: [
				{
					text: 'Home',
					link: '/',
				},
				/* {
					text: 'Examples',
					link: '/markdown-examples',
				}, */
			],

			footer: {
				message:
					'This library is neither affiliated or approved by <a href="https://www.blogger.com" target="_blank" rel="noopener,nofollow">Google Blogger</a>',
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
			// TODO
		},

		vite: {
			server: {
				port: 7777,
			},

			plugins: [
				UnoCss({
					configFile: path(__dirname, './uno.config.js'),
				}),
			],
		},
	}),
)
