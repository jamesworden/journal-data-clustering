const fs = require('fs');
const chrono = require('chrono-node');

const entries = require('./entries.json');

const softwareKeywords = [
	'java',
	'javascript',
	'typescript',
	'nodejs',
	'program',
	'coding',
	'code',
	'html',
	'css',
	'js',
	'react',
	'backend',
	'frontend',
	'database',
];

const hardwareKeywords = [
	'computer',
	'laptop',
	'battery',
	'mouse',
	'keyboard',
	'monitor',
	'monitors',
	'screen',
	'screens',
	'desk',
];

const jobKeywords = ['work', 'pay', 'hours', 'money', 'job', 'meeting', 'email'];

const pronounKeywords = [
	'i',
	'we',
	'you',
	'he',
	'she',
	'it',
	'they',
	'me',
	'us',
	'her',
	'him',
	'them',
	'mine',
	'ours',
	'yours',
	'hers',
	'his',
	'theirs',
	'my',
	'our',
	'your',
	'their',
];

const entriesWithStats = [];

entries.forEach(({ content, title }) => {
	const numCharacters = content.length;
	const words = content.split(' ');
	const numWords = words.length;
	const wordLengths = words.map((word) => word.length);
	const sumOfWordLengths = wordLengths.reduce((partialSum, a) => partialSum + a, 0);
	const avgWordLengthNotRounded = sumOfWordLengths / numWords;
	const avgCharsPerWord = Number(avgWordLengthNotRounded.toFixed(2));
	const numTenCharOrMoreWords = words.filter((word) => word.length >= 10).length;

	const numSoftwareKeywords = words.filter((word) =>
		softwareKeywords.includes(word.toLocaleLowerCase())
	).length;
	const numHardwareKeywords = words.filter((word) =>
		hardwareKeywords.includes(word.toLocaleLowerCase())
	).length;
	const numJobKeywords = words.filter((word) =>
		jobKeywords.includes(word.toLocaleLowerCase())
	).length;
	const numPronouns = words.filter((word) =>
		pronounKeywords.includes(word.toLocaleLowerCase())
	).length;

	let numExclaimationPoints = 0;
	for (let i = 0; i < content.length; i++) {
		const character = content[i];
		if (character == '!') {
			numExclaimationPoints++;
		}
	}

	// Use chrono library to extract date and time from string
	const dateTime = chrono.parseDate(title).toISOString();

	entriesWithStats.push({
		dateTime,
		numCharacters,
		numWords,
		avgCharsPerWord,
		numTenCharOrMoreWords,
		numSoftwareKeywords,
		numHardwareKeywords,
		numJobKeywords,
		numExclaimationPoints,
		numPronouns,
	});
});

const jsonString = JSON.stringify(entriesWithStats);

fs.writeFile('stats.json', jsonString, (err) => {
	if (err) throw err;
	console.log('Saved journal data.');
});
