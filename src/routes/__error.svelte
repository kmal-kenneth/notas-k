<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: status,
				message: error.stack
			}
		};
	}
</script>

<script>
	export let title;
	export let message;
</script>

<h1>{title}</h1>

<p>{message}</p>
