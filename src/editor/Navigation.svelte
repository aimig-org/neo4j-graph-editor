<script>
	import networkStore from '../store';

	export let selectedNode;

	function createNewNode() {
		//create new node and connect it to the selected node.
		const newId = networkStore.addNode(undefined, '', [], {});
		networkStore.addEdge(undefined, 'new edge', newId, selectedNode.id, undefined);
	}

	function deleteSelectedNode() {
		//TODO delete selected node from network.
	}
</script>

<nav>
	<ul>
		<li><button on:click={createNewNode}>New Node</button></li>
		<li><button on:click={deleteSelectedNode}>Delete Selected Node</button></li>
	</ul>
</nav>

<style>
</style>
