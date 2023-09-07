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
} from '@lib'

// [x] extend native js URL behaviour with blogspot requirements
// [x] baseUrl must be valid, otherwise native error
// [x] allows usage as object, via get / set / chainable methods
// [x] avoid Proxy (speed) and Object.defineProperty (readability)

export { BloggerFeedsUrl as BFUrl }

export class BloggerFeedsUrl extends URL {
	constructor(url: BloggerFeedsUrl | UrlLike, base?: UrlLike) {
		// string casting for normalization and compatibility
		super(url + '', base)
		urlSetup(this)
	}

	toString() {
		urlSetup(this)
		return decodeURIComponent(URL.prototype.toString.apply(this))
	}

	get ['post'](): string | null {
		return getPostParam(this)
	}
	set ['post'](post: UrlLike) {
		setPostParam(this, post)
	}
	postId(post?: UrlLike) {
		if (!arguments.length) return this.post
		return post && (this.post = post), this
	}

	get ['max-results']() {
		return getMaxResultsParam(this)
	}
	set ['max-results'](num: number) {
		setMaxResultsParam(this, num)
	}
	maxResults(num?: number) {
		if (!arguments.length) return this['max-results']
		this['max-results'] = num ?? 150
		return this
	}

	get ['start-index']() {
		return getStartIndexParam(this)
	}
	set ['start-index'](num: number) {
		setStartIndexParam(this, num)
	}
	startIndex(num?: number) {
		if (!arguments.length) return this['start-index']
		this['start-index'] = num ?? 1
		return this
	}

	get ['orderby']() {
		return getOrderByParam(this)
	}
	set ['orderby'](str: string) {
		setOrderByParam(this, str)
	}
	orderBy(str?: string) {
		if (!arguments.length) return this['orderby']
		this['orderby'] = str ?? 'published'
		return this
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
	dateParams(param: DateParamLike, date?: DateLike) {
		if (arguments.length === 1) return this[param]
		if (arguments.length === 2) this[param] = date ?? ''
		return this
	}

	get ['searched']() {
		return getSearchedParam(this)
	}
	set ['searched'](str: string) {
		setSearchedParam(this, str)
	}
	withSearch(str?: string) {
		if (!arguments.length) return this['searched']
		this['searched'] = str ?? ''
		return this
	}

	get ['labels'](): LabelLike[] {
		return getLabelsParam(this)
	}
	set ['labels'](labels: LabelLike) {
		setLabelsParam(this, labels)
	}
	withLabels(...labels: LabelLike[]) {
		if (!arguments.length) return this['labels']
		this['labels'] = labels
		return this
	}
	clearLabels() {
		clearLabels(this)
		return this
	}
}
