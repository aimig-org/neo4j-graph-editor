<script>
	import Settings from './settings/Settings.svelte';

	export let settingsDialog;
</script>

<span id="header">
	<h1>Neo4j Graph Editor test 13-07-2022 </h1>
	<nav>
		<button id="settingsBtn" title="Show server settings" on:click={settingsDialog.show}>⚙ settings.</button>
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

	nav {
		display: flex;
	}

	#settingsBtn {
		font-size: 1.75em;
	}
</style>
