/* see https://visjs.github.io/vis-network/docs/network/nodes.html for availibe options. */
export const nodeGroupStyles = {
	problem: {
		font: {
			color: 'black',
		},
		color: {
			border: 'red',
			background: 'white',
			highlight: { background: 'white', border: 'red' },
			hover: { background: 'white', border: 'red' },
		},
	},
	observation: {
		font: {
			color: 'black',
		},
		color: {
			border: 'orange',
			background: 'white',
			highlight: { background: 'white', border: 'orange' },
			hover: { background: 'white', border: 'orange' },
		},
	},
	obs_instance: {
		font: {
			color: 'black',
		},
		color: {
			border: 'blue',
			background: 'white',
			highlight: { background: 'white', border: 'blue' },
			hover: { background: 'white', border: 'blue' },
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
