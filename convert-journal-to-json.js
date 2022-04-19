const fs = require('fs');

const INPUT_FILE_NAME = 'james-worden-journal.txt';
const OUTPUT_FILE_NAME = 'james-worden-journal-data.json';

// Read text file as a string
const fileContents = fs.readFileSync(INPUT_FILE_NAME, 'utf-8');

// Example: "12:07 AM Thursday, Sept 13th"
const titleRegex = new RegExp(
	/^(?:0?[1-9]|1[0-2]):(?:[0-5]\d)\s?(?:(?:A|P)\.?M\.?).*(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)?.*(?:January|February|March|April|May|June|July|August|September|Sept|October|November|December).*(:?1st|2nd|3rd|[0-9]th)?.*$/gm
);

// These are potential entries because splitting the contents by the
// title regex often produces entries with no length
const potentialEntriesFromFile = fileContents.split(titleRegex).slice(1);
const entryContentsFromFile = potentialEntriesFromFile.filter((entry) => !!entry);
const titlesFromFile = fileContents.match(titleRegex);

// Match titles and entry contents together
const entries = [];

for (let i = 0; i < entryContentsFromFile.length; i++) {
	entries.push({
		title: titlesFromFile[i],
		entry: entryContentsFromFile[i],
	});
}

const jsonStringWithTabsAndEnters = JSON.stringify(entries);
const jsonString = jsonStringWithTabsAndEnters.replace(/\\n|\\r/g, '');

fs.writeFile(OUTPUT_FILE_NAME, jsonString, (err) => {
	if (err) throw err;
	console.log('Saved journal data.');
});
