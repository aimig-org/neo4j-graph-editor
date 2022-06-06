<!--
This is the main component that creates the basic structure of the application.
-->
<script>
	import { onDestroy, onMount } from 'svelte';

	import Header from './Header.svelte';
	import Editor from './Editor.svelte';
	import Footer from './Footer.svelte';
	import networkStore from './store';
	import { serverSettings } from './settings/settings';

	let settingsDialog;
	let settingsUnsubscribe;

	onMount(async () => {
		/* Ater the App is loaded we need to:
		 * subscribe to changes of the server-settings
		 * and reconnect to the server.
		 * If connection fails we display the settings-dialog. */
		settingsUnsubscribe = serverSettings.subscribe(async serverSettings => {
			const isValid = await networkStore.setServerSettings(serverSettings);
			if (isValid) {
				await networkStore.connect();
			} else {
				console.warn(`[App⚡serverSettings] invalid serverSettings`);
				settingsDialog.show();
			}
		});
	});

	onDestroy(async () => {
		// disconnecting if the app gets closed.
		await networkStore.disconnect();
		settingsUnsubscribe ?? settingsUnsubscribe();
	});
</script>

<main>
	<header>
		<Header bind:settingsDialog />
	</header>
	<article>
		<Editor />
	</article>
	<footer>
		<Footer />
	</footer>
</main>

<style>
	:root {
		--header-height: 3em;
		--footer-height: 3em;

		--background: white;
		--text-primary: gray;
		--text-secondary: lightgray;
		--text-action: lightgreen;

		--border: lightgray;
	}

	main {
		height: 100%;
		min-height: 100vh;
		color: var(--text-primary);
	}

	main header {
		height: var(--header-height);
	}

	main article {
		height: calc(100vh - var(--header-height) - var(--footer-height));
	}

	main footer {
		height: var(--footer-height);
	}
</style>
