const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {

	const password = process.argv[2];
	const url = `mongodb+srv://Daniel07:${password}@fullstackopen1.aitqy.mongodb.net/FSOPhonebook?retryWrites=true&w=majority`;
	mongoose.connect(url)
		.catch(error => {
			console.log('The database server rejected the connection, check password');
			process.exit(1);
		});
	Person.find({}).then(result => {
		console.log('Phonebook:');
		result.forEach(person => {
			console.log(person.name, person.number);
		});
		mongoose.connection.close();
	});
}
else if ((process.argv.length > 3) && (process.argv.length < 5)) {
	console.log(process.argv.length);
	console.log('You need to enter, your mongoDB password, and/or the person\'s name and number');
	process.exit(1);
}
else {
	const password = process.argv[2];
	const url = `mongodb+srv://Daniel07:${password}@fullstackopen1.aitqy.mongodb.net/FSOPhonebook?retryWrites=true&w=majority`;
	const name = process.argv[3];
	const number = process.argv[4];

	mongoose.connect(url);

	const newPerson = new Person({
		name: name,
		number: number,
	});

	newPerson.save().then(result => {
		console.log('Saved');
		mongoose.connection.close();
	});
}