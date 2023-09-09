import { numClamp } from '@lib'

describe('numClamp', () => {
	it('returns number included in range', () => {
		const PositiveRange = [1, 2, 3, 4, 5],
			NegativeRange = PositiveRange.map(n => n * -1),
			MixedRange = PositiveRange.concat(NegativeRange)

		return [PositiveRange, NegativeRange, MixedRange].forEach(range => {
			const [min, max] = [Math.min(...range), Math.max(...range)]

			// in range
			for (let i = 0; i < range.length; i++)
				expect(numClamp(range[i], ...range)).toBe(range[i])

			// clamped
			expect(numClamp(min - 1, ...range)).toBe(min)
			expect(numClamp(max + 1, ...range)).toBe(max)
		})
	})

	it('only works with numbers', () => {
		// @ts-expect-error
		expect(numClamp(undefined, 1, 10)).toBe(undefined)
		// @ts-expect-error
		expect(numClamp({}, null, 10)).toEqual({})
		// @ts-expect-error
		expect(numClamp([], 1, '')).toEqual([])
		// @ts-expect-error
		expect(numClamp(NaN, '1', 10)).toBe(NaN)
		// @ts-expect-error
		expect(numClamp(null, 1, 10)).toBe(1)
	})
})
