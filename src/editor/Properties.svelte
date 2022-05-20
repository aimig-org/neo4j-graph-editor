<script>
	export let selectedNodeId;
</script>

<div id="panel">
	<filedset>
		<legend>
			<h2>Lables</h2>
		</legend>
		<ul>
			<li class="label patient">Patient</li>
			<li class="label problem">Problem</li>
		</ul>
	</filedset>

	<filedset>
		<legend>
			<h2>Properties</h2>
		</legend>
		<form id="properties">
			<label for="selectedNodeId">id</label>
			<input type="text" id="selectedNodeId" name="selectedNodeId" value={selectedNodeId} />

			<label for="name">name</label>
			<input type="text" id="name" name="name" value={selectedNodeId} />
		</form>
	</filedset>
</div>

<style>
	#panel {
		height: 100%;
		background: var(--background);
		padding: 0.5em;
	}
	#panel h2 {
		margin: 0;
		padding: 0;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;

		display: flex;
	}
	ul li.label {
		margin: 0.5em;
		padding: 0.25em;

		background-color: lightgray;
		border-radius: 0.25em;
	}
	ul li.label.patient {
		background-color: lightskyblue;
		color: white;
	}
	ul li.label.problem {
		background-color: red;
		color: white;
	}

	#properties {
		display: grid;
		grid-template-columns: min-content 1fr;
		align-items: center;
	}
	#properties label {
		text-align: right;
		margin-top: 0.5em;
		margin-right: 0.5em;
	}
	#properties label {
		text-align: right;
		margin-top: 0.5em 0;
	}
</style>
