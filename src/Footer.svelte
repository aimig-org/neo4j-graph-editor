<span id="footer">
	<ul>
		<li>
			made with <a href="http://www.visjs.org">vis.js</a>, <a href="https://svelte.dev/">svelte</a>
			and ❤️ by <a href="https://fullstax.de/">fullstax</a>
		</li>
		<li><a href="https://github.com/mojoaxel/neo4j-graph-editor">AGPL-3.0</a> licensed</li>
		<li><a href="https://fullstax.de/impressum.html">imprint</a></li>
	</ul>
</span>

<style>
	#footer {
		display: flex;
		height: 100%;
		width: 100%;

		background-color: var(--background);
		border-top: 1px solid var(--border);
	}

	ul {
		list-style: none;
		margin: auto;
		padding: 0;

		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 100%;
	}

	ul li {
		margin: 0 1em;
		padding: 0;
	}
</style>
