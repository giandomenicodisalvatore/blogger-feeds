export const matchIds = (str: URL | string) => (str + '').match(/\d{7,}/g)

export const isBlogger = (str: URL | string) =>
	/^https?\:\/\/www\.blog(ger|spot)\.com/.test(str + '')

export const matchLabels = (str: URL | string) =>
	(str + '').match(/^(.*?\|?label\:(?:\w|\,)*){1,}/)?.at(0)
