<script>
import CypherInput from "./CypherInput.svelte";
import Graph from './Graph.svelte';
import Properties from "./Properties.svelte";

let cypher = 'MATCH(n) RETURN(n)';
</script>

<div id="editor">
	<header>
		<CypherInput cypher={cypher} />
	</header>

	<div class="flex-container">
		<section id="graph">
			<Graph />
		</section>

		<aside id="properties">
			<Properties />
		</aside>
	</div>
</div>


<style>
	#editor {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-grow: 0;
	}

	#editor .flex-container {
		display: flex;
		flex-direction: column;
    	flex-grow: 1;
		height: calc(100% - 3em);
	}

	#editor .flex-container #graph {
		flex-grow: 1;
	}

	#editor .flex-container #properties {
		flex: 0 1 300px;
	}

	@media screen and (min-width: 640px) {
		#editor .flex-container {
			flex-direction: row;
		}
	}
</style>