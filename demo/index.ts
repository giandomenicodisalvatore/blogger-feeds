// @ts-nocheck
/// <reference types="../src/env.d.ts" />
export * from '../src/main'
import * as BF from '.'
import './index.css'

const RunsInBrowser = [typeof document, typeof window].every(
	cond => cond !== 'undefined',
)

if (RunsInBrowser) {
	const repoLink =
			'https://github.com/giandomenicodisalvatore/blogger-feeds/tree/main/demo/',
		examplesJS = import.meta.glob('./*.js'),
		fileLink = document.querySelector('#example-file'),
		urlLink = document.querySelector('#example-url'),
		form = document.querySelector('#switch-example')

	const updateDomWithLinks = async () => {
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
		console.log('👓 source ', repo)
		console.log('⭐ result ', link)
	}

	// dynamically update dom
	addEventListener('change', updateDomWithLinks, {
		passive: true,
	})

	addEventListener(
		'DOMContentLoaded',
		() => {
			// adds inputs to update demo examples
			const template = document.querySelector('#examples-inputs')

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

				// trigger update once
				if (name === './single-post.js')
					(async () => {
						input.checked = true
						await updateDomWithLinks({ target: form })
					})()
			}
		},
		{
			once: true,
		},
	)
}
