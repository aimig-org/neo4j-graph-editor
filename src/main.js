/**
 * This is the main javascript file that starts the application
 * and renders the App component.
 */
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {},
});

export default app;
