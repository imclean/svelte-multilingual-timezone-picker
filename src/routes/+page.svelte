<script lang="ts">
	import { getTimezoneDataForLocale, getTimezoneValueForCity } from '$lib/components/timezoneUtils';
	import TimezonePicker from '$lib/components/TimezonePicker.svelte';
	import { type TimeZoneChangeEvent } from '$lib/components/types';

	// Get the user's browser language or use a specific language
	let userLocale = $state('en');

	// Get timezone data for the user's locale

	// svelte-ignore state_referenced_locally
	let timezoneData = $derived.by(() => {
		// This creates a dependency on locale
		userLocale;

		// Get timezone data for the user's locale
		return getTimezoneDataForLocale(userLocale);
	});

	// Selected timezone
	let selectedTimezone = $state('');

	function handleTimezoneChange(event: TimeZoneChangeEvent) {
		selectedTimezone = event.detail.value;
		console.log('Selected timezone:', selectedTimezone);
	}

	let selectedTimezoneValue = $derived.by(() => {
		// This creates a dependency on selectedTimezone
		selectedTimezone;
		return getTimezoneValueForCity(userLocale, selectedTimezone);
	});
</script>

<div class="container">
	<h1>Timezone Selector</h1>

	<div class="language-selector">
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

	<TimezonePicker value={selectedTimezone} {userLocale} {timezoneData} {handleTimezoneChange} />

	{#if selectedTimezone}
		<div class="selection-info">
			<p>Selected timezone: {selectedTimezone}</p>
		</div>
	{/if}
	{#if selectedTimezoneValue}
		<div class="selection-info">
			<p>Timezone value: {selectedTimezoneValue}</p>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}

	.language-selector {
		margin-bottom: 20px;
	}

	.selection-info {
		margin-top: 20px;
		padding: 10px;
		background-color: #f0f0f0;
		border-radius: 4px;
	}
</style>
