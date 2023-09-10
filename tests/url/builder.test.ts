import {
	type DateParamLike,
	FEEDS_PARAMS,
	FEEDS_PATH,
	BloggerFeedsUrl,
	BFUrl,
	isoDateStr,
	DATE_PARAMS,
	LabelLike,
} from '@lib'

describe('BloggerFeedsUrl', () => {
	const example = new URL('https://example.com'),
		baseFeeds = `${example}${FEEDS_PATH.substring(1)}?${FEEDS_PARAMS}`,
		defaultPaginated = new URL(
			baseFeeds + '&orderby=published&max-results=150',
		),
		postId = '1234567',
		examplePost = baseFeeds.replace('?', postId + '?')

	defaultPaginated.searchParams.sort()

	describe('BFUrl', () => {
		it('alias of BloggerFeedsUrl', () => {
			expect(new BFUrl(example)).toEqual(new BloggerFeedsUrl(example))
			expect(new BFUrl(example)).toBeInstanceOf(BloggerFeedsUrl)
			expect(BFUrl).toBe(BloggerFeedsUrl)
		})
	})

	describe('extends native URL api', () => {
		it('requires "new" and valid url', () => {
			expect(() => new BFUrl(example)).not.toThrow()
			// @ts-expect-error
			expect(() => BFUrl()).toThrow()
			// @ts-expect-error
			expect(() => new BFUrl()).toThrow()
		})

		it('allows string coercion', () => {
			expect(new BFUrl(example) + '').toBe(defaultPaginated + '')
			expect(new BFUrl(baseFeeds).postId(postId) + '').toBe(examplePost)
		})

		it('enhances URL interface apis', () => {
			Object.keys(URL.prototype).forEach(api =>
				expect(new BFUrl(new BFUrl(example))).toHaveProperty(api),
			)
		})
	})

	describe('method chaining', () => {
		let urlApi = new BFUrl(example),
			chainApi = new BFUrl(example),
			date = new Date(),
			dateStr = isoDateStr(date),
			expected: any

		it('only works for blogger params', () => {
			expect(() => {
				// @ts-expect-error
				new BFUrl(example).pathname().origin()
			}).toThrow()
			expect(() => {
				new BFUrl(example).withSearch('searched').withLabels()
			}).not.toThrow()
			expect(() => {
				new BFUrl(example).postId('searched').maxResults()
			}).not.toThrow()
		})

		it('idempotent with native URL api', () => {
			chainApi.withLabels(['xxx'])
			urlApi.labels = ['xxx']
			expected = new URL(defaultPaginated)
			expected.searchParams.set('q', 'label:xxx')
			expected.searchParams.sort()
			expect(chainApi).toEqual(expected)
			expect(urlApi).toEqual(expected)
			expect(chainApi).toEqual(urlApi)

			chainApi.postId(postId)
			urlApi.post = postId
			expected = new URL(examplePost)
			expect(chainApi).toEqual(expected)
			expect(urlApi).toEqual(expected)
			expect(chainApi).toEqual(urlApi)
		})

		it('with value is a setter', () => {
			// reset for next test
			urlApi = new BFUrl(example)
			chainApi = new BFUrl(example)

			chainApi.maxResults(123)
			expect(chainApi.searchParams.get('max-results')).toEqual('123')
			chainApi.startIndex(123)
			expect(chainApi.searchParams.get('start-index')).toEqual('123')
			chainApi.withLabels(['xxx'])
			expect(chainApi.labels).toEqual(['xxx'])
			chainApi.withSearch('my terms')
			expect(chainApi.searchParams.get('q')).toEqual('my terms')
			chainApi.dateParams('published-max', date)
			expect(chainApi.searchParams.get('published-max')).toBe(dateStr)
		})

		it('without value is a getter', () => {
			expect(chainApi.maxResults()).toEqual(123)
			expect(chainApi.startIndex()).toEqual(123)
			expect(chainApi.withLabels()).toEqual(['xxx'])
			expect(chainApi.withSearch()).toEqual('my terms')
			expect(chainApi.dateParams('published-max')).toBe(dateStr)
		})
	})

	describe('single post flow', () => {
		let urlApi: BFUrl, chainApi: BFUrl

		beforeEach(() => {
			urlApi = new BFUrl(example)
			chainApi = new BFUrl(example)
		})

		it('returns valid urls', () => {
			urlApi = new BFUrl(example)
			chainApi = new BFUrl(example)

			expect(() => new URL(chainApi.postId(postId) + ''))
				.not.to.throw()
				.and.to.eq(examplePost)

			expect(() => ((urlApi.post = postId), new URL(urlApi + '')))
				.not.to.throw()
				.and.to.eq(examplePost)
		})

		it('only keeps required params', () => {
			const postReset = new BFUrl(
				new BFUrl(examplePost).withSearch('my terms').withLabels(['xxx']),
			)
			expect(postReset.searched).toBe('')
			expect(postReset.labels).toEqual([])
			expect(postReset + '').toEqual(examplePost + '')
		})

		it('configurable via postId() and post', () => {
			chainApi.postId(postId)
			urlApi.post = postId
			expect(chainApi + '').toBe(urlApi + '')
			expect(chainApi.postId()).toBe(postId)
			expect(chainApi.post).toBe(postId)
		})
	})

	describe('paginated posts flow', () => {
		const myTerms = 'my search terms',
			myLabel = ['xxx']

		let urlApi: BFUrl, chainApi: BFUrl

		beforeEach(() => {
			chainApi = new BFUrl(example)
			urlApi = new BFUrl(example)
		})

		it('returns valid urls', () => {
			const date = new Date(),
				expected = new URL(defaultPaginated)
			expected.searchParams.set('max-results', '10')
			expected.searchParams.set('published-max', isoDateStr(date))
			expected.searchParams.sort()

			expect(
				`${new URL(chainApi.dateParams('published-max', date).maxResults(10))}`,
			).toEqual(decodeURIComponent(expected + ''))

			urlApi['published-max'] = date
			urlApi['max-results'] = 10
			expect(new URL(urlApi) + '').toBe(decodeURIComponent(expected + ''))
		})

		describe('pagination', () => {
			it('configurable via maxResults() and max-results', () => {
				urlApi['max-results'] = 123
				chainApi.maxResults(123)
				expect(chainApi.maxResults()).toBe(123)
				expect(chainApi['max-results']).toBe(123)
				expect(chainApi + '').toBe(urlApi + '')
			})

			it('defaults to 150', () => {
				expect(new BFUrl(example).maxResults(999).maxResults()).toBe(150)
				expect(new BFUrl(example)['max-results']).toBe(150)
			})
		})

		describe('posts sorting', () => {
			it('configurable via orderBy() and orderby', () => {
				urlApi['orderby'] = 'updated'
				chainApi.orderBy('updated')
				expect(chainApi.orderBy()).toBe('updated')
				expect(chainApi['orderby']).toBe('updated')
				expect(chainApi + '').toBe(urlApi + '')
			})

			it('defaults to published', () => {
				// @ts-expect-error
				expect(new BFUrl(example).orderBy('invalid').orderBy()).toBe(
					'published',
				)
				expect(new BFUrl(example)['orderby']).toBe('published')
			})
		})

		describe('items offset', () => {
			it('configurable via startIndex() and start-index', () => {
				urlApi['start-index'] = 123
				chainApi.startIndex(123)
				expect(chainApi.startIndex()).toBe(123)
				expect(chainApi['start-index']).toBe(123)
				expect(chainApi + '').toBe(urlApi + '')
			})

			it('positive integer >= 1', () => {
				expect(new BFUrl(example).startIndex(2.5).startIndex()).toBe(null)
				expect(new BFUrl(example).startIndex(123).startIndex()).toBe(123)
			})
		})

		describe('date filtering', () => {
			describe('configurable via dateParams() and dot-notation', () => {
				const date = new Date(new Date().toJSON().split('T').at(0) + ''),
					dateStr = isoDateStr(date)

				DATE_PARAMS.forEach(param =>
					it(param, () => {
						urlApi[param] = date
						chainApi.dateParams(param, date)
						expect(chainApi.dateParams(param)).toBe(dateStr)
						expect(urlApi[param]).toBe(dateStr)
						expect(chainApi + '').toBe(urlApi + '')
					}),
				)
			})

			it('valid dates / iso date strings', () => {
				expect(chainApi.dateParams('published-max', 'invalid') + '').toEqual(
					chainApi + '',
				)
				expect(chainApi.dateParams('updated-max', 'invalid') + '').toEqual(
					chainApi + '',
				)
				expect(chainApi.dateParams('published-min', 'invalid') + '').toEqual(
					chainApi + '',
				)
				expect(chainApi.dateParams('updated-min', 'invalid') + '').toEqual(
					chainApi + '',
				)
			})
		})

		describe('search filtering', () => {
			it('configurable via withSearch() or searched', () => {
				chainApi.withSearch(myTerms)
				urlApi.searched = myTerms
				expect(chainApi.withSearch()).toBe(myTerms)
				expect(urlApi.withSearch()).toBe(myTerms)
				expect(urlApi.withSearch()).toBe(chainApi.searched)
			})

			it('conforms to blogspot', () => {
				chainApi.withSearch(myTerms)
				urlApi.searched = myTerms
				expect(chainApi.searchParams.get('q')).toBe(myTerms)
				expect(urlApi.searchParams.get('q')).toBe(myTerms)
			})

			it('merges with labels', () => {
				const expected = 'q=label:xxx+my+search+terms'

				chainApi.withSearch(myTerms).withLabels(myLabel)
				expect(chainApi + '').toContain(expected)

				urlApi.labels = myLabel
				urlApi.searched = myTerms
				expect(urlApi + '').toContain(expected)

				expect(urlApi + '').toBe(chainApi + '')
			})
		})

		describe('labels filtering', () => {
			const urlParam = 'q=label:xxx,yyy|label:zzz',
				joined = ['xxx', 'yyy'],
				single = 'zzz'

			it('configurable via withLabels() or labels', () => {
				urlApi.labels = [single, joined]
				expect(urlApi.labels).toEqual([joined, single])

				chainApi.withLabels([single, joined])
				expect(chainApi.labels).toEqual([joined, single])

				expect(chainApi.withLabels()).toEqual(urlApi.labels)
				expect(chainApi + '').toEqual(urlApi + '')
			})

			it('conforms to blogspot', () => {
				urlApi.labels = [single, joined]
				expect(urlApi + '').toContain(urlParam)

				chainApi.withLabels([single, joined])
				expect(chainApi + '').toContain(urlParam)
			})

			it('merges with searched', () => {
				const merged = `${urlParam} ${myTerms}`.replace(/\ /g, '+')

				urlApi.searched = myTerms
				urlApi.labels = [single, joined]
				expect(urlApi + '').toContain(merged)

				chainApi.withSearch(myTerms).withLabels([single, joined])
				expect(chainApi + '').toContain(merged)

				expect(chainApi + '').toBe(urlApi + '')
			})

			it.todo('can be cleared', () => {
				urlApi.labels = [single, joined]
				expect(urlApi + '').toContain(single)
				chainApi.withLabels([single, joined])
				expect(chainApi + '').toContain(single)

				// TODO: clear labels is broken?

				urlApi.clearLabels()
				expect(urlApi + '').not.toContain(single)
				chainApi.clearLabels()
				expect(chainApi + '').not.toContain(single)

				expect(chainApi + '').toBe(urlApi + '')
			})
		})
	})
})
