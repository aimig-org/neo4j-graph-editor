import { defaultNodeStyle, nodeGroupStyles } from '../settings/labels';

const defaultSettings = {
	isHierarchical: false,
};

/**
 * Set vis-network options.
 * @see https://visjs.github.io/vis-network/docs/network/#options
 *
 * @param {*} settings
 * @returns {*} vis-network options
 */
export function getOptions(settings = defaultSettings) {
	//console.debug(`[getOptions] settings:${JSON.stringify(settings)}`);

	const options = {
		// see https://visjs.github.io/vis-network/docs/network/interaction.html
		interaction: {
			// 	When true, the nodes use their hover colors when the mouse moves over them. [false]
			hover: true,

			// When true, on hovering over a node, it's connecting edges are highlighted. [true]
			hoverConnectedEdges: false,

			// When true, the nodes and edges can be selected by the user. [true]
			selectable: true,

			// When true, on selecting a node, its connecting edges are highlighted. [true]
			selectConnectedEdges: false,
		},

		// https://visjs.github.io/vis-network/docs/network/manipulation.html
		manipulation: {
			// Toggle the manipulation system on or off.
			// Even when false, the manipulation API through the methods will still work.
			// This property is optional.
			// If you define any of the options below and enabled is undefined, this will be set to true. [false]
			enabled: false,
		},

		// https://visjs.github.io/vis-network/docs/network/physics.html
		physics: {
			enabled: true,
			barnesHut: {
				centralGravity: 0,
				springLength: 200,
			},
			minVelocity: 0.75,
		},

		// https://visjs.github.io/vis-network/docs/network/nodes.html
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

		// https://visjs.github.io/vis-network/docs/network/edges.html
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

		// https://visjs.github.io/vis-network/docs/network/groups.html
		groups: nodeGroupStyles,
	};

	// switch between auto- and hierachical layout
	if (settings && settings.isHierarchical) {
		// see https://visjs.github.io/vis-network/docs/network/layout.html
		options.layout = {
			hierarchical: {
				direction: 'LR', // Left to Right
				levelSeparation: 300,
				nodeSpacing: 100,
				treeSpacing: 400,
				sortMethod: 'directed',
			},
		};
	} else {
		options.layout = {
			hierarchical: false,
		};
	}

	//console.log(`[getOptions] options:${JSON.stringify(options)}`);
	return options;
}
