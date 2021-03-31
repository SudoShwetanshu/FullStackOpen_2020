
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

 const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({onClick,text}) => {
  return ( 
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({feedback, good, neutral, bad, total, average, positive}) => {
  if (!feedback) {
    return <p>No feedback has been given</p>
  }
  
  return ( 
  <>
    <div>
      <Header text='statistics' />
    </div>
      <table>
        <tbody>
          <Statistic text='Good' value={good}/>
          <Statistic text='Neutral' value={neutral}/>
          <Statistic text='Bad' value={bad}/>
          <Statistic text='Total' value={total}/>
          <Statistic text='Average' value={average} />
          <Statistic text='Positive' value={positive + "%"} />
        </tbody>
      </table>
  </> )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [feedback, setFeedback] = useState(false);
  let total = good+bad+neutral;

  const handleButtonClick = (type) => {
    setFeedback(true);

    switch (type) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };
  const getAvg = (Arr, total) => {
    const x = Arr.reduce((acc, item) => {
      return acc + item.number * item.weight;
    }, 0);

    let result = x / total

    if (Number.isNaN(result)) return 0;

    return result;
  }
  const average = getAvg(
    [
      { number: good, weight: 1 },
      { number: neutral, weight: 0 },
      { number: bad, weight: -1 },
    ],
    total
  )
  const getPositive = (good, total) => {
    const r = (good / total) * 100
    if (Number.isNaN(r)) return 0;
    return r;
  }
  const positive = getPositive(good, total)
  

  return ( <>
    <Header text="give feedback"/>
    <Button onClick = {() => handleButtonClick("good")} text="good" />
    <Button onClick = {() => handleButtonClick("neutral")} text="neutral" />
    <Button onClick = {() => handleButtonClick("bad")} text="bad" />
    <Statistics feedback={feedback} good={good} bad={bad} total={total} neutral={neutral} positive={positive} average={average}/>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)



