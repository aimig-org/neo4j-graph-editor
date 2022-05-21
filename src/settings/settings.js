import { writable } from 'svelte/store';

const SETTINGS_KEY = 'settings';
const defaultSettings = {
	server: undefined,
	user: undefined,
	password: undefined,
};

const SettingsFromStore = localStorage.getItem(SETTINGS_KEY);
const settingValue = SettingsFromStore ? JSON.parse(SettingsFromStore) : defaultSettings;

export const settings = writable(settingValue);

settings.subscribe(settings => {
	localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
});
