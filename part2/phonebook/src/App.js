import React, { useState, useEffect } from 'react';
import serverFunctions from './services/serverFunctions';
import './App.css';
import LabelInput from './components/LabelInput';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [numFilter, setNumFilter] = useState('');
  const [classAndMessage, setClassAndMessage] = useState({classN: "greenalert", message: "Welcome to Phonebook"});

  function hook() {
    serverFunctions
    .getAll()
    .then(data => setPersons(data));
  };

  useEffect(hook, []);

  function hasValue(obj, value) {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].name === value) {
        return obj[i];
      }
    }
    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const foundPerson = hasValue(persons, newName);
    if (foundPerson) {
      if (foundPerson.number === newNum) {
        setClassAndMessage({ ...classAndMessage, message: "An entry with the name and number already exists"});
        setTimeout(() => {
          setClassAndMessage({ ...classAndMessage, message: null });
        }, 5000)
      }
      else if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          name: foundPerson.name,
          number: newNum,
        }
        serverFunctions
        .update(foundPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(e => e.id !== foundPerson.id ? e : returnedPerson));
          setClassAndMessage({ ...classAndMessage, message: `Updated ${returnedPerson.name}'s details`})
          setTimeout(() => {
            setClassAndMessage({ ...classAndMessage, message: null });
          }, 5000)
        })
        .catch(error => {
          setClassAndMessage({ classN: "redalert",message: `Information of ${foundPerson.name} has already been removed from the server`});
          setTimeout(() => {
            setClassAndMessage({ classN: "greenalert", message: null});
          }, 5000);
        })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNum,
      }
      serverFunctions
      .create(newPerson)
      .then(data => {
        setPersons(persons.concat(data));
        setClassAndMessage({ ...classAndMessage, message: `Added ${data.name}`});
        setTimeout(() => {
          setClassAndMessage({ ...classAndMessage, message: null })
        }, 5000)
      });

      setNewName('');
      setNewNum('');
    }
  }

  function remove(id, name) {
    if (window.confirm(`Delete ${name}?`)) {
      serverFunctions
      .remove(id);
      console.log(id, name);
      setPersons(persons.filter(e => e.id !== id));
      setClassAndMessage({ ...classAndMessage, message: `Deleted ${name}`});
      setTimeout(() => {
        setClassAndMessage({ ...classAndMessage, message: null })
        console.log(classAndMessage);
      }, 5000)
    }   
  }

  const filterDisplay = numFilter === '' ? persons : persons.filter(e => e.name.toUpperCase().includes(numFilter.toUpperCase()));

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification classN={ classAndMessage.classN } message={ classAndMessage.message } />
      <LabelInput inputLabel="Filter shown with" type="text" value={ numFilter } onChange={ (e) => setNumFilter(e.target.value) } />
      <h2>Add a new</h2>
      <PersonForm onSubmit={ handleSubmit } newName={newName} newNum={newNum} setNewName={setNewName} setNewNum={setNewNum}/>
      <h2>Numbers</h2>
      <>
        { filterDisplay.map(e => <Persons key={ e.id } PersonName={ e.name } PersonNum={ e.number } remove={() => remove(e.id, e.name)} />) }
      </>
    </div>
  );
}

export default App;