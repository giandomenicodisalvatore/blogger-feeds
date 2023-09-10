import {
	type UrlLike,
	type DateLike,
	type LabelLike,
	type DateParamLike,
	urlSetup,
	getPostParam,
	setPostParam,
	getMaxResultsParam,
	setMaxResultsParam,
	getOrderByParam,
	setOrderByParam,
	getDateParams,
	setDateParams,
	getSearchedParam,
	setSearchedParam,
	getLabelsParam,
	setLabelsParam,
	clearLabels,
	getStartIndexParam,
	setStartIndexParam,
	BloggerOrderBy,
} from '@lib'

export { BloggerFeedsUrl as BFUrl }

export class BloggerFeedsUrl extends URL {
	constructor(url: BloggerFeedsUrl | UrlLike, base?: UrlLike)
	constructor(url: any, base: any) {
		// normalization and compatibility
		super(decodeURIComponent(url + ''), base)
		return urlSetup(this)
	}

	toString() {
		return urlSetup(this, true)
	}

	postId(post: UrlLike): this
	postId(): string
	postId(post?: any) {
		if (!arguments.length) return this.post
		return post && (this.post = post), this
	}
	get ['post']() {
		return getPostParam(this)
	}
	set ['post'](post: UrlLike) {
		setPostParam(this, post)
	}

	maxResults(num: number): this
	maxResults(): number | null
	maxResults(num?: any) {
		if (!arguments.length) return this['max-results']
		return (this['max-results'] = num), this
	}
	get ['max-results'](): number | null {
		return getMaxResultsParam(this)
	}
	set ['max-results'](num: number) {
		setMaxResultsParam(this, num)
	}

	startIndex(num: number): this
	startIndex(): number | null
	startIndex(num?: any) {
		if (!arguments.length) return this['start-index']
		return (this['start-index'] = num), this
	}
	get ['start-index'](): number | null {
		return getStartIndexParam(this)
	}
	set ['start-index'](num: number) {
		setStartIndexParam(this, num)
	}

	orderBy(str: BloggerOrderBy): this
	orderBy(): BloggerOrderBy | null
	orderBy(str?: any) {
		if (!arguments.length) return this['orderby']
		return (this['orderby'] = str), this
	}
	get ['orderby'](): BloggerOrderBy | null {
		return getOrderByParam(this)
	}
	set ['orderby'](str: BloggerOrderBy) {
		setOrderByParam(this, str)
	}

	dateParams(param: DateParamLike, date: DateLike): this
	dateParams(param: DateParamLike): string
	dateParams(param: DateParamLike, date?: any) {
		if (arguments.length === 1) return this[param]
		return date && (this[param] = date), this
	}
	get ['published-max']() {
		return getDateParams(this, 'published-max')
	}
	set ['published-max'](date: DateLike) {
		setDateParams(this, 'published-max', date)
	}
	get ['published-min']() {
		return getDateParams(this, 'published-min')
	}
	set ['published-min'](date: DateLike) {
		setDateParams(this, 'published-min', date)
	}
	get ['updated-max']() {
		return getDateParams(this, 'updated-max')
	}
	set ['updated-max'](date: DateLike) {
		setDateParams(this, 'updated-max', date)
	}
	get ['updated-min']() {
		return getDateParams(this, 'updated-min')
	}
	set ['updated-min'](date: DateLike) {
		setDateParams(this, 'updated-min', date)
	}

	withSearch(str: string): this
	withSearch(): string
	withSearch(str?: any) {
		if (!arguments.length) return this['searched']
		return (this['searched'] = str), this
	}
	get ['searched']() {
		return getSearchedParam(this)
	}
	set ['searched'](str: string) {
		setSearchedParam(this, str)
	}

	withLabels(labels: LabelLike[]): this
	withLabels(): LabelLike[]
	withLabels(labels?: any) {
		if (!arguments.length) return this['labels']
		return (this['labels'] = labels), this
	}
	get ['labels'](): LabelLike[] {
		return getLabelsParam(this)
	}
	set ['labels'](labels: LabelLike[]) {
		setLabelsParam(this, structuredClone(labels))
	}

	clearLabels(): this {
		return clearLabels(this), this
	}
}
