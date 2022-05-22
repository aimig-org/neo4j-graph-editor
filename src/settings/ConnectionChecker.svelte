<script>
	import { onMount, onDestroy } from 'svelte';
	import * as neo4j from 'neo4j-driver';
	import debounce from 'lodash.debounce';

	import { serverSettings } from './settings';

	let status = 'initializing...';

	async function connectToServer() {
		try {
			status = `connection...`;
			const driver = neo4j.driver(
				$serverSettings.server,
				neo4j.auth.basic($serverSettings.user, $serverSettings.password)
			);
			await driver.verifyConnectivity();
			status = `🎉 Valid credentials!`;
			await driver.close();
		} catch (err) {
			status = `😞 Error connecting: ${err}`;
		}
	}

	let unsubscribeSettings;
	onMount(() => {
		const connectDebounced = debounce(connectToServer, 1000);
		unsubscribeSettings = serverSettings.subscribe(() => {
			status = 'waiting for more input...';
			connectDebounced();
		});
	});

	onDestroy(unsubscribeSettings);
</script>

<div>{status}</div>

<style>
</style>
