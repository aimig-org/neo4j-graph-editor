import { writable } from 'svelte/store';

const initialCypher = 'MATCH (n)-[r]->(m) RETURN n,r,m';

/* Server Settings */
const SERVER_SETTINGS_KEY = 'server';
const serverSettingsFromStore = localStorage.getItem(SERVER_SETTINGS_KEY);
const serverSettingValue = serverSettingsFromStore
	? JSON.parse(serverSettingsFromStore)
	: {
			server: undefined,
			user: undefined,
			password: undefined,
	  };
export const serverSettings = writable(serverSettingValue);
serverSettings.subscribe(settings => {
	localStorage.setItem(SERVER_SETTINGS_KEY, JSON.stringify(settings));
});

/* App Settings */
const APP_SETTINGS_KEY = 'application';
const appSettingsFromStore = localStorage.getItem(APP_SETTINGS_KEY);
const appSettingValue = appSettingsFromStore
	? JSON.parse(appSettingsFromStore)
	: {
			initialCypher,
	  };
export const appSettings = writable(appSettingValue);
appSettings.subscribe(settings => {
	localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings));
});
