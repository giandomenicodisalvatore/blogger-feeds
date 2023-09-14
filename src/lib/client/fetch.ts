import {
	type OrderbyStr,
	type BFLabel,
	type DateStr,
	type UrlStr,
	type BFData,
	type BFPick,
	BFBuild,
	BFParse,
} from '@lib'

export type BFConf = (
	| {
			// single flow
			blog: UrlStr
			post: UrlStr
	  }
	| {
			blog: UrlStr
			// paginated flow
			orderby?: OrderbyStr
			'max-results'?: number
			'start-index'?: number
			'published-max'?: DateStr
			'published-min'?: DateStr
			'updated-max'?: DateStr
			'updated-min'?: DateStr
			searched?: string
			labels?: BFLabel
	  }
) & {
	// fetch options
	fetchOpt?: RequestInit
	// select props
	pick?: BFPick
}

export type BFError = {
	conf: BFConf
	err: Error | any
	req?: Request
	res?: Response
}

const OPT = {
	// optimized browser & server level
	headers: {
		// enforce connection pooling
		accept: 'application/json',
		connection: 'keep-alive',
	},
	// continue until abort
	keepalive: true,
}

export function BFFetch(conf: BFConf): Promise<BFData | BFError>
export function BFFetch(conf: UrlStr, blog?: UrlStr): Promise<BFData | BFError>
export async function BFFetch(conf: any, blog?: any) {
	let final, url, res, req

	try {
		url = BFBuild(conf, blog)
		if (!url) throw new Error('URL_ERROR')

		req = new Request(
			url.toString(),
			Object.assign({}, OPT, conf?.fetchOpt ?? {}),
		)

		res = await fetch(req) // save it for later
		if (!res.ok) throw new Error('RESPONSE_ERROR')

		// this copy will be consumed as a stack
		final = await res.clone().json()
		final = BFParse(final, conf?.pick)

		// all is well => cleanup
		url = res = req = conf = blog = null

		// output raw data
	} catch (err) {
		final = { conf, err, req, res }
	}

	return final as BFData
}
