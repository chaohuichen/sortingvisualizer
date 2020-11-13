import SingleChart from './SingleChart';
import { useState } from 'react';
import product from 'immer'
import { generateRandomArray } from './ult';
import { Button, ButtonGroup, Slider, Typography } from '@material-ui/core'
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
  const [arraySide, setArraySide] = useState(4)
  // TODO but on add an array after finish sorting
  const handleAddArray = () => {
    setstate(product(draftState => {
      draftState.data.push([...draftState.data[0]])
    }))
  }
  const handleRandomArray = () => {
    const randomArray = generateRandomArray(arraySide)
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
  const changeArraySlide = (newValue) => {
    setArraySide(newValue)
    const randomArray = generateRandomArray(arraySide)
    setstate(product(draftState => {
      draftState.data = draftState.data.map(e => [...randomArray])
    }))
  }

  return <div >
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <ButtonGroup size="large" color="primary" aria-label="outlined primary button group" style={{ alignSelf: 'center' }}>
      <Button disabled={state.startAnimation} onClick={handleStartAnimation} >Start</Button>
      <Button disabled={state.startAnimation} onClick={handleRandomArray} >Random Array</Button>
      <Button disabled={state.startAnimation} onClick={handleAddArray}>Add more array</Button>
      <Button onClick={handleReset}>Reset</Button>
    </ButtonGroup>
      <Typography id="non-linear-slider" style={{ marginTop: '10px' }} gutterBottom>
        Array Size
      </Typography>
    <Slider max={100} min={4}
            disabled={state.startAnimation}
            value={arraySide}
            onChange={(event, newValue) => { changeArraySlide(newValue) }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            className='slider'
    />
    </div>
    <div className='products-center'>
    {
      state.data.map((dataValues, index) => {
        return <SingleChart startAnimation={state.startAnimation} key={index} incomingData={dataValues} />
      })
    }
    </div>
  </div>
};

export default Charts;
