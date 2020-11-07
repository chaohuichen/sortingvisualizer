import SingleChart from './SingleChart';
import { useState } from 'react';
import product from 'immer'
import {generateRandomArray} from "./ult";

const Charts = () => {
  const [state, setstate] = useState({data:[[
    { value: 4000, color: '#8884d8' },
    { value: 3000, color: '#8884d8' },
    { value: 2000, color: '#8884d8' },
    { value: 2780, color: '#8884d8' },
  ]],
    startAnimation:false});
  // TODO but on add an array after finish sorting
  const handleAddArray=()=>{
    setstate(product(draftState=>{
      draftState.data.push([...draftState.data[0]])
    }))
  }
  const handleRandomArray=()=>{
    let randomArray  = generateRandomArray()
    setstate(product(draftState=>{
      draftState.data= draftState.data.map(e=>[...randomArray])
    }))
  }
  const handleStartAnimation=()=>{
    setstate(product(draftState=>{
      draftState.startAnimation=!state.startAnimation
    }))
  }

  return <div>
    {
      state.data.map((dataValues,index)=>{
        console.log(state.data)
        return <SingleChart  startAnimation={state.startAnimation} key={index} incomingData={dataValues} />
      })
    }
  <button onClick={handleStartAnimation}>Start</button>
    <button onClick={handleRandomArray}>Random Array</button>
    <button onClick={handleAddArray}>Add more array</button>
  </div>
};

export default Charts;
