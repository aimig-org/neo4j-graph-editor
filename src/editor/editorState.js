import { writable } from 'svelte/store';

// set hierarchical network layout
const layoutHierarchical = false;

export const editorState = writable({
	layoutHierarchical,
});
