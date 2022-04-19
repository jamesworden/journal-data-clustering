const fs = require('fs');

const fileContents = fs.readFileSync('james-worden-journal.txt', 'utf-8');

// Ex: "12:07 AM Thursday, Sept 13th"
const titleRegex = new RegExp(
	/^(?:0?[1-9]|1[0-2]):(?:[0-5]\d)\s?(?:(?:A|P)\.?M\.?).*(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)?.*(?:January|February|March|April|May|June|July|August|September|Sept|October|November|December).*(:?1st|2nd|3rd|[0-9]th)?.*$/gm
);
const potentialEntriesFromFile = fileContents.split(titleRegex).slice(1);
const entriesFromFile = potentialEntriesFromFile.filter((entry) => !!entry);
const titlesFromFile = fileContents.match(titleRegex);

// Should be 474 titles and entries
console.log(entriesFromFile.length, titlesFromFile.length);

const entries = [];

for (let i = 0; i < entriesFromFile.length; i++) {
	entries.push({
		title: titlesFromFile[i],
		entry: entriesFromFile[i],
	});
}

// Should be 474 objects containing one title with its corresponding entry
console.log(entries.length);

console.log(titlesFromFile[400], entriesFromFile[400]);

// titlesFromFile.forEach((entry) => {
// 	console.log('START: ' + entry.length);
// });

// Level 1:
// Characters per entry
// Punctuation per entry
// Words per entry
// Average characters per word
// Number of words with 9 or more characters
// Mentions of computer keywords

// Level 2:
