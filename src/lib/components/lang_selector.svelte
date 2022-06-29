<script>
	// library for creating dropdown menu appear on click
	import { createPopper } from '@popperjs/core';
	import cr from 'flag-icons/flags/1x1/cr.svg';
	import us from 'flag-icons/flags/1x1/us.svg';
	import { getLanguageStore } from '@tolgee/svelte';

	const languageStore = getLanguageStore();

	let options = {
		es: { icon: cr, name: 'Español', value: 'es' },
		en: { icon: us, name: 'English', value: 'en' }
	};

	// core components
	let dropdownPopoverShow = false;

	let btnDropdownRef;
	let popoverDropdownRef;

	const toggleDropdown = () => {
		if (dropdownPopoverShow) {
			dropdownPopoverShow = false;
		} else {
			dropdownPopoverShow = true;
			createPopper(btnDropdownRef, popoverDropdownRef, {
				placement: 'bottom-start'
			});
		}
	};

	function selectLocale(value) {
		toggleDropdown();
		location.reload();
	}
</script>

<div class="flex flex-wrap border-b-2 border-transparent">
	<div class=" sm:w-6/12 md:w-4/12">
		<div class="relative inline-flex w-full align-middle">
			<button
				class="flex items-center outline-none focus:outline-none"
				type="button"
				aria-label="Seleccionar idioma"
				bind:this={btnDropdownRef}
				on:click={toggleDropdown}
			>
				<div class="object-cover w-4 h-4 mr-2 overflow-hidden rounded-full">
					<img src={options[$languageStore].icon} alt="Flag of {$languageStore} locale" />
				</div>

				<div class="w-20 flex ">
					{options[$languageStore].name}
				</div>

				<svg
					class="w-6 h-6 ml-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/></svg
				>
			</button>
			<ul
				bind:this={popoverDropdownRef}
				class="bg-gray-100 dark:shadow-gray-800 dark:bg-gray-900 z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 w-min {dropdownPopoverShow
					? 'block'
					: 'hidden'}"
			>
				{#each Object.keys(options) as value}
					<li
						class="flex items-center px-4 py-2 text-sm transition-all duration-300 
						{$languageStore === value ? 'bg-teal-700 text-gray-100' : ''}"
						on:click={() => {
							$languageStore = value;
							selectLocale(value);
						}}
					>
						<div class="object-cover w-4 h-4 mr-2 overflow-hidden rounded-full">
							<img src={options[value].icon} alt="Flag of {value} locale" />
						</div>

						{options[value].name}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
