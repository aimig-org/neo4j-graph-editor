<script>
	import { editorState } from './editorState';

	export let disabled = false;
</script>

<nav>
	<ul id="graph_view">
		<li>
			<input
				type="checkbox"
				id="hierarchical"
				name="hierarchical"
				{disabled}
				bind:checked={$editorState.layoutHierarchical}
			/>
			<label for="hierarchical">Hierarchical layout</label>
		</li>
	</ul>
</nav>

<style>
	ul#graph_view {
		list-style: none;
		margin: 0rem;
		padding: 0.25rem;
	}
	ul#graph_view li {
		margin: 0;
		padding: 0;
	}
</style>
