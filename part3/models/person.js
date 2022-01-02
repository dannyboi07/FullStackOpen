// Code that handles connection and construction of schema
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;
console.log('Connecting to: ', url);

mongoose.connect(url)
	.then(response => {
		console.log('Connected to MongoDB Atlas');
	})
	.catch(error => {
		console.log('Error connecting to MongoDB Atlas: ', error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: [3, 'Person validation failed: Input name {VALUE} is shorter than the minimum allowed length (3)'],
		unique: true
	},
	number: {
		type: String,
		minlength: [8, 'Person validation failed: Input number {VALUE} is shorter than the minimum allowed length (8)']
	},
});

personSchema.set('toJSON', {
	transform:  (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);