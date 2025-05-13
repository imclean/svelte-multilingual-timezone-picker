````markdown
# Svelte Timezone Picker

A comprehensive, multilingual timezone picker component for Svelte 5 applications with a clean, accessible interface.

![Svelte Timezone Picker Screenshot](https://placeholder-for-screenshot.png)

## Features

- 🌐 **Multilingual Support**: Built-in support for 8 languages with easy extension to others
- 🔍 **Search Functionality**: Quick timezone search by name or city
- 🌍 **Region-based Selection**: Intuitive hierarchical timezone navigation
- 📱 **Fully Responsive**: Works across all device sizes
- 🎨 **Tailwind CSS Styling**: Modern, customizable design with granular class control
- 🧩 **Svelte 5 Runes**: Built with the latest Svelte 5 reactivity model
- 🔄 **Two-way Binding**: Easy integration with your existing forms
- ♿ **Accessibility**: Keyboard navigation and screen reader friendly
- 🛡️ **TypeScript**: Fully typed for developer confidence
- 💻 **Server-Side Rendering**: Compatible with SvelteKit SSR

## Installation

```bash
npm install svelte-timezone-picker
```
````

## Requirements

This component requires Tailwind CSS. Make sure to include the component's path in your Tailwind configuration:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-timezone-picker/**/*.{js,svelte}' // Add this line
	],
	theme: {
		extend: {}
	},
	plugins: []
};
```

## Basic Usage

```svelte
<script>
	import { TimezonePicker, timezoneData } from 'svelte-timezone-picker';

	let selectedTimezone = $state('');
</script>

<TimezonePicker bind:value={selectedTimezone} {timezoneData} />

<p>Selected timezone: {selectedTimezone}</p>
```

## Advanced Usage

```svelte
<script>
	import { TimezonePicker, timezoneData } from 'svelte-timezone-picker';

	let selectedTimezone = $state('America/New_York');

	function handleChange(event) {
		console.log('Timezone changed to:', event.detail.value);
	}
</script>

<TimezonePicker
	bind:value={selectedTimezone}
	{timezoneData}
	userLocale="es"
	className="max-w-md"
	selectRegionPlaceholder="Seleccionar región"
	selectTimezonePlaceholder="Seleccionar zona horaria"
	regionLabel="Región"
	timezoneLabel="Zona Horaria"
	searchPlaceholder="Buscar zonas horarias..."
	backToRegionsLabel="Volver a regiones"
	handleTimezoneChange={handleChange}
	required={true}
	searchable={true}
/>
```

## With SvelteKit Form

```svelte
<script>
	import { TimezonePicker, timezoneData } from 'svelte-timezone-picker';

	let formData = $state({
		name: '',
		email: '',
		timezone: ''
	});
</script>

<form method="POST" action="/submit">
	<div class="space-y-4">
		<div>
			<label for="name" class="block text-sm font-medium">Name</label>
			<input
				id="name"
				name="name"
				bind:value={formData.name}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
			/>
		</div>

		<div>
			<label for="email" class="block text-sm font-medium">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				bind:value={formData.email}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
			/>
		</div>

		<div>
			<label for="timezone" class="block text-sm font-medium">Timezone</label>
			<TimezonePicker bind:value={formData.timezone} {timezoneData} required={true} />
			<input type="hidden" name="timezone" value={formData.timezone} />
		</div>

		<button
			type="submit"
			class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
		>
			Submit
		</button>
	</div>
</form>
```

## API Reference

### Props

#### Functional Props

| Prop                        | Type           | Default                 | Description                                            |
| --------------------------- | -------------- | ----------------------- | ------------------------------------------------------ |
| `value`                     | `string`       | `''`                    | The selected timezone value (e.g., 'America/New_York') |
| `userLocale`                | `string`       | `'en'`                  | The locale for timezone display                        |
| `timezoneData`              | `TimezoneData` | _required_              | The timezone data structure                            |
| `selectRegionPlaceholder`   | `string`       | `'Select Region'`       | Placeholder for region selection                       |
| `selectTimezonePlaceholder` | `string`       | `'Select timezone'`     | Placeholder for timezone selection                     |
| `className`                 | `string`       | `''`                    | Additional CSS classes for the component               |
| `regionLabel`               | `string`       | `'Region'`              | Label for region section                               |
| `timezoneLabel`             | `string`       | `'Timezone'`            | Label for timezone section                             |
| `disabled`                  | `boolean`      | `false`                 | Whether the component is disabled                      |
| `required`                  | `boolean`      | `false`                 | Whether selection is required for form validation      |
| `searchable`                | `boolean`      | `true`                  | Enable search functionality                            |
| `searchPlaceholder`         | `string`       | `'Search timezones...'` | Placeholder for search input                           |
| `backToRegionsLabel`        | `string`       | `'Back to regions'`     | Text for back button                                   |
| `handleTimezoneChange`      | `function`     | `undefined`             | Handler for timezone change events                     |

#### Styling Props

| Prop                      | Type     | Default | Description                                   |
| ------------------------- | -------- | ------- | --------------------------------------------- |
| `containerClass`          | `string` | `''`    | Classes for the main container                |
| `buttonClass`             | `string` | `''`    | Classes for the dropdown trigger button       |
| `buttonActiveClass`       | `string` | `''`    | Additional classes when button is active/open |
| `buttonDisabledClass`     | `string` | `''`    | Classes when button is disabled               |
| `dropdownClass`           | `string` | `''`    | Classes for the dropdown menu container       |
| `searchContainerClass`    | `string` | `''`    | Classes for the search input container        |
| `searchInputClass`        | `string` | `''`    | Classes for the search input                  |
| `regionHeaderClass`       | `string` | `''`    | Classes for region section headers            |
| `regionItemClass`         | `string` | `''`    | Classes for individual region items           |
| `regionItemActiveClass`   | `string` | `''`    | Classes for active/selected region item       |
| `backButtonClass`         | `string` | `''`    | Classes for the back to regions button        |
| `timezoneItemClass`       | `string` | `''`    | Classes for individual timezone items         |
| `timezoneItemActiveClass` | `string` | `''`    | Classes for active/selected timezone item     |
| `timezoneNameClass`       | `string` | `''`    | Classes for timezone name text                |
| `timezoneUTCClass`        | `string` | `''`    | Classes for timezone UTC offset text          |
| `noResultsClass`          | `string` | `''`    | Classes for no results message                |

### Events

The component emits a `change` event when the timezone selection changes:

```svelte
<TimezonePicker
	bind:value={selectedTimezone}
	{timezoneData}
	handleTimezoneChange={(event) => {
		console.log(event.detail.value); // The selected timezone
	}}
/>
```

### Types

```typescript
// Timezone data structure
export type TimezoneValue = [string, string, string]; // [cityName, standardTime, daylightTime]

export interface TimezoneLanguages {
	[locale: string]: {
		[timezone: string]: TimezoneValue;
	};
}

export interface TimezoneData {
	[region: string]: TimezoneLanguages;
}

// Component props
export interface TimeZonePickerProps {
	// Functional props
	value?: string;
	userLocale?: string;
	timezoneData: TimezoneData;
	selectRegionPlaceholder?: string;
	selectTimezonePlaceholder?: string;
	className?: string;
	regionLabel?: string;
	timezoneLabel?: string;
	disabled?: boolean;
	required?: boolean;
	searchable?: boolean;
	searchPlaceholder?: string;
	backToRegionsLabel?: string;
	handleTimezoneChange?: (event: TimeZoneChangeEvent) => void;

	// Styling props
	containerClass?: string;
	buttonClass?: string;
	buttonActiveClass?: string;
	buttonDisabledClass?: string;
	dropdownClass?: string;
	searchContainerClass?: string;
	searchInputClass?: string;
	regionHeaderClass?: string;
	regionItemClass?: string;
	regionItemActiveClass?: string;
	backButtonClass?: string;
	timezoneItemClass?: string;
	timezoneItemActiveClass?: string;
	timezoneNameClass?: string;
	timezoneUTCClass?: string;
	noResultsClass?: string;
}

// Change event
export interface TimeZoneChangeEvent {
	detail: {
		value: string;
	};
}
```

## Multilingual Support

The component supports multiple languages through the `timezoneData` structure and the `userLocale` prop. The included `timezoneData` has support for 8 languages:

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Chinese (zh)
- Japanese (ja)

Example of switching languages:

```svelte
<script>
	import { TimezonePicker, timezoneData } from 'svelte-timezone-picker';

	let selectedTimezone = $state('');
	let selectedLanguage = $state('en');

	const languages = [
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Español' },
		{ value: 'fr', label: 'Français' },
		{ value: 'de', label: 'Deutsch' },
		{ value: 'it', label: 'Italiano' },
		{ value: 'pt', label: 'Português' },
		{ value: 'zh', label: '中文' },
		{ value: 'ja', label: '日本語' }
	];
</script>

<div>
	<label for="language">Language:</label>
	<select id="language" bind:value={selectedLanguage}>
		{#each languages as lang}
			<option value={lang.value}>{lang.label}</option>
		{/each}
	</select>
</div>

<TimezonePicker bind:value={selectedTimezone} {timezoneData} userLocale={selectedLanguage} />
```

## Custom Timezone Data

If you need to add or modify the timezone data, you can create your own data structure following the `TimezoneData` interface:

```typescript
import { timezoneData } from 'svelte-timezone-picker';

// Add a new language
const customTimezoneData = { ...timezoneData };

// Add support for Russian language
for (const region in customTimezoneData) {
	if (customTimezoneData[region]) {
		customTimezoneData[region]['ru'] = {
			// Russian translations here
			// Example:
			'America/New_York': ['Нью-Йорк', '-05:00', '-04:00']
			// ... other timezones
		};
	}
}
```

## Styling Customization

The component uses Tailwind CSS classes. You can customize the appearance through:

1. **Base styling**: Use the `className` prop for the container
2. **Granular CSS control**: Use the individual styling props to target specific parts of the component
3. **Custom Tailwind classes**: Override specific elements with your custom classes

Example of custom styling:

```svelte
<TimezonePicker
	bind:value={selectedTimezone}
	{timezoneData}
	className="max-w-md"

	// Custom styling for specific parts
	containerClass="border border-blue-300 rounded-xl shadow-lg"
	buttonClass="bg-blue-50 hover:bg-blue-100"
	buttonActiveClass="ring-2 ring-blue-400"
	dropdownClass="bg-white rounded-lg shadow-xl"
	searchInputClass="border-blue-200 focus:ring-blue-500"
	regionHeaderClass="text-blue-700 uppercase text-xs tracking-wide"
	regionItemClass="hover:bg-blue-50"
	regionItemActiveClass="bg-blue-100 font-medium"
	timezoneItemClass="hover:bg-blue-50"
	timezoneItemActiveClass="bg-blue-100 font-medium"
	timezoneNameClass="font-medium"
	timezoneUTCClass="text-blue-600 text-xs"
	backButtonClass="text-blue-600 hover:text-blue-800 font-medium"
/>
```

### Styling Example with Dark Mode

```svelte
<TimezonePicker
	bind:value={selectedTimezone}
	{timezoneData}
	containerClass="dark:bg-gray-800"
	buttonClass="dark:bg-gray-700 dark:text-white dark:border-gray-600"
	dropdownClass="dark:bg-gray-800 dark:border-gray-700"
	searchContainerClass="dark:border-gray-700"
	searchInputClass="dark:bg-gray-700 dark:text-white dark:border-gray-600"
	regionHeaderClass="dark:text-gray-400"
	regionItemClass="dark:text-gray-200 dark:hover:bg-gray-700"
	regionItemActiveClass="dark:bg-gray-700 dark:text-white"
	timezoneItemClass="dark:text-gray-200 dark:hover:bg-gray-700"
	timezoneItemActiveClass="dark:bg-gray-700 dark:text-white"
	timezoneNameClass="dark:text-gray-200"
	timezoneUTCClass="dark:text-gray-400"
	backButtonClass="dark:text-blue-400 dark:hover:text-blue-300"
/>
```

## Browser Support

This component is compatible with all modern browsers. It requires JavaScript to be enabled.

## Accessibility

The component is built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader friendly
- Focus management

## Server-Side Rendering

The component is compatible with SvelteKit's server-side rendering. It will hydrate correctly after the initial render.

## Performance Considerations

- The component uses caching and memoization to optimize performance
- Search operations are debounced to prevent excessive re-renders
- The dropdown menu is mounted/unmounted to minimize DOM elements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This package is released under the MIT License.

---

Developed with ❤️ by Iain McLean.

```

```
