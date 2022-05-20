<script>
	export let selectedNodeId;
</script>


<div id="panel">
	<h2>Properties</h2>
	id: {selectedNodeId}
</div>


<style>
	#panel {
		height: 100%;
		background: var(--background);
	}
	#panel h2 {
		margin: 0;
		padding: 0;
	}
</style>