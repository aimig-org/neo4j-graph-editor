<script>
	import { onDestroy } from 'svelte';
	import debounce from 'lodash.debounce';

	import CypherInput from './CypherInput.svelte';
	import Graph from './Graph.svelte';
	import Properties from './Properties.svelte';

	import { appSettings, serverSettings } from '../settings/settings';
	import networkStore from '../store';

	let selectedNode;
	let cypher = $appSettings.initialCypher;

	async function runQuery() {
		const isValid = await networkStore.setServerSettings($serverSettings);
		if (isValid) {
			await networkStore.loadNetwork(cypher);
		}
	}

	const runQueryDebounced = debounce(runQuery, 1000);
	const unsubscribeSettings = serverSettings.subscribe(runQueryDebounced);

	onDestroy(unsubscribeSettings);
</script>

<div id="editor">
	<header>
		<CypherInput bind:cypher on:execute={runQuery} />
	</header>

	<div class="flex-container">
		<section id="graph">
			<Graph bind:selectedNode />
		</section>

		<aside id="properties">
			<Properties bind:selectedNode />
		</aside>
	</div>
</div>

<style>
	#editor {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-grow: 0;
	}

	#editor .flex-container {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		height: calc(100% - 3em);
	}

	#editor .flex-container #graph {
		flex-grow: 1;
	}

	#editor .flex-container #properties {
		width: 300px;
		max-width: 300px;
	}

	@media screen and (min-width: 640px) {
		#editor .flex-container {
			flex-direction: row;
		}
	}
</style>
