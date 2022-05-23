<script>
	import { Network } from 'vis-network';
	import { onMount } from 'svelte';

	import networkStore from '../store';
	import { defaultNodeStyle, nodeGroupStyles } from '../settings/labels';

	export let selectedNode;

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

		// disable physics after initialization
		// TODO: this is not working properly
		// networkGraph.on('stabilized', params => {
		// 	if (params.iterations > 1) {
		// 		console.log(`[Graph] stabilized Event:`, params);
		// 		networkGraph.setOptions({
		// 			...options,
		// 			...{
		// 				physics: false,
		// 			},
		// 		});
		// 	}
		// });

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

	function initNetwork(domElementId) {
		const shadow = false;

		// create a network
		const container = document.getElementById(domElementId);

		const data = {
			nodes: networkStore.nodes,
			edges: networkStore.edges,
		};

		const options = {
			interaction: {
				hover: true,
			},
			manipulation: {
				enabled: true,
			},
			//TODO: the physics is not yet "nice"
			physics: {
				barnesHut: {
					centralGravity: 0,
					springLength: 200,
				},
				minVelocity: 0.75,
			},
			nodes: {
				shape: 'circle',
				borderWidth: 3,
				shadow,
				widthConstraint: {
					minimum: 100,
					maximum: 100,
				},
				// default node style (if no group is set)
				...defaultNodeStyle,
			},
			edges: {
				smooth: {
					type: 'continuous',
					//forceDirection: 'none',
					//roundness: 0.01,
				},
				arrows: {
					to: {
						enabled: true,
					},
				},
				shadow,
			},
			groups: nodeGroupStyles,
		};

		networkGraph = new Network(container, data, options);

		appendNetworkEvents();

		return networkGraph;
	}

	let networkGraph;
	onMount(async () => {
		networkGraph = initNetwork('network');
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
