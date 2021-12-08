import React, { useState } from 'react';
import './App.css';

const StatisticLine = ({ text, value }) => {
  return(
    <tr>
      <td>{ text }</td>
      <td>{ value }</td>
    </tr>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  let totalStat = good + neutral + bad;
  
  const avg = () => (good - bad) / totalStat;
  const positive = () => good / totalStat * 100 + ' %';

  if ( totalStat === 0 ) {
    return (
      <p>No feedback given</p>
    );
  }
  return (
    <table>
        <tbody>
          <StatisticLine text="Good:" value={ good } />
          <StatisticLine text="Neutral:" value={ neutral } />
          <StatisticLine text="Bad:" value={ bad } />
          <StatisticLine text="All:" value={ totalStat } />
          <StatisticLine text="Average:" value={ avg() } />
          <StatisticLine text="Positive" value={ positive() } />
        </tbody>
      </table>
  );
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={ onClick }>{ text }</button>
  );
}

const SectionHeader = ({ text }) => {
  return (
    <h1>{ text }</h1>
  );
}

function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="App">
      <SectionHeader text="Give Feedback"/>
      <Button text="Good" onClick={ () => setGood(good + 1) } />
      <Button text="Neutral" onClick={ () => setNeutral(neutral + 1) }/>
      <Button text="Bad" onClick={ () => setBad(bad + 1) } />
      
      <SectionHeader text="Statistics"/>
      <Statistics good={ good } neutral={ neutral } bad={ bad } />
    </div>
  );
}

export default App;
