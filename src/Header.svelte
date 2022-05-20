<script>
	import Settings from './settings/Settings.svelte';

	let settingsDialog;
</script>

<span id="header">
	<h1>Neo4j Graph Editor</h1>
	<nav>
		<button id="settingsBtn" title="Show server settings" on:click={settingsDialog.show}>⚙</button>
		<Settings bind:this={settingsDialog} />
	</nav>
</span>

<style>
	#header {
		display: flex;
		justify-content: space-between;
		padding: 0 0.25em;

		height: 100%;
		width: 100%;

		font-size: 1.5em;
	}

	h1 {
		padding: 0;
		margin: auto 0;
		font-size: inherit;
	}

	#settingsBtn {
		font-size: 1.75em;
	}
</style>
