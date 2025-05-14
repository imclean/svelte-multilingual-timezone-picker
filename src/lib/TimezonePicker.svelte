<!-- TimezonePicker.svelte -->
<script lang="ts">
	import type { TimeZonePickerProps, TimeZoneChangeEvent } from './types';

	// Props for the component
	let {
		value = $bindable(''),
		userLocale = $bindable('en'),
		timezoneData = $bindable(),
		regionData = $bindable(),
		selectRegionPlaceholder = 'Select Region',
		selectTimezonePlaceholder = 'Select timezone',
		className = '',
		regionLabel = 'Region',
		timezoneLabel = 'Timezone',
		noTimezonesLabel = 'No timezones found',
		disabled = false,
		required = false,
		searchable = true,
		searchPlaceholder = 'Search timezones...',
		backToRegionsLabel = 'Back to regions',
		handleTimezoneChange,

		// CSS class props for each component part
		containerClass = '', // The main container
		buttonClass = '', // The dropdown trigger button
		buttonActiveClass = '', // Additional classes when button is active/dropdown is open
		buttonDisabledClass = '', // Button when disabled
		dropdownClass = '', // The dropdown container
		searchContainerClass = '', // Container around the search input
		searchInputClass = '', // The search input itself
		regionHeaderClass = '', // Region section header
		regionItemClass = '', // Individual region item
		regionItemActiveClass = '', // Active/selected region item
		backButtonClass = '', // Back to regions button
		timezoneItemClass = '', // Individual timezone item
		timezoneItemActiveClass = '', // Active/selected timezone item
		timezoneNameClass = '', // Timezone name
		timezoneUTCClass = '', // UTC offset display
		noResultsClass = '' // No results message
	}: TimeZonePickerProps = $props();

	// Internal state
	let selectedRegion = $state('');
	let searchQuery = $state('');
	let isOpen = $state(false);
	let searchInput = $state<HTMLInputElement | null>(null);

	// Derived values
	let regions = $derived(timezoneData ? Object.keys(timezoneData) : []);

	// Handle locale or timezoneData changes
	$effect(() => {
		// Create dependencies on both userLocale and timezoneData
		userLocale;

		// Skip if no data is available yet
		if (!timezoneData || Object.keys(timezoneData).length === 0) return;

		// If we have a value selected, find its region
		if (value) {
			let foundRegion = false;
			for (const region of regions) {
				if (!timezoneData[region]) continue;

				const languageData = timezoneData[region][userLocale] || timezoneData[region]['en'];
				if (languageData && value in languageData) {
					selectedRegion = region;
					foundRegion = true;
					break;
				}
			}
			// If we can't find the timezone in any region with the new locale, reset
			if (!foundRegion) {
				selectedRegion = '';
			}
		} else {
			// No value selected, show regions
			selectedRegion = '';
		}
	});

	// Get translated region name function
	function getRegionDisplay(region: string): string {
		const locale = userLocale || 'en';
		const translations = regionData[locale] || regionData['en'];
		return translations[region] || region;
	}

	// Filter timezones based on search query or selected region
	let filteredTimezones = $derived.by(() => {
		// Skip if no data is available
		if (!timezoneData) return null;

		// Initialize result object
		const result: Record<string, Record<string, [string, string, string]>> = {};

		if (!searchQuery) {
			// No search query - show selected region only if one is selected
			if (selectedRegion && timezoneData[selectedRegion]) {
				// Use the current locale data or fall back to English
				if (timezoneData[selectedRegion][userLocale]) {
					result[selectedRegion] = timezoneData[selectedRegion][userLocale];
				} else if (timezoneData[selectedRegion]['en']) {
					result[selectedRegion] = timezoneData[selectedRegion]['en'];
				}

				return Object.keys(result).length > 0 ? result : null;
			}
			// No region selected or no data found
			return null;
		} else {
			// Filter by search query
			const query = searchQuery.toLowerCase();

			for (const region in timezoneData) {
				// Skip if the region doesn't exist in the data
				if (!timezoneData[region]) continue;

				// Use the locale-specific data
				const regionData = timezoneData[region][userLocale] || timezoneData[region]['en'];

				if (!regionData) continue;

				const filtered: Record<string, [string, string, string]> = {};
				let hasMatches = false;

				for (const timezone in regionData) {
					const [city] = regionData[timezone];
					if (timezone.toLowerCase().includes(query) || city.toLowerCase().includes(query)) {
						filtered[timezone] = regionData[timezone];
						hasMatches = true;
					}
				}

				if (hasMatches) {
					result[region] = filtered;
				}
			}

			return Object.keys(result).length > 0 ? result : null;
		}
	});

	// Get the display name for the currently selected timezone
	let selectedTimezoneName = $derived.by(() => {
		if (!value || !timezoneData) return '';

		// Find the display name in the current locale
		for (const region in timezoneData) {
			// Skip if region doesn't exist
			if (!timezoneData[region]) continue;

			// First try current locale
			if (timezoneData[region][userLocale] && timezoneData[region][userLocale][value]) {
				return `${timezoneData[region][userLocale][value][0]} (${value})`;
			}

			// Fallback to English if not found in current locale
			if (timezoneData[region]['en'] && timezoneData[region]['en'][value]) {
				return `${timezoneData[region]['en'][value][0]} (${value})`;
			}
		}

		return value;
	});

	// Handle selecting a timezone
	function selectTimezone(timezone: string): void {
		value = timezone;
		isOpen = false;

		// Dispatch change event
		const event = new CustomEvent('change', {
			detail: { value: timezone },
			bubbles: true
		});

		const element = document.getElementById('timezone-dropdown');
		if (element) {
			element.dispatchEvent(event);
		}

		if (handleTimezoneChange) {
			handleTimezoneChange(event as TimeZoneChangeEvent);
		}
	}

	// Handle selecting a region
	function selectRegion(region: string): void {
		selectedRegion = region;
		searchQuery = '';
	}

	// Go back to regions view
	function backToRegions(): void {
		selectedRegion = '';
		searchQuery = '';
		if (value) {
			// Reset the value if a region is selected
			value = '';
			if (handleTimezoneChange) {
				const event = new CustomEvent('change', {
					detail: { value: '' },
					bubbles: true
				});
				handleTimezoneChange(event as TimeZoneChangeEvent);
			}
		}
	}

	// Handle clicking outside to close the dropdown
	function handleClickOutside(event: MouseEvent): void {
		const dropdown = document.getElementById('timezone-dropdown');
		if (dropdown && !dropdown.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	// Set up click outside listener
	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);

			// Focus search input if available
			if (searchable && searchInput) {
				setTimeout(() => {
					searchInput?.focus();
				}, 0);
			}
		} else {
			document.removeEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<!-- Main container -->
<div id="timezone-dropdown" class="relative {className} {containerClass}">
	<!-- Dropdown trigger button -->
	<button
		type="button"
		onclick={() => (isOpen = !isOpen)}
		{disabled}
		class="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            {buttonClass}
            {isOpen ? buttonActiveClass : ''}
            {disabled
			? `opacity-50 cursor-not-allowed ${buttonDisabledClass}`
			: 'hover:bg-gray-50'}"
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span class="truncate"
			>{selectedTimezoneName
				? selectedTimezoneName
				: selectedRegion.length > 0
					? selectTimezonePlaceholder
					: selectRegionPlaceholder}</span
		>
		<svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	<!-- Dropdown menu -->
	{#if isOpen}
		<div
			class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-96 overflow-hidden {dropdownClass}"
		>
			<div class="flex flex-col">
				<!-- Search input -->
				{#if searchable}
					<div class="p-2 border-b {searchContainerClass}">
						<input
							bind:this={searchInput}
							bind:value={searchQuery}
							type="text"
							placeholder={searchPlaceholder}
							class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 {searchInputClass}"
						/>
					</div>
				{/if}

				<div class="overflow-y-auto max-h-80">
					{#if !filteredTimezones && !searchQuery}
						<!-- Show region selection -->
						<div class="py-1">
							<div class="px-3 py-2 text-xs font-semibold text-gray-500 {regionHeaderClass}">
								{regionLabel}
							</div>
							{#each regions as region}
								<button
									type="button"
									class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer
                                        {regionItemClass}
                                        {selectedRegion === region
										? `bg-blue-50 text-blue-700 ${regionItemActiveClass}`
										: 'text-gray-700'}"
									onclick={() => selectRegion(region)}
								>
									{getRegionDisplay(region)}
								</button>
							{/each}
						</div>
					{:else if filteredTimezones}
						<!-- Show timezones for the selected region or search results -->
						{#if selectedRegion && !searchQuery}
							<!-- Back button when viewing a specific region -->
							<div class="py-2 px-3 border-b">
								<button
									type="button"
									class="flex items-center text-sm text-blue-600 hover:text-blue-800 {backButtonClass}"
									onclick={backToRegions}
								>
									<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 19l-7-7 7-7"
										></path>
									</svg>
									{backToRegionsLabel}
								</button>
							</div>
						{/if}

						<!-- Render regions and their timezones -->
						{#each Object.entries(filteredTimezones) as [region, timezones]}
							<div class="py-1">
								<div class="px-3 py-2 text-xs font-semibold text-gray-500 {regionHeaderClass}">
									{getRegionDisplay(region)}
								</div>
								{#each Object.entries(timezones) as [timezone, data]}
									<button
										type="button"
										class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer
                                            {timezoneItemClass}
                                            {value === timezone
											? `bg-blue-50 text-blue-700 ${timezoneItemActiveClass}`
											: 'text-gray-700'}"
										onclick={() => selectTimezone(timezone)}
									>
										<div class="flex justify-between">
											<span class={timezoneNameClass}>{data[0]}</span>
											<span class="text-gray-500 {timezoneUTCClass}">UTC{data[1]}</span>
										</div>
									</button>
								{/each}
							</div>
						{/each}
					{:else}
						<!-- No results found -->
						<div class="py-1">
							<div class="px-3 py-2 text-sm text-gray-500 {noResultsClass}">{noTimezonesLabel}</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

{#if required && !value}
	<input type="hidden" required {value} />
{/if}
