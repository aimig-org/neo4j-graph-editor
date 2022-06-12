<script>
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	import { editorState } from './editorState';
	import networkStore from '../store';

	export let selectedNode;

	let unsubscribeEditorState;

	const dispatch = createEventDispatcher();

	function createNewNode() {
		//create new node and connect it to the selected node.
		const newId = networkStore.addNode(undefined, '', [], {});
		networkStore.addEdge(undefined, 'new edge', newId, selectedNode.id, undefined);
	}

	function deleteSelectedNode() {
		//TODO delete selected node from network.
	}

	function centerOnSelectedNode() {
		dispatch('focusOnSelected');
	}

	function loadConnectionsForSelectedNode() {
		dispatch('loadConnectionsForSelectedNode');
	}

	let navCenterTitle;

	$: {
		navCenterTitle = selectedNode ? 'focus on the selected node' : 'please select a node first';
	}
</script>

<nav>
	<ul id="graph_navigation">
		<!-- <li><button on:click={createNewNode}>New Node</button></li> -->
		<!-- <li><button on:click={deleteSelectedNode}>Delete Selected Node</button></li> -->
		<li>
			<button
				id="nav_center"
				on:click={centerOnSelectedNode}
				disabled={!selectedNode}
				title={navCenterTitle}
			>
				focus on node
			</button>
		</li>
		<li>
			<button
				id="nav_add"
				on:click={loadConnectionsForSelectedNode}
				disabled={!selectedNode}
				title={navCenterTitle}
			>
				load connected nodes
			</button>
		</li>
	</ul>
</nav>

<style>
	ul#graph_navigation {
		list-style: none;
		margin: 0rem;
		padding: 0.25rem;
	}
	ul#graph_navigation li {
		margin: 0;
		padding: 0;
	}

	button {
		margin: 0.25rem;
		padding: 0.25rem;
		border-radius: 0.5rem;
		border: 1px solid gray;
		box-shadow: 1px 1px 0px 1px lightgrey;
		background: #eee;
	}
</style>
