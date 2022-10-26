<script>
	import { createEventDispatcher } from 'svelte';

	import { editorState } from './editorState';

	const dispatch = createEventDispatcher();

	function onFitNetwork() {
		dispatch('fitNetwork');
	}
</script>

<nav>
	<ul id="graph_view">
		<li>
			<div class="checkbox">
				<input
					type="checkbox"
					id="hierarchical"
					name="hierarchical"
					bind:checked={$editorState.layoutHierarchical}
				/>
				<label for="hierarchical">Hierarchical layout</label>
			</div>
		</li>
		<li>
			<button id="fit-network" on:click={onFitNetwork} title="show the whole network">fit</button>
		</li>
	</ul>
</nav>

<style>
	ul#graph_view {
		list-style: none;
		margin: 0rem;
		padding: 0.25rem;
		display: flex;
	}
	ul#graph_view li {
		margin: 0;
		padding: 0;
	}

	button,
	.checkbox {
		margin: 0.25rem;
		padding: 0.25rem;
		border-radius: 0.5rem;
		border: 1px solid gray;
		box-shadow: 1px 1px 0px 1px #eee;
		background: #eee;
	}
</style>
