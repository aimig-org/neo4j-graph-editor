export function getColorByLabels(labels = []) {
	if (labels.includes('Problem')) {
		return {
			color: 'white',
			background: 'orangered',
			border: 'red',
			highlight: { background: 'orangered', border: 'darkred' },
			hover: { background: 'orangered', border: 'darkred' },
		};
	} else if (labels.includes('Observation')) {
		return {
			color: 'white',
			background: 'orange',
			border: 'orangered',
			highlight: { background: 'orange', border: 'red' },
			hover: { background: 'orange', border: 'red' },
		};
	} else if (labels.includes('Obs_Instance')) {
		return {
			color: 'white',
			background: 'darkturquoise',
			border: 'teal',
			highlight: { background: 'darkturquoise', border: 'blue' },
			hover: { background: 'darkturquoise', border: 'blue' },
		};
	} else {
		return {
			color: 'black',
			background: 'lightgray',
			border: 'black',
			highlight: { background: 'darkgray', border: 'black' },
			hover: { background: 'darkgray', border: 'black' },
		};
	}
}
