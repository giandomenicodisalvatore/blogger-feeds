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
// [x] allows initialization via plain object

export class BloggerFeedsUrl extends URL {
	constructor() {
		// @ts-ignore
		super(...arguments)
		urlSetup(this)
	}

	toString() {
		return (
			urlSetup(this), decodeURIComponent(URL.prototype.toString.apply(this))
		)
	}

	get ['post']() {
		return getPostParam(this)
	}
	set ['post'](post) {
		setPostParam(this, post)
	}
	postId(post?: UrlLike) {
		return arguments.length ? ((this.post = post), this) : this.post
	}

	get ['max-results']() {
		return getMaxResultsParam(this)
	}
	set ['max-results'](num: number) {
		setMaxResultsParam(this, num)
	}
	maxResults(num?: number) {
		return arguments.length
			? ((this['max-results'] = num ?? 150), this)
			: this['max-results']
	}

	get ['start-index']() {
		return getStartIndexParam(this)
	}
	set ['start-index'](num: number) {
		setStartIndexParam(this, num)
	}
	startIndex(num?: number) {
		return arguments.length
			? ((this['start-index'] = num ?? 1), this)
			: this['start-index']
	}

	get ['orderby']() {
		return getOrderByParam(this)
	}
	set ['orderby'](str: string) {
		setOrderByParam(this, str)
	}
	orderBy(str?: string) {
		return arguments.length
			? ((this['orderby'] = str ?? ''), this)
			: this['orderby']
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
		return arguments.length ? ((this[param] = date ?? ''), this) : this[param]
	}

	get ['searched']() {
		return getSearchedParam(this)
	}
	set ['searched'](str: string) {
		setSearchedParam(this, str)
	}
	withSearch(str?: string) {
		return arguments.length
			? ((this['searched'] = str ?? ''), this)
			: this['searched']
	}

	get ['labels'](): LabelLike[] {
		return getLabelsParam(this)
	}
	set ['labels'](labels: LabelLike) {
		setLabelsParam(this, labels)
	}
	withLabels(labels: LabelLike) {
		return arguments.length // @ts-ignore
			? ((this['labels'] = labels ?? ''), this)
			: this['labels']
	}
	clearLabels() {
		return clearLabels(this), this
	}
}
