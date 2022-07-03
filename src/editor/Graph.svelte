<script>
	import { Network } from 'vis-network';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	import networkStore from '../store';
	import { editorState } from './editorState';
	import { getOptions } from './networkOption';
	import Navigation from './Navigation.svelte';
	import LayoutSettings from './LayoutSettings.svelte';
	import LoadingIndicator from '../components/LoadingIndicator.svelte';

	export let selectedNode;
	export let selectedEdge;
	export let focusNodeId;

	let networkElement;
	let networkGraph;
	let networkOptions = {};
	let unsubscribeNetworkStore;
	let unsubscribeEditorState;
	let loading = networkStore.loading;

	const dispatch = createEventDispatcher();

	function listenToStoreEvents() {
		// Listen to events of the nodes DataSet (e.g. "add", "remove", "update")
		// see https://visjs.github.io/vis-data/data/dataset.html#Subscriptions
		networkStore.nodes.on('*', (event, properties) => {
			console.log(`[nodes⚡event]: "${event}" properties:${JSON.stringify(properties)}`);
		});

		// Listen to events of the edges DataSet (e.g. "add", "delete", "update")
		// see https://visjs.github.io/vis-data/data/dataset.html#Subscriptions
		networkStore.edges.on('*', (event, properties) => {
			console.log(`[edges⚡event]: "${event}" properties:${JSON.stringify(properties)}`);
		});

		// Subscripe to general changes to the dataStore.
		// The dataStore changes e.g. is after a new Network is loaded.
		unsubscribeNetworkStore = networkStore.dataStore.subscribe(networkData => {
			console.log(`[networkStore⚡subscripe]`);
			networkGraph.setData(networkData);
			if (selectedNode) {
				const nodeId = selectedNode.id;
				networkGraph.selectNodes([nodeId]);
			}
		});
	}

	function listenToGraphEvents() {
		networkGraph.on('selectNode', params => {
			console.log(`[Graph⚡event] "selectNode":`, params);
			if (params.nodes && params.nodes.length) {
				selectedNode = networkStore.nodes.get(params.nodes[0]);
			}
		});
		networkGraph.on('selectEdge', params => {
			console.log(`[Graph⚡event] "selectEdge":`, params);
			selectedEdge = networkStore.edges.get(params.edges[0]);
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
		networkGraph.on('deselectEdge', params => {
			console.log(`[Graph⚡event] "deselectEdge":`, params);
			selectedEdge = null;
		});
		networkGraph.on('doubleClick', params => {
			console.log(`[Graph⚡event] "doubleClick":`, params);
			const nodeId = params.nodes[0];
			if (nodeId >= 0 && nodeId !== focusNodeId) {
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

	function fitNetwork() {
		networkGraph.fit();
	}

	function focusOnSelected() {
		dispatch('focusOnSelected');
	}

	function loadConnectionsForSelectedNode() {
		dispatch('loadConnectionsForSelectedNode');
	}

	onMount(async () => {
		// create a network
		networkElement = document.getElementById('network');

		// get initial
		networkOptions = getOptions();

		// initialize the network with the nodes/edges data from the network-store
		networkGraph = new Network(
			networkElement,
			{
				nodes: networkStore.nodes,
				edges: networkStore.edges,
			},
			networkOptions
		);

		// listen to editor-state changes
		unsubscribeEditorState = editorState.subscribe(editorState => {
			networkOptions = getOptions({
				isHierarchical: editorState.layoutHierarchical,
			});
			networkGraph.setOptions(networkOptions);

			// after updating the (layout) ioptions we also need to res-set the data
			networkGraph.setData({
				nodes: networkStore.nodes,
				edges: networkStore.edges,
			});
		});

		listenToStoreEvents();
		listenToGraphEvents();
	});

	onDestroy(() => {
		unsubscribeNetworkStore();
		unsubscribeEditorState();
	});
</script>

<svelte:head>
	<!-- TODO: we should find a better way to load vis's css! -->
	<link rel="stylesheet" href="//unpkg.com/vis-network@9.1.2/styles/vis-network.css" />
</svelte:head>

<div id="graph">
	<div id="network" disabled={$loading} />
	<div id="navigation" disabled={$loading}>
		<LayoutSettings on:fitNetwork={fitNetwork} />
		<Navigation
			disabled={$loading}
			bind:selectedNode
			on:focusOnSelected={focusOnSelected}
			on:loadConnectionsForSelectedNode={loadConnectionsForSelectedNode}
		/>
	</div>
	{#if $loading}
		<LoadingIndicator />
	{/if}
</div>

<style>
	#graph {
		position: relative;
		height: 100%;
		width: 100%;

		background-color: var(--background);
		box-shadow: inset 0 0 10px 0px rgb(0 0 0 / 10%);
	}
	#network {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: opacity 1s, visibility 1s, filter, 1s;
	}
	#network:diabled {
		opacity: 0.3;
		pointer-events: none;
	}

	#navigation {
		position: absolute;
		top: 5px;
		left: 0;

		display: flex;
		background-color: var(--background);
	}
	#network:diabled {
		opacity: 0.3;
		pointer-events: none;
	}
</style>
