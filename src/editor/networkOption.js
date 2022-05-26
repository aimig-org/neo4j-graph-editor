import { defaultNodeStyle, nodeGroupStyles } from '../settings/labels';

export const options = {
	interaction: {
		hover: true,
	},
	// manipulation: {
	// 	enabled: true,
	// },
	physics: {
		enabled: true,
		barnesHut: {
			centralGravity: 0,
			springLength: 200,
		},
		minVelocity: 0.75,
	},
	nodes: {
		shape: 'circle',
		borderWidth: 3,
		shadow: false,
		widthConstraint: {
			minimum: 100,
			maximum: 100,
		},
		// default node style (if no group is set)
		...defaultNodeStyle,
	},
	edges: {
		smooth: {
			type: 'continuous',
			//forceDirection: 'none',
			//roundness: 0.01,
		},
		arrows: {
			to: {
				enabled: true,
			},
		},
		shadow: false,
	},
	groups: nodeGroupStyles,

	// see https://visjs.github.io/vis-network/docs/network/layout.html
	layout: {
		hierarchical: {
			direction: 'LR', // Left to Right
			levelSeparation: 300,
			nodeSpacing: 100,
			treeSpacing: 400,
			sortMethod: 'directed',
		},
	},
};
