export type TimezoneValue = [string, string, string]; // [cityName, standardTime, daylightTime]
export type RegionTranslations = Record<string, Record<string, string>>;
export interface TimezoneLanguages {
	[locale: string]: {
		[timezone: string]: TimezoneValue;
	};
}

export interface TimezoneData {
	[region: string]: TimezoneLanguages;
}

export interface TimeZonePickerProps {
	value?: string;
	userLocale?: string;
	timezoneData: TimezoneData;
	regionData: RegionTranslations;
	selectRegionPlaceholder?: string;
	selectTimezonePlaceholder?: string;
	className?: string;
	regionLabel?: string;
	timezoneLabel?: string;
	noTimezonesLabel?: string;
	disabled?: boolean;
	required?: boolean;
	searchable?: boolean;
	searchPlaceholder?: string;
	backToRegionsLabel?: string;
	handleTimezoneChange?: (event: TimeZoneChangeEvent) => void;
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

export interface TimeZoneChangeEvent {
	detail: {
		value: string;
	};
}
