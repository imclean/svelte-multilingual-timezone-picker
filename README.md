# Svelte Multilingual Timezone Picker

A comprehensive, multilingual timezone picker component for Svelte 5 applications with a clean, accessible interface.

![Svelte Timezone Picker.](https://github.com/imclean/svelte-timezone-picker/blob/main/timezone-picker.png)

## Features

- 🌐 **Multilingual Support**: Built-in support for 8 languages with easy extension to others
- 🔍 **Search Functionality**: Quick timezone search by name or city
- 🌍 **Region-based Selection**: Intuitive hierarchical timezone navigation
- 📱 **Fully Responsive**: Works across all device sizes
- 🎨 **Tailwind and Custom CSS Styling Support**: Modern, customizable design with granular class control
- 🧩 **Svelte 5 Runes**: Built with the latest Svelte 5 reactivity model
- 🔄 **Two-way Binding**: Easy integration with your existing forms
- ♿ **Accessibility**: Keyboard navigation and screen reader friendly
- 🛡️ **TypeScript**: Fully typed for developer confidence
- 💻 **Server-Side Rendering**: Compatible with SvelteKit SSR
- 🕒 **Supports Standard & Daylight Time Savings**: Standard Time (SDT) and Daylight Saving Time (DST) offsets from UTC in hours and minutes.

## Installation

```bash
npm install svelte-multilingual-timezone-picker
```

## Basic Usage

```svelte
<script>
	import { TimezonePicker, getTimezoneDataForLocale } from 'svelte-multilingual-timezone-picker';
	import timezoneData from './timezoneData';
	import { regionData } from '../regionData';

	// Get the user's language or set a default
	let userLocale = $state('en');

	// Process timezone data for display
	let processedTimezoneData = $derived.by(() => {
		return getTimezoneDataForLocale(userLocale, userLocale, timezoneData);
	});

	let selectedTimezone = $state('');
</script>

<TimezonePicker
	bind:value={selectedTimezone}
	timezoneData={processedTimezoneData}
	{userLocale}
	{regionData}
/>

<p>Selected timezone: {selectedTimezone}</p>
```

## Advanced Usage with Timezone Value Display

```svelte
<script>
	import {
		TimezonePicker,
		getTimezoneDataForLocale,
		getTimezoneValueForCity
	} from 'svelte-multilingual-timezone-picker';
	import { type TimeZoneChangeEvent } from 'svelte-multilingual-timezone-picker';
	import timezoneData from './timezoneData';
	import { regionData } from '../regionData';

	let userLocale = $state('es');
	let selectedTimezone = $state('America/New_York');

	// Process timezone data for the selected locale
	let processedTimezoneData = $derived.by(() => {
		return getTimezoneDataForLocale(userLocale, userLocale, timezoneData);
	});

	// Get formatted timezone value
	let timezoneValue = $derived.by(() => {
		return getTimezoneValueForCity(userLocale, selectedTimezone, 'en', timezoneData);
	});

	function handleChange(event) {
		console.log('Timezone changed to:', event.detail.value);
	}
</script>

<TimezonePicker
	bind:value={selectedTimezone}
	timezoneData={processedTimezoneData}
	{regionData}
	{userLocale}
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

{#if timezoneValue}
	<div class="mt-4 p-3 bg-gray-100 rounded">
		<p>Timezone value: {timezoneValue}</p>
	</div>
{/if}
```

## Tailwind CSS Support

This component supports Tailwind CSS. Make sure to include the component's path in your Tailwind configuration:

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

## With SvelteKit Form

```svelte
<script>
	import { TimezonePicker, getTimezoneDataForLocale } from 'svelte-multilingual-timezone-picker';
	import timezoneData from './timezoneData';
	import { regionData } from '../regionData';

	let formData = $state({
		name: '',
		email: '',
		timezone: ''
	});

	let userLocale = $state('en');

	// Process timezone data for the form
	let processedTimezoneData = $derived.by(() => {
		return getTimezoneDataForLocale(userLocale, userLocale, timezoneData);
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
			<TimezonePicker
				bind:value={formData.timezone}
				timezoneData={processedTimezoneData}
				{regionData}
				{userLocale}
				required={true}
			/>
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

### Utility Functions

#### getTimezoneDataForLocale

```typescript
function getTimezoneDataForLocale(
	displayLocale: string, // The locale to display timezone names in
	fallbackLocale: string, // Fallback locale if display locale isn't available
	timezoneData: any // The raw timezone data
): object;
```

This function processes the raw timezone data for a specific locale. It returns a structured object that can be directly used by the TimezonePicker component.

#### getTimezoneValueForCity

```typescript
function getTimezoneValueForCity(
	locale: string, // The locale to use for timezone display
	timezone: string, // The timezone identifier (e.g., 'America/New_York')
	fallbackLocale: string, // Fallback locale if primary locale isn't available
	timezoneData: any // The raw timezone data
): string | undefined;
```

This function returns a formatted string representation of a timezone value, including city name and UTC offset.

### Component Props

#### Functional Props

| Prop                        | Type       | Default                 | Description                                               |
| --------------------------- | ---------- | ----------------------- | --------------------------------------------------------- |
| `value`                     | `string`   | `''`                    | The selected timezone value (e.g., 'America/New_York')    |
| `userLocale`                | `string`   | `'en'`                  | The locale for timezone display                           |
| `timezoneData`              | `object`   | _required_              | The processed timezone data from getTimezoneDataForLocale |
| `regionData`                | `object`   | _required_              | The processed regional data from localised translations   |
| `selectRegionPlaceholder`   | `string`   | `'Select Region'`       | Placeholder for region selection                          |
| `selectTimezonePlaceholder` | `string`   | `'Select timezone'`     | Placeholder for timezone selection                        |
| `className`                 | `string`   | `''`                    | Additional CSS classes for the component                  |
| `regionLabel`               | `string`   | `'Region'`              | Label for region section                                  |
| `timezoneLabel`             | `string`   | `'Timezone'`            | Label for timezone section                                |
| `disabled`                  | `boolean`  | `false`                 | Whether the component is disabled                         |
| `required`                  | `boolean`  | `false`                 | Whether selection is required for form validation         |
| `searchable`                | `boolean`  | `true`                  | Enable search functionality                               |
| `searchPlaceholder`         | `string`   | `'Search timezones...'` | Placeholder for search input                              |
| `backToRegionsLabel`        | `string`   | `'Back to regions'`     | Text for back button                                      |
| `handleTimezoneChange`      | `function` | `undefined`             | Handler for timezone change events                        |

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
	timezoneData={processedTimezoneData}
	{regionData}
	handleTimezoneChange={(event) => {
		console.log(event.detail.value); // The selected timezone
	}}
/>
```

### Types

```typescript
// Type for timezone change events
export interface TimeZoneChangeEvent {
	detail: {
		value: string;
	};
}

// Regional Translation Data Format:
export type RegionTranslations = Record<string, Record<string, string>>;

// Example raw regional data structure:
// export const regionData: Record<string, Record<string, string>> = {
// 	en: {
// 		Standard: 'Standard',
// 		Africa: 'Africa',
// 		America: 'America',
// 	},
// 	de: {
// 		Standard: 'Standard',
// 		Africa: 'Afrika',
// 		America: 'Amerika',
// 	},
// 	es: {
// 		Standard: 'Estándar',
// 		Africa: 'África',
// 		America: 'América',
// 	},
// 	zh: {
// 		Standard: '标准',
// 		Africa: '非洲',
// 		America: '美洲',
// 	}
// };

// Raw timezone data format
export interface TimezoneData {
	[region: string]: {
		[locale: string]: {
			[timezone: string]: [string, string, string]; // [cityName, standardTime, daylightTime]
		};
	};
}

// Example raw timezone data structure:
// {
//   "Arctic": {
//     "en": {
//       "Arctic/Longyearbyen": ["Longyearbyen", "+01:00", "+02:00"]
//     },
//     "fr": {
//       "Arctic/Longyearbyen": ["Longyearbyen", "+01:00", "+02:00"]
//     }
//   },
//   "Asia": {
//     "en": {
//       "Asia/Tokyo": ["Tokyo", "+09:00", "+09:00"]
//     }
//   }
// }

// Component props
export interface TimeZonePickerProps {
	// Functional props
	value?: string;
	userLocale?: string;
	timezoneData: object;
	regionalData: object;
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
```

## Multilingual Support

The component supports multiple languages through the timezone data structure and the `userLocale` prop. The included utility functions work with data in 8 languages:

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
	import { TimezonePicker, getTimezoneDataForLocale } from 'svelte-multilingual-timezone-picker';
	import timezoneData from './timezoneData';
	import { regionData } from './regionData';

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

	// Process timezone data for the selected language
	let processedTimezoneData = $derived.by(() => {
		return getTimezoneDataForLocale(selectedLanguage, selectedLanguage, timezoneData);
	});
</script>

<div>
	<label for="language">Language:</label>
	<select id="language" bind:value={selectedLanguage}>
		{#each languages as lang}
			<option value={lang.value}>{lang.label}</option>
		{/each}
	</select>
</div>

<TimezonePicker
	bind:value={selectedTimezone}
	timezoneData={processedTimezoneData}
	userLocale={selectedLanguage}
	{regionData}
/>
```

## Timezone Data Structure

Your timezone data should follow this structure:

```javascript
// timezoneData.ts
export default {
	Arctic: {
		en: {
			'Arctic/Longyearbyen': ['Longyearbyen', '+01:00', '+02:00']
		},
		it: {
			'Arctic/Longyearbyen': ['Longyearbyen', '+01:00', '+02:00']
		},
		fr: {
			'Arctic/Longyearbyen': ['Longyearbyen', '+01:00', '+02:00']
		},
		es: {
			'Arctic/Longyearbyen': ['Longyearbyen', '+01:00', '+02:00']
		},
		pt: {
			'Arctic/Longyearbyen': ['Longyearbyen', '+01:00', '+02:00']
		},
		de: {
			'Arctic/Longyearbyen': ['Longyearbyen', '+01:00', '+02:00']
		},
		ja: {
			'Arctic/Longyearbyen': ['ロングイェールビーン', '+01:00', '+02:00']
		},
		zh: {
			'Arctic/Longyearbyen': ['朗伊尔城', '+01:00', '+02:00']
		}
	},
	Asia: {
		en: {
			'Asia/Aden': ['Aden', '+03:00', '+03:00'],
			'Asia/Almaty': ['Almaty', '+06:00', '+06:00']
			// More timezones...
		}
		// Other languages...
	}
	// More regions...
};
```

Where each timezone entry follows the format:

- Key: The IANA timezone identifier (e.g., "Asia/Tokyo")
- Value: An array containing:
  - [0]: The city name in the specified language
  - [1]: Standard time offset from UTC (e.g., "+09:00")
  - [2]: Daylight saving time offset from UTC (e.g., "+10:00")

## Custom Timezone Data

If you need to add or modify the timezone data, you can extend the existing structure:

```typescript
import timezoneData from './timezoneData';

// Add a new language for a region
const customTimezoneData = JSON.parse(JSON.stringify(timezoneData)); // Deep clone

// Add support for Russian language to Asia region
customTimezoneData.Asia.ru = {
	'Asia/Tokyo': ['Токио', '+09:00', '+09:00'],
	'Asia/Dubai': ['Дубай', '+04:00', '+04:00']
	// More timezones...
};
```

## Regions Data Structure

Your region data should follow this structure:

```javascript
// regionData.ts
export const regionData: Record<string, Record<string, string>> = {
	en: {
		Standard: 'Standard',
		Africa: 'Africa',
		America: 'America'
	},
	de: {
		Standard: 'Standard',
		Africa: 'Afrika',
		America: 'Amerika'
	},
	es: {
		Standard: 'Estándar',
		Africa: 'África',
		America: 'América'
	},
	//more translations
};

```

Where each region entry follows the format:

- Key: The language of the user locale
- Value: An object containing:
  - The region name key in english
  - The region name value in the language of the key

## Styling Customization

The component uses Tailwind CSS classes. You can customize the appearance through:

1. **Base styling**: Use the `className` prop for the container
2. **Granular CSS control**: Use the individual styling props to target specific parts of the component
3. **Custom Tailwind classes**: Override specific elements with your custom classes

Example of custom styling:

```svelte
<TimezonePicker
    bind:value={selectedTimezone}
    timezoneData={processedTimezoneData}
	{regionData}
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
	timezoneData={processedTimezoneData}
	{regionData}
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
