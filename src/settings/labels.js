/* see https://visjs.github.io/vis-network/docs/network/nodes.html for availibe options. */
export const nodeGroupStyles = {
	problem: {
		font: {
			color: 'white',
		},
		color: {
			border: 'red',
			background: 'orangered',
			highlight: { background: 'orangered', border: 'darkred' },
			hover: { background: 'orangered', border: 'darkred' },
		},
	},
	observation: {
		font: {
			color: 'white',
		},
		color: {
			background: 'orange',
			border: 'orangered',
			highlight: { background: 'orange', border: 'red' },
			hover: { background: 'orange', border: 'red' },
		},
	},
	obs_instance: {
		font: {
			color: 'white',
		},
		color: {
			background: 'darkturquoise',
			border: 'teal',
			highlight: { background: 'darkturquoise', border: 'blue' },
			hover: { background: 'darkturquoise', border: 'blue' },
		},
	},
};

export const defaultNodeStyle = {
	font: {
		color: 'black',
	},
	color: {
		background: 'lightgray',
		border: 'black',
		highlight: { background: 'darkgray', border: 'black' },
		hover: { background: 'darkgray', border: 'black' },
	},
};
