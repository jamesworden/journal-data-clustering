const ObjectsToCsv = require('objects-to-csv');

const entries = require('./entries.json');

(async () => {
	const csv = new ObjectsToCsv(entries);
	await csv.toDisk('./journal-entries.csv');
})();
