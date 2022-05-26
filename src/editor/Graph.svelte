<script>
	import { Network } from 'vis-network';
	import { onDestroy, onMount } from 'svelte';

	import networkStore from '../store';
	import { options } from './networkOption';

	export let selectedNode;

	let networkGraph;
	let unsubscriptNetworkStore;

	function appendNetworkEvents() {
		networkGraph.on('selectNode', function (params) {
			console.log(`[Graph] selectNode Event:`, params);
			selectedNode = networkStore.nodes.get(params.nodes[0]);
		});
		networkGraph.on('dragStart', function (params) {
			console.log(`[Graph] dragStart Event:`, params);
			/* Only set selectedNode if nodes is valid.
			 * This fixes #5 */
			if (params.nodes && params.nodes.length) {
				selectedNode = networkStore.nodes.get(params.nodes[0]);
			}
		});
		networkGraph.on('deselectNode', function (params) {
			console.log(`[Graph] deselectNode Event:`, params);
			selectedNode = null;
		});

		// This is only for Debugging
		{
			// [
			// 	'click',
			// 	'doubleClick',
			// 	'oncontext',
			// 	// 'hold',
			// 	// 'release',
			// 	'select',
			// 	'selectNode',
			// 	'selectEdge',
			// 	'deselectNode',
			// 	'deselectEdge',
			// 	// 'dragStart',
			// 	// 'dragging',
			// 	// 'dragEnd',
			// 	'controlNodeDragging',
			// 	'controlNodeDragEnd',
			// 	// 'hoverNode',
			// 	// 'blurNode',
			// 	// 'hoverEdge',
			// 	// 'blurEdge',
			// 	// 'zoom',
			// 	'showPopup',
			// 	'hidePopup',
			// 	// 'startStabilizing',
			// 	// 'stabilizationProgress',
			// 	// 'stabilizationIterationsDone',
			// 	// 'stabilized',
			// 	// 'resize',
			// 	// 'initRedraw',
			// 	// 'beforeDrawing',
			// 	// 'afterDrawing',
			// 	'animationFinished',
			// 	'configChange',
			// ].forEach(event => {
			// 	networkGraph.on(event, params => {
			// 		console.log(`[Graph] event "${event}":`, params);
			// 	});
			// });
		}
	}

	onMount(async () => {
		// create a network
		const container = document.getElementById('network');

		// initialize the network with the nodes/edges data from the network-store
		const data = {
			nodes: networkStore.nodes,
			edges: networkStore.edges,
		};

		networkGraph = new Network(container, data, options);

		unsubscriptNetworkStore = networkStore.dataStore.subscribe(networkData => {
			console.log(`networkStore subscripe`);
			networkGraph.setData(networkData);
			networkGraph.stabilize();
		});

		appendNetworkEvents();
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
