import { isoDateStr } from '@lib'

describe('isoDateStr', () => {
	it('returns iso date string on valid iso date', () => {
		const example = new Date()
		expect(example.toJSON()).toContain(isoDateStr(example))
		expect(isoDateStr('2015-01-01')).toBe('2015-01-01T00:00:00')
		expect(isoDateStr('2025-12-31')).toBe('2025-12-31T00:00:00')
	})

	it('returns empty string on invalid date', () => {
		// @ts-expect-error
		expect(isoDateStr(null)).toBe('1970-01-01T00:00:00')
		// @ts-expect-error
		expect(isoDateStr(undefined)).toBe('')
		expect(isoDateStr('invalid')).toBe('')
		// @ts-expect-error
		expect(isoDateStr({})).toBe('')
		// @ts-expect-error
		expect(isoDateStr([])).toBe('')
		// @ts-expect-error
		expect(isoDateStr()).toBe('')
	})
})
