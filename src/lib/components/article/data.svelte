<script lang="ts">
	export let title: string;
	export let subtitle: string;
</script>

<div class="flex flex-col items-start my-2 mx-1.5 sm:mx-4">
	<p class="!m-0 !mb-1  font-bold text-grey-800 dark:text-gray-200">
		{title}
	</p>
	<p class="!m-0 ">
		{subtitle}
	</p>
</div>
