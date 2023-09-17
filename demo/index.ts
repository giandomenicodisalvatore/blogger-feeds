// @ts-nocheck
/// <reference types="../src/env.d.ts" />
export * from '../src/main'
import './index.css'

if ([typeof document, typeof window].every(cond => cond !== 'undefined'))
	addEventListener(
		'DOMContentLoaded',
		() => {
			const repoLink =
					'https://github.com/giandomenicodisalvatore/blogger-feeds/tree/main/demo/',
				examplesJS = import.meta.glob('./*.js'),
				template = document.querySelector('#examples-inputs'),
				fileLink = document.querySelector('#example-file'),
				urlLink = document.querySelector('#example-url'),
				form = document.querySelector('#switch-example')

			// adds inputs to update demo examples
			for (const name of Object.keys(examplesJS).sort((a, b) =>
				b.localeCompare(a),
			)) {
				if (name.includes('index')) continue

				const clone = template.content.cloneNode(true),
					input = clone.querySelector('input'),
					span = clone.querySelector('span')

				span.innerText = name.replace(/\W|js/g, ' ')
				input.value = name

				form.appendChild(clone)
			}

			addEventListener('change', async ev => {
				if (!form?.isSameNode(ev?.target?.closest('form'))) return

				const filename = new FormData(form).get('filename'),
					link = (await examplesJS[filename]()).link(),
					repo = repoLink + filename.replace('./', '')

				Object.assign(urlLink, {
					innerText: `⭐ ${decodeURIComponent(link)}`,
					href: link,
				})

				Object.assign(fileLink, {
					innerText: `👓 ${decodeURIComponent(repo)}`,
					href: repo,
				})

				// valid native js url
				console.clear()
				console.log('source code at 👓', repo)
				console.log('resulting url ⭐', link)
			})
		},
		{
			once: true,
		},
	)
