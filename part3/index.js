require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// const requestLogger = (req, res, next) => {
//     console.log('Method: ',req.method);
//     console.log('Path: ',req.path);
//     console.log('Body: ',req.body);
//     console.log('---');
//     next();
// }

app.use(express.json());
app.use(cors());
app.use(express.static('build'));
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :req[content-length] :status - :response-time ms :body'));

const errorHandler = (error, req, res, next) => {
	console.log('Error: ', error.message);

	if (error.name === 'CastError') {
		return res.status(400).json({ error: 'Malformatted ID' });
	} else if (error.name === 'ValidationError') {
		if (error.message[0] === 'P') {
			return res.status(400).json({ responseError: error.message });
		}
		return res.status(400).json({ error: 'Name already exists, it must be unique' });
	}

	next(error);
};

app.use(errorHandler);

const Person = require('./models/person');

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons);
	});
});

app.get('/info', async (req, res) => {
	const numOfContacts = await Person.estimatedDocumentCount();
	const resp = `<div><p>Phonebook has info for ${numOfContacts} people</p><p>${Date()}</p></div>`;
	res.send(resp);
});

app.get('/api/persons/:id', (req, res, next) => {

	Person.findById(req.params.id)
		.then(foundPerson => {
			res.json(foundPerson);
		})
		.catch(error => errorHandler(error, req, res, next));

});

app.post('/api/persons', (req, res, next) => {
	const body = req.body;

	if ((!body.name) || (!body.number)) {
		return res.status(400).send('<p>Missing name or number</p>');
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});
	person.save().then(savedPerson => {
		res.json(savedPerson);
	})
		.catch(error => errorHandler(error, req, res, next));

});

app.put('/api/persons/:id', (req, res) => {

	Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(updatedPerson => {
			res.status(200).json(updatedPerson);
		});

});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(response => {
			res.status(204).end();
		})
		.catch(error => errorHandler(error, req, res, next));

});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
