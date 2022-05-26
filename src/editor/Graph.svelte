<script>
	import { Network } from 'vis-network';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	import networkStore from '../store';
	import { options } from './networkOption';

	export let selectedNode;

	let networkGraph;
	let unsubscriptNetworkStore;

	const dispatch = createEventDispatcher();

	function listenToStoreEvents() {
		// Listen to events of the nodes DataSet (e.g. "add", "remove", "update")
		// see https://visjs.github.io/vis-data/data/dataset.html#Subscriptions
		networkStore.nodes.on('*', (event, properties) => {
			console.log(`[nodes⚡event]: "${event}" properties:${JSON.stringify(properties)}`);
			//networkGraph.stabilize();
		});

		// Listen to events of the edges DataSet (e.g. "add", "delete", "update")
		// see https://visjs.github.io/vis-data/data/dataset.html#Subscriptions
		networkStore.edges.on('*', (event, properties) => {
			console.log(`[edges⚡event]: "${event}" properties:${JSON.stringify(properties)}`);
			//networkGraph.stabilize();
		});

		// Subscripe to general changes to the dataStore.
		// The dataStore changes e.g. is after a new Network is loaded.
		unsubscriptNetworkStore = networkStore.dataStore.subscribe(networkData => {
			console.log(`[networkStore⚡subscripe]`);
			networkGraph.setData(networkData);
			//networkGraph.stabilize();
		});
	}

	function listenToGraphEvents() {
		networkGraph.on('selectNode', params => {
			console.log(`[Graph⚡event] "selectNode":`, params);
			selectedNode = networkStore.nodes.get(params.nodes[0]);
		});
		networkGraph.on('dragStart', params => {
			console.log(`[Graph⚡event] "dragStart":`, params);
			/* Only set selectedNode if nodes is valid.
			 * This fixes #5 */
			if (params.nodes && params.nodes.length) {
				selectedNode = networkStore.nodes.get(params.nodes[0]);
			}
		});
		networkGraph.on('deselectNode', params => {
			console.log(`[Graph⚡event] "deselectNode":`, params);
			selectedNode = null;
		});
		networkGraph.on('doubleClick', params => {
			console.log(`[Graph⚡event] "doubleClick":`, params);
			const nodeId = params.nodes[0];
			if (nodeId >= 0) {
				dispatch('focusChanged', {
					nodeId,
				});
			}
		});

		// This is only for Debugging
		{
			// 	[
			// 		//'click',
			// 		'doubleClick',
			// 		'oncontext',
			// 		// 'hold',
			// 		// 'release',
			// 		'select',
			// 		//'selectNode',
			// 		'selectEdge',
			// 		//'deselectNode',
			// 		'deselectEdge',
			// 		// 'dragStart',
			// 		// 'dragging',
			// 		// 'dragEnd',
			// 		'controlNodeDragging',
			// 		'controlNodeDragEnd',
			// 		// 'hoverNode',
			// 		// 'blurNode',
			// 		// 'hoverEdge',
			// 		// 'blurEdge',
			// 		// 'zoom',
			// 		'showPopup',
			// 		'hidePopup',
			// 		// 'startStabilizing',
			// 		// 'stabilizationProgress',
			// 		// 'stabilizationIterationsDone',
			// 		// 'stabilized',
			// 		// 'resize',
			// 		// 'initRedraw',
			// 		// 'beforeDrawing',
			// 		// 'afterDrawing',
			// 		'animationFinished',
			// 		'configChange',
			// 	].forEach(event => {
			// 		networkGraph.on(event, params => {
			// 			console.log(`[Graph⚡event] "${event}":`, params);
			// 		});
			// 	});
		}
	}

	onMount(async () => {
		// create a network
		const container = document.getElementById('network');

		// initialize the network with the nodes/edges data from the network-store
		networkGraph = new Network(
			container,
			{
				nodes: networkStore.nodes,
				edges: networkStore.edges,
			},
			options
		);

		listenToStoreEvents();
		listenToGraphEvents();
	});

	onDestroy(() => {
		unsubscriptNetworkStore();
	});
</script>

<svelte:head>
	<!-- TODO: we should find a better way to load vis's css! -->
	<link rel="stylesheet" href="//unpkg.com/vis-network@9.1.2/styles/vis-network.css" />
</svelte:head>

<div id="network" />

<style>
	#network {
		height: 100%;

		background-color: var(--background);
		box-shadow: inset 0 0 10px 0px rgb(0 0 0 / 10%);
	}
</style>
