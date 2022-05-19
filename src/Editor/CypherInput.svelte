<script>
	export let cypher;
</script>

<section id="cypher">
    <span>neo4j$</span>
    <input type="text" bind:value="{cypher}">
    <button id="sendCypherBtn" title="Execute cypher" disabled>▸</button>
</section>

<style>
    #cypher {
		display: flex;
    	justify-content: space-between;
		background: var(--background);
		padding: 0.5em;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}
	#cypher span {
		color: var(--text-secondary);
		border: none;
		font-family:'Courier New', Courier, monospace;
		font-size: 1em;
		line-height: 1em;
		padding: 0.25em 0;
	}
	#cypher input[type="text"] {
		flex-grow: 1;
        margin: 0 0.5em;
		border: 1px solid transparent;
		color: var(--text-primary);
		font-family: 'Courier New', Courier, monospace;
		font-size: 1em;
	}
    #cypher input[type="text"]:focus {
		outline: none !important;
        border: 1px solid var(--border);
        border-radius: 3px;
	}

	#sendCypherBtn {
		font-size: 2em;
		line-height: 1em;
		margin-top: -0.25em;
		padding: 0 0.25em;
		color: var(--text-action);
	}
</style>