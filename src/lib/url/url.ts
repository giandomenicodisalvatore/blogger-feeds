import {
	type DateParamLike,
	type OrderbyLike,
	type LabelLike,
	type DateLike,
	type UrlLike,
	urlSetup,
	getPost,
	setPost,
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
	clearLabels,
} from '@lib'

export class BFurl extends URL {
	constructor(conf: BFurl | UrlLike, base?: UrlLike) {
		// normalization and compatibility
		super(decodeURIComponent(conf + ''), base)
		return urlSetup(this)
	}

	toString() {
		return urlSetup(this, true)
	}

	postId(post: UrlLike): this
	postId(): string | null
	postId(post?: any) {
		if (!arguments.length) return this.post
		return post && (this.post = post), this
	}
	get ['post'](): string | null {
		return getPost(this)
	}
	set ['post'](post: UrlLike) {
		setPost(this, post)
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

	orderBy(str: OrderbyLike): this
	orderBy(): OrderbyLike | null
	orderBy(str?: any) {
		if (!arguments.length) return this['orderby']
		return (this['orderby'] = str), this
	}
	get ['orderby'](): OrderbyLike | null {
		return getOrderBy(this)
	}
	set ['orderby'](str: OrderbyLike) {
		setOrderBy(this, str)
	}

	dateParams(param: DateParamLike, date: DateLike): this
	dateParams(param: DateParamLike): string
	dateParams(param: DateParamLike, date?: any) {
		if (arguments.length === 1) return this[param]
		return date && (this[param] = date), this
	}
	get ['published-max']() {
		return getDates(this, 'published-max')
	}
	set ['published-max'](date: DateLike) {
		setDates(this, 'published-max', date)
	}
	get ['published-min']() {
		return getDates(this, 'published-min')
	}
	set ['published-min'](date: DateLike) {
		setDates(this, 'published-min', date)
	}
	get ['updated-max']() {
		return getDates(this, 'updated-max')
	}
	set ['updated-max'](date: DateLike) {
		setDates(this, 'updated-max', date)
	}
	get ['updated-min']() {
		return getDates(this, 'updated-min')
	}
	set ['updated-min'](date: DateLike) {
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

	withLabels(labels: LabelLike[]): this
	withLabels(): LabelLike[]
	withLabels(labels?: any) {
		if (!arguments.length) return this['labels']
		return (this['labels'] = labels), this
	}
	get ['labels'](): LabelLike[] {
		return getLabels(this)
	}
	set ['labels'](labels: LabelLike[]) {
		setLabels(this, structuredClone(labels))
	}

	clearLabels(): this {
		return clearLabels(this), this
	}
}
