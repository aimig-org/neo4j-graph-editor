<script>
</script>

<div id="loading_indicator">
	<div class="lds-dual-ring" />
</div>

<style>
	#loading_indicator {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.lds-dual-ring {
		display: inline-block;
		width: 100%;
		height: 100%;
		max-width: 2rem;
		max-height: 2rem;
	}
	.lds-dual-ring:after {
		content: ' ';
		display: block;
		width: 100%;
		height: 100%;
		max-width: 1.75rem;
		max-height: 1.75rem;
		margin: 0px;
		border-radius: 50%;
		border: 5px solid black;
		border-color: var(--text-primary) transparent var(--text-primary) transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
