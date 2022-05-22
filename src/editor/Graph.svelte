<script>
	import { Network } from 'vis-network';
	import { onMount } from 'svelte';

	import networkStore from '../store';

	export let selectedNode;

	function initNetwork(domElementId) {
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
			nodes: {
				size: 20,
				physics: true,
				shape: 'circle',
				borderWidth: 3,
				color: '#FFFF00',
				//shadow: true,
				widthConstraint: {
					minimum: 100,
					maximum: 100,
				},
			},
			edges: {
				physics: true,
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
				//shadow: true,
			},
			physics: {
				forceAtlas2Based: {
					springLength: 300,
					springConstant: 0.33,
					damping: 0.5,
					avoidOverlap: 1,
				},
				minVelocity: 2,
				solver: 'forceAtlas2Based',
				timestep: 0.5,
				stabilization: {
					enabled: false,
					//iterations: 100,
				},
			},
		};
		networkGraph = new Network(container, data, options);

		networkGraph.on('selectNode', function (params) {
			console.log(`[Graph] selectNode Event:`, params);
			selectedNode = networkStore.nodes.get(params.nodes[0]);
		});
		networkGraph.on('dragStart', function (params) {
			console.log(`[Graph] dragStart Event:`, params);
			selectedNode = networkStore.nodes.get(params.nodes[0]);
		});
		networkGraph.on('deselectNode', function (params) {
			console.log(`[Graph] deselectNode Event:`, params);
			selectedNode = undefined;
		});

		// disable physics after initialization
		networkGraph.on('stabilized', params => {
			if (params.iterations > 1) {
				console.log(`[Graph] stabilized Event:`, params);
				networkGraph.setOptions({
					...options,
					...{
						physics: false,
					},
				});
			}
		});

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

		return networkGraph;
	}

	let networkGraph;
	onMount(async () => {
		networkGraph = initNetwork('network');
	});
</script>

<div id="network" />

<svelte:head>
	<link rel="stylesheet" href="//unpkg.com/vis-network@9.1.2/styles/vis-network.css" />
</svelte:head>

<style>
	#network {
		height: 100%;

		background-color: var(--background);
		box-shadow: inset 0 0 10px 0px rgb(0 0 0 / 10%);
	}
</style>
