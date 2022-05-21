<script>
	import { onMount } from 'svelte';
	import * as neo4j from 'neo4j-driver';
	import debounce from 'lodash.debounce';

	import { settings } from './settings';

	let status = 'initializing...';

	async function connectToServer() {
		try {
			status = `connection...`;
			const driver = neo4j.driver(
				$settings.server,
				neo4j.auth.basic($settings.user, $settings.password)
			);
			await driver.verifyConnectivity();
			status = `🎉 Valid credentials!`;
			driver.close();
		} catch (err) {
			status = `😞 Error connecting: ${err}`;
		}
	}

	onMount(() => {
		const connectDebounced = debounce(connectToServer, 1000);
		settings.subscribe(() => {
			status = 'waiting for more input...';
			connectDebounced();
		});
	});
</script>

<div>{status}</div>

<style>
</style>
