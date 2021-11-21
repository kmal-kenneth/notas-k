<script lang="ts">
	export let meta: Meta;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{meta.title}</title>
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={meta.url} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={meta.url} />
	<meta property="twitter:title" content={meta.title} />
	<meta property="twitter:description" content={meta.description} />
	<meta property="twitter:image" content={meta.image} />

	<!-- Robots -->
	<meta name="robots" content={meta.robots} />
	<meta name="googlebot" content={meta.robots} />

	<!-- Canonical -->
	<link rel="canonical" href={meta.canonical} />

	<!-- Lenguaje -->
	<meta http-equiv="content-language" content={meta.lenguage} />
</svelte:head>
