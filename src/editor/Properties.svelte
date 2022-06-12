<script>
	import { defaultNodeStyle, nodeGroupStyles } from '../settings/labels';

	export let selectedNode;
	export let selectedEdge;

	function getNeo4jValue(value) {
		console.log(`[Properties.getNeo4jValue] value:${JSON.stringify(value)}`, value);
		if (typeof value === 'object' && 'low' in value && 'high' in value) {
			return Number(value.low);
		} else {
			return value;
		}
	}

	function getLabelStyle(label) {
		const nodeStyle = nodeGroupStyles[label.toLowerCase()] || defaultNodeStyle;
		return [
			`background:white`,
			`color:${nodeStyle.font.color}`,
			`border: 2px solid ${nodeStyle.color.border}`,
		].join(';');
	}
</script>

<div id="panel">
	{#if selectedNode}
		<filedset>
			<legend>
				<h3>Node</h3>
			</legend>
			<form class="properties">
				{#each Object.keys(selectedNode).filter(k => !['label', 'labels', 'properties', 'font'].includes(k)) as key}
					<label for={key}>{key}</label>
					<input type="text" id={key} name={key} value={selectedNode[key]} readonly />
				{/each}
			</form>
		</filedset>

		{#if selectedNode.labels}
			<filedset>
				<legend>
					<h3>Lables</h3>
				</legend>
				<ul>
					{#each selectedNode.labels as label}
						<li class="label {label.toLowerCase()}" style={getLabelStyle(label)}>
							{label}
						</li>
					{/each}
				</ul>
			</filedset>
		{/if}

		{#if selectedNode.properties}
			<filedset>
				<legend>
					<h3>Properties</h3>
				</legend>
				<form class="properties">
					{#each Object.keys(selectedNode.properties).filter(k => !['id', 'name'].includes(k)) as key}
						<label for={key}>{key}</label>
						<input
							type="text"
							id={key}
							name={key}
							value={getNeo4jValue(selectedNode.properties[key])}
							readonly
						/>
					{/each}
				</form>
			</filedset>
		{/if}
	{:else if selectedEdge}
		<filedset>
			<legend>
				<h3>Edge</h3>
			</legend>
			<form class="properties">
				{#each Object.keys(selectedEdge) as key}
					<label for={key}>{key}</label>
					<input type="text" id={key} name={key} value={selectedEdge[key]} readonly />
				{/each}
			</form>
		</filedset>

		{#if selectedEdge.properties}
			<filedset>
				<legend>
					<h3>Properties</h3>
				</legend>
				<form class="properties">
					{#each Object.keys(selectedEdge.properties) as key}
						<label for={key}>{key}</label>
						<input
							type="text"
							id={key}
							name={key}
							value={getNeo4jValue(selectedEdge.properties[key])}
							readonly
						/>
					{/each}
				</form>
			</filedset>
		{/if}
	{:else}
		<i>select a node or edge to show properties</i>
	{/if}
</div>

<style>
	#panel {
		background: var(--background);
		padding: 0.5em;
	}
	#panel h3 {
		margin: 0;
		padding: 0;
	}
	#panel filedset {
		margin-bottom: 1em;
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

	.properties {
		display: grid;
		grid-template-columns: min-content 1fr;
		align-items: center;
	}
	.properties label {
		text-align: right;
		margin-top: 0.5em;
		margin-right: 0.5em;
	}
	.properties label {
		text-align: right;
		margin-top: 0.5em 0;
	}
</style>
