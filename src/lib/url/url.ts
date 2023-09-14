import {
	type DateKeyStr,
	type BFIds,
	type OrderbyStr,
	type BFLabel,
	type DateStr,
	// adapters
	urlSetup,
	BFGetId,
	// params
	getOrderBy,
	setOrderBy,
	getMaxResults,
	setMaxResults,
	getStartIndex,
	setStartIndex,
	getDates,
	setDates,
	getSearched,
	setSearched,
	getLabels,
	setLabels,
} from '@lib'

export type UrlStr = string | URL

// publicly exposed minimal api
export class BFUrl extends URL {
	#ids: BFIds = BFGetId(this.href)
	#labels: Set<string> = new Set()

	constructor(conf: BFUrl | UrlStr, base?: UrlStr) {
		// normalization and compatibility
		super(decodeURIComponent(conf + ''), base)
		return urlSetup(this, this.#ids)
	}

	toString() {
		return urlSetup(this, this.#ids, true)
	}

	blogId(blog: UrlStr): this
	blogId(): string | null
	blogId(blog?: any) {
		if (!arguments.length) return this['blog-id']
		return blog && (this['blog-id'] = blog), this
	}
	get ['blog-id'](): string | null {
		return this.#ids.blog
	}
	set ['blog-id'](blog: UrlStr) {
		this.#ids.blog ??= BFGetId(blog).blog
	}

	postId(post: UrlStr): this
	postId(): string | null
	postId(post?: any) {
		if (!arguments.length) return this.post
		return post && (this.post = post), this
	}
	get ['post'](): string | null {
		return this.#ids.post
	}
	set ['post'](post: UrlStr) {
		this.#ids.post ??= BFGetId(post).post
	}

	maxResults(num: number): this
	maxResults(): number | null
	maxResults(num?: any) {
		if (!arguments.length) return this['max-results']
		return (this['max-results'] = num), this
	}
	get ['max-results'](): number | null {
		return getMaxResults(this)
	}
	set ['max-results'](num: number) {
		setMaxResults(this, num)
	}

	startIndex(num: number): this
	startIndex(): number | null
	startIndex(num?: any) {
		if (!arguments.length) return this['start-index']
		return (this['start-index'] = num), this
	}
	get ['start-index'](): number | null {
		return getStartIndex(this)
	}
	set ['start-index'](num: number) {
		setStartIndex(this, num)
	}

	orderBy(str: OrderbyStr): this
	orderBy(): OrderbyStr | null
	orderBy(str?: any) {
		if (!arguments.length) return this['orderby']
		return (this['orderby'] = str), this
	}
	get ['orderby'](): OrderbyStr | null {
		return getOrderBy(this)
	}
	set ['orderby'](str: OrderbyStr) {
		setOrderBy(this, str)
	}

	dateParams(param: DateKeyStr, date: DateStr): this
	dateParams(param: DateKeyStr): string
	dateParams(param: DateKeyStr, date?: any) {
		if (arguments.length === 1) return this[param]
		return date && (this[param] = date), this
	}
	get ['published-max']() {
		return getDates(this, 'published-max')
	}
	set ['published-max'](date: DateStr) {
		setDates(this, 'published-max', date)
	}
	get ['published-min']() {
		return getDates(this, 'published-min')
	}
	set ['published-min'](date: DateStr) {
		setDates(this, 'published-min', date)
	}
	get ['updated-max']() {
		return getDates(this, 'updated-max')
	}
	set ['updated-max'](date: DateStr) {
		setDates(this, 'updated-max', date)
	}
	get ['updated-min']() {
		return getDates(this, 'updated-min')
	}
	set ['updated-min'](date: DateStr) {
		setDates(this, 'updated-min', date)
	}

	withSearch(str: string): this
	withSearch(): string
	withSearch(str?: any) {
		if (!arguments.length) return this['searched']
		return (this['searched'] = str), this
	}
	get ['searched']() {
		return getSearched(this)
	}
	set ['searched'](str: string) {
		setSearched(this, str)
	}

	withLabels(labels: BFLabel[]): this
	withLabels(): BFLabel[]
	withLabels(labels?: any) {
		if (!arguments.length) return this['labels']
		return (this['labels'] = labels), this
	}
	get ['labels'](): BFLabel[] {
		return getLabels(this.#labels)
	}
	set ['labels'](labels: BFLabel[]) {
		setLabels(this.#labels, structuredClone(labels))
	}

	clearLabels(): this {
		return this.#labels.clear(), this
	}
}
