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
					rel: 'icon',
					type: 'image/svg+xml',
					href: '/favicon.svg',
				},
			],
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
			manifest: {
				theme_color: '#FF9124',
				icons: [
					{
						src: '/favicon-72x72.png',
						type: 'image/png',
						sizes: '72x72',
						purpose: 'any maskable',
					},
					{
						src: '/favicon-96x96.png',
						type: 'image/png',
						sizes: '96x96',
						purpose: 'any maskable',
					},
					{
						src: '/favicon-128x128.png',
						type: 'image/png',
						sizes: '128x128',
						purpose: 'any maskable',
					},
					{
						src: '/favicon-144x144.png',
						type: 'image/png',
						sizes: '144x144',
						purpose: 'any maskable',
					},
					{
						src: '/favicon-152x152.png',
						type: 'image/png',
						sizes: '152x152',
						purpose: 'any maskable',
					},
					{
						src: '/favicon-192x192.png',
						type: 'image/png',
						sizes: '192x192',
						purpose: 'any maskable',
					},
					{
						src: '/favicon-384x384.png',
						type: 'image/png',
						sizes: '384x384',
						purpose: 'any maskable',
					},
					{
						src: '/favicon-512x512.png',
						type: 'image/png',
						sizes: '512x512',
						purpose: 'any maskable',
					},
				],
			},
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
