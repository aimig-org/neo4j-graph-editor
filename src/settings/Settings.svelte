<script>
	import ConnectionChecker from './ConnectionChecker.svelte';
	import { serverSettings, appSettings } from './settings';

	let dialog;

	export function show() {
		dialog.showModal();
	}

	function hide() {
		dialog.close();
	}
</script>

<dialog bind:this={dialog}>
	<button on:click={hide}>✕</button>
	<fieldset>
		<legend>
			<h3>Server Settings</h3>
		</legend>
		<form method="dialog">
			<label for="server">Server</label>
			<input
				id="server"
				name="server"
				type="text"
				bind:value={$serverSettings.server}
				placeholder="neo4j+s://id.databases.neo4j.io:7474"
			/>

			<label for="user">User</label>
			<input id="user" name="user" type="text" bind:value={$serverSettings.user} />

			<label for="password">Password</label>
			<input id="password" name="password" type="password" bind:value={$serverSettings.password} />
		</form>
		<div id="ConnectionChecker">
			<ConnectionChecker />
		</div>
	</fieldset>
	<fieldset>
		<legend>
			<h3>App Settings</h3>
		</legend>
		<form method="dialog">
			<label for="cypher">Initial cypher</label>
			<textarea id="cypher" name="cypher" bind:value={$appSettings.initialCypher} />
		</form>
	</fieldset>
</dialog>

<style>
	dialog {
		border: none;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}

	dialog button {
		position: absolute;
		right: 1em;
		top: 1em;
		font-size: 1em;
	}

	dialog fieldset {
		margin-top: 1em;
	}

	dialog h3 {
		padding: 0;
		margin: 0;
	}

	dialog form {
		display: flex;
		flex-direction: column;
	}
	dialog form label {
		margin-top: 0.25em;
		font-size: medium;
	}
	dialog form input {
		min-width: 30em;
		font-size: medium;
	}
	dialog form button {
		margin-top: 1em;
		align-self: flex-end;
	}

	dialog #ConnectionChecker {
		margin-top: 1em;
		max-width: 30em;
		font-size: small;
	}
</style>
