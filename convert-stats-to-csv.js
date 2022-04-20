const ObjectsToCsv = require('objects-to-csv');

const stats = require('./stats.json');

(async () => {
	const csv = new ObjectsToCsv(stats);
	await csv.toDisk('./journal-stats.csv');
})();
