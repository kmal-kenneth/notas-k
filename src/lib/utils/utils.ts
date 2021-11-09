/***
 * It generates an array between a range of values, if it only receives one value, it will generate the array with 1 as the first value.
 * @param start The start value of the array.
 * @param end The end value of the array.
 * @returns The array with the values between the start and end values.
 * @example range(1, 5) // [1, 2, 3, 4, 5]
 */
export function range(start: number, end?: number): number[] {
	// If only one number is provided, start at one
	if (end === undefined) {
		end = start;
		start = 1;
	}

	// Create a ranged array
	return Array.from(new Array(end - start + 1).keys()).map(function (num) {
		return num + start;
	});
}
