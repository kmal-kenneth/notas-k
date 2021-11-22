/***
 * Make a graphql request using fetch
 * @param {string} query the query to be executed
 * @param {object} variables the variables to pass to the query
 * @returns {Promise<Response>} response with the data
 */
async function getData(query: string, variables: unknown): Promise<Response> {
	return await fetch(`${import.meta.env.VITE_STRAPI_URL}/graphql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query,
			variables
		})
	});
}

export { getData };
