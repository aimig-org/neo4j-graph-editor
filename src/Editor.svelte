<script>
	import { onDestroy } from 'svelte';
	import debounce from 'lodash.debounce';

	import CypherInput from './editor/CypherInput.svelte';
	import Graph from './editor/Graph.svelte';
	import Navigation from './editor/Navigation.svelte';
	import Properties from './editor/Properties.svelte';

	import { appSettings, serverSettings } from './settings/settings';
	import networkStore from './store';

	let selectedNode;
	let cypher = $appSettings.initialCypher;

	// execute the current cypher
	async function executeCurrentCypher(c, clear = true) {
		const isValid = await networkStore.setServerSettings($serverSettings);
		if (isValid) {
			await networkStore.loadNetwork(c, clear);
		}
	}

	async function focusOnSelected() {
		const nodeId = selectedNode.id;
		await focusOnNode(nodeId);
	}

	async function loadConnectionsForSelectedNode() {
		const nodeId = selectedNode.id;
		await loadAdditionalConnections(nodeId);
	}

	async function handleDoubleClick(event) {
		console.log(
			`[Editor.focusOnNode] event:${JSON.stringify(event)} detail:${JSON.stringify(event.detail)}`
		);
		const nodeId = event.detail.nodeId;
		await focusOnNode(nodeId);
	}

	async function focusOnNode(nodeId) {
		// load the node with the given nodeId ans also load all its connected nodes
		cypher = `MATCH (nFocus)<-[r]->(n) WHERE ID(nFocus)=${nodeId} RETURN nFocus,r,n`;
		await executeCurrentCypher(cypher, true);
	}

	async function loadAdditionalConnections(nodeId) {
		// load the node with the given nodeId ans also load all its connected nodes
		cypher = `MATCH (n1)<-[r]->(n2) WHERE ID(n1)=${nodeId} RETURN n1,r,n2`;
		await executeCurrentCypher(cypher, false);
	}

	/* Re-execute the current cypher if the server-settings change
	 * But only try it once every second (not on every key-stroke in teh settings-dialog).
	 * TODO: It would be propably better to emit new server settings only if the are valid! */
	const runQueryDebounced = debounce(() => executeCurrentCypher(cypher), 1000);
	const unsubscribeSettings = serverSettings.subscribe(runQueryDebounced);

	onDestroy(unsubscribeSettings);
</script>

<div id="editor">
	<header>
		<CypherInput bind:cypher on:execute={executeCurrentCypher} />
	</header>

	<div class="flex-container">
		<section id="graph">
			<Graph bind:selectedNode on:focusChanged={handleDoubleClick} />
		</section>

		<aside id="properties">
			<Navigation
				bind:selectedNode
				on:focusOnSelected={focusOnSelected}
				on:loadConnectionsForSelectedNode={loadConnectionsForSelectedNode}
			/>
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
