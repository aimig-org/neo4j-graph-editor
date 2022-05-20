<script>
	import { DataSet } from 'vis-data';
	import { Network } from 'vis-network';

	import { onMount } from 'svelte';

	export let selectedNodeId;

	function initNetwork(nodeId) {
		// create an array with nodes
		let nodes = new DataSet([
			{ id: 1, label: 'Node 1' },
			{ id: 2, label: 'Node 2' },
			{ id: 3, label: 'Node 3' },
			{ id: 4, label: 'Node 4' },
			{ id: 5, label: 'Node 5' },
		]);

		// create an array with edges
		let edges = new DataSet([
			{ from: 1, to: 3 },
			{ from: 1, to: 2 },
			{ from: 2, to: 4 },
			{ from: 2, to: 5 },
			{ from: 3, to: 3 },
		]);

		// create a network
		const container = document.getElementById(nodeId);
		const data = {
			nodes: nodes,
			edges: edges,
		};
		const options = {
			interaction: {
				hover: true,
			},
			manipulation: {
				enabled: true,
			},
			nodes: {
				shape: 'circle',
				color: '#FFFF00',
			},
		};
		network = new Network(container, data, options);

		network.on('selectNode', function (params) {
			console.log('selectNode Event:', params);
			selectedNodeId = params.nodes[0];
		});

		return network;
	}

	let network;
	onMount(async () => {
		network = initNetwork('network');
	});
</script>

<div id="network">Network</div>

<style>
	#network {
		height: 100%;

		background-color: var(--background);
		box-shadow: inset 0 0 10px 0px rgb(0 0 0 / 10%);
	}
</style>
