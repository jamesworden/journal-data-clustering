const fs = require('fs');

const entries = require('./james-worden-journal-data.json');

const computerKeywords = [
	'computer',
	'laptop',
	'java',
	'javascript',
	'typescript',
	'nodejs',
	'program',
	'coding',
	'code',
	'solve',
	'html',
	'css',
	'js',
	'react',
	'backend',
	'frontend',
	'database',
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
	const numComputerKeywords = words.filter((word) =>
		computerKeywords.includes(word.toLocaleLowerCase())
	).length;

	let numExclaimationPoints = 0;
	for (let i = 0; i < content.length; i++) {
		const character = content[i];
		if (character == '!') {
			numExclaimationPoints++;
		}
	}

	const dateRegex =
		/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sept(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}.*\d{4}.*$/gim;
	const dateString = title.match(dateRegex);
	const date = dateString ? dateString[0] : null;

	const timeRegex = /(?:0?[1-9]|1[0-2]):(?:[0-5]\d)\s?(?:(?:A|P)\.?M\.?).*$/gim;
	const timeString = title.match(timeRegex);
	const timeWithExcessData = timeString ? timeString[0] : null;

	// Cut off string after the 'M' in AM or PM
	let mIndex = 0;
	for (let i = 0; i < timeWithExcessData.length; i++) {
		const char = timeWithExcessData[i];
		if (char.toLocaleLowerCase() == 'm') {
			mIndex = i;
			break;
		}
	}
	const time = timeWithExcessData.substring(0, mIndex + 1);

	entriesWithStats.push({
		date,
		time,
		numCharacters,
		numWords,
		avgCharsPerWord,
		numTenCharOrMoreWords,
		numComputerKeywords,
		numExclaimationPoints,
	});
});

const jsonString = JSON.stringify(entriesWithStats);

fs.writeFile('journal-statistics.json', jsonString, (err) => {
	if (err) throw err;
	console.log('Saved journal data.');
});
