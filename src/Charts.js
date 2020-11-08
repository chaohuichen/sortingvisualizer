import SingleChart from './SingleChart';
import { useState } from 'react';
import product from 'immer'
import { generateRandomArray } from './ult';
import { Button, ButtonGroup } from '@material-ui/core'
const Charts = () => {
  const [state, setstate] = useState({
    data: [[
      { value: 4000, color: '#8884d8' },
      { value: 3000, color: '#8884d8' },
      { value: 2000, color: '#8884d8' },
      { value: 2780, color: '#8884d8' }
    ]],
    startAnimation: false
  });
  // TODO but on add an array after finish sorting
  const handleAddArray = () => {
    setstate(product(draftState => {
      draftState.data.push([...draftState.data[0]])
    }))
  }
  const handleRandomArray = () => {
    const randomArray = generateRandomArray()
    setstate(product(draftState => {
      draftState.data = draftState.data.map(e => [...randomArray])
    }))
  }
  const handleStartAnimation = () => {
    setstate(product(draftState => {
      draftState.startAnimation = !state.startAnimation
    }))
  }

  const handleReset = () => {
    setstate(product(draftState => {
      draftState.data = [[
        { value: 4000, color: '#8884d8' },
        { value: 3000, color: '#8884d8' },
        { value: 2000, color: '#8884d8' },
        { value: 2780, color: '#8884d8' }
      ]]
      draftState.startAnimation = false
    }))
  }
  return <div >
    <ButtonGroup size="large" color="primary" aria-label="outlined primary button group">
      <Button onClick={handleStartAnimation} >Start</Button>
      <Button onClick={handleRandomArray} >Random Array</Button>
      <Button onClick={handleAddArray}>Add more array</Button>
      <Button onClick={handleReset}>Reset</Button>
    </ButtonGroup>
    {
      state.data.map((dataValues, index) => {
        return <SingleChart startAnimation={state.startAnimation} key={index} incomingData={dataValues} />
      })
    }
  </div>
};

export default Charts;
