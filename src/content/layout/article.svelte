<script context="module">
	import { img } from '$lib/components';
	export { img };
</script>

<script>
	import { ImageApp, ArticleData } from '$lib/components';
	import { getLanguageStore, getTranslate, T } from '@tolgee/svelte';
	import 'prism-themes/themes/prism-material-oceanic.css';

	const t = getTranslate();

	export let title;
	export let cover;
	export let collection;
	export let author;
	export let date;
	export let time;
	export let locales;
</script>

<template lang="pug">
article.px-4
    header
        ImageApp(src!="{cover.url}", alt!="{cover.alternativeText}", height="768", class="object-cover object-center w-full h-48 rounded-lg sm:h-80 md:h-96")
    section(class="max-w-3xl  mx-auto my-4 prose lg:prose-lg content")
        header(class="mt-8 mb-10 text-center ")
            h1(class="!mb-6 !text-2xl !font-extrabold !tracking-wider!sm:text-3xl !lg:text-4xl ") {title}
            div(class="flex justify-center")
                div(class="flex text-sm flex-wrap")
                    ArticleData(title!="{$t({ key: 'article_collection_label' })}", subtitle!="{collection.name}")
                    ArticleData(title!="{$t({ key: 'article_author_label' })}", subtitle!="{author.name}")
                    ArticleData(title!="{$t({key: 'article_date_label' })}", subtitle="{date}")
                    ArticleData(title!="{$t({ key: 'article_time_label' })}", subtitle!="{$t({key: 'article_time_to_read', parameters: { time: time } })}")
            +if('locales.length == 1')
                p(class="bg-yellow-300 text-yellow-900 p-1 rounded border border-yellow-600 dark:border-yellow-600 dark:bg-yellow-900 dark:text-yellow-300")
                    T(keyName="only_spanish_card")
    section(class="max-w-3xl  mx-auto pb-8 prose border-b lg:prose-lg content")
        slot
</template>
