<script lang="ts">
	import { getTimezoneDataForLocale, getTimezoneValueForCity } from '$lib/timezoneUtils';
	import TimezonePicker from '$lib/TimezonePicker.svelte';
	import { type TimeZoneChangeEvent } from '$lib/types';
	import timezoneDataFile from '../timezoneData';
	import { regionData } from '../regionData';

	// Get the user's browser language or use a specific language
	let userLocale = $state('en');

	// Get timezone data for the user's locale
	let timezoneData = $derived.by(() => {
		// This creates a dependency on locale
		return getTimezoneDataForLocale(userLocale, userLocale, timezoneDataFile);
	});

	// Selected timezone
	let selectedTimezone = $state('');

	// Callback function to handle timezone selections
	function handleTimezoneChange(event: TimeZoneChangeEvent) {
		selectedTimezone = event.detail.value;
		console.log('Selected timezone:', selectedTimezone);
	}

	// This creates a dependency on selectedTimezone
	let selectedTimezoneValue = $derived.by(() => {
		return getTimezoneValueForCity(userLocale, selectedTimezone, `en`, timezoneDataFile);
	});
</script>

<div class="max-w-[600px] m-auto p-5">
	<h1>Timezone Selector</h1>

	<div class="mb-6">
		<label for="language">Language:</label>
		<select id="language" bind:value={userLocale}>
			<option value="en">English</option>
			<option value="es">Español</option>
			<option value="fr">Français</option>
			<option value="pt">Português</option>
			<option value="it">Italiano</option>
			<option value="de">Deutsch</option>
			<option value="ja">Japanese</option>
			<option value="zh">Chinese (Simplified)</option>
		</select>
	</div>

	<TimezonePicker
		value={selectedTimezone}
		{userLocale}
		{timezoneData}
		{regionData}
		{handleTimezoneChange}
		containerClass="my-custom-container"
		buttonClass="bg-blue-100 border-blue-300"
		buttonActiveClass="ring-blue-400"
		dropdownClass="border border-blue-300 rounded-lg"
		searchInputClass="bg-blue-50"
		regionItemClass="hover:bg-blue-50"
		regionItemActiveClass="font-bold"
		timezoneItemClass="py-3"
		timezoneNameClass="font-medium"
		timezoneUTCClass="text-blue-600"
	/>

	{#if selectedTimezone}
		<div class="mt-6 p-4 bg-gray-200 rounded-lg">
			<p>Selected timezone: {selectedTimezone}</p>
		</div>
	{/if}
	{#if selectedTimezoneValue}
		<div class="mt-6 p-4 bg-gray-200 rounded-lg">
			<p>Timezone value: {selectedTimezoneValue}</p>
		</div>
	{/if}
</div>
