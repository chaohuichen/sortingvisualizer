import { Bar, BarChart, Cell } from 'recharts'
import { useEffect, useState } from 'react'
import { sleep } from './ult'
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { InsertionSort, MergeSort } from '../SortingAlogs';
import Timer from './Timer';
const finish = 'green'

function SingleChart ({ incomingData, startAnimation }) {
  const [data, setData] = useState([])
  const [sortingAlgo, setSortingAlgo] = useState('bubbleSort')
  useEffect(() => {
    setData([...incomingData])
    if (startAnimation) {
      setSeconds(0)
      setIsActive(true)
      startSorting()
    }
    return () => {
      setSeconds(0)
      setIsActive(false)
    }
  }, [incomingData, startAnimation])

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startSorting = () => {
    if (sortingAlgo === 'bubbleSort') {
      console.log('starttttttttttt')
      MergeSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData)
      // BubbleSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData)
    } else {
      InsertionSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData)
    }
  }

  const finalSetData = (data) => {
    setData([...data])
    setIsActive(false)
  }
  const animationChange = async (data, color, x, y) => {
    setData(() => {
      return data.map((element, index) => {
        if (index === x || index === y) {
          return {
            value: element.value,
            color: color
          }
        } else {
          return element
        }
      })
    })
    await sleep(5000)
  };
  const swapStateValue = (x, y) => {
    setData((prevState) => {
      return prevState.map((element, index) => {
        if (index === x) {
          return { ...data[y] }
        } else if (index === y) {
          return { ...data[x] }
        } else {
          return element
        }
      })
    })
  }

  const finalFinishAnimation = async () => {
    for (let i = 0; i < data.length; ++i) {
      data[i] = {
        value: data[i].value,
        color: finish
      }
      await animationChange(data, finish, i)
      await sleep(0)
    }
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <BarChart width={250} height={200} data={data} style={{ }}>
        <Bar dataKey='value'>
          {data.map((d, index) => {
            return <Cell key={index} fill={d.color} />
          })}
        </Bar>
      </BarChart>
        <div>
        <FormControl style={{ }}>
          <InputLabel >Sorting Algo</InputLabel>
          <Select className='menuitem'
              onChange={(e) => setSortingAlgo(e.target.value)}
              value={sortingAlgo}
          >
            <MenuItem value={'bubbleSort'}>Bubble Sort</MenuItem>
            <MenuItem value={'insertionSort'}>Insertion Sort</MenuItem>
          </Select>
        </FormControl>
          <Timer isActive={isActive} setIsActive={setIsActive} seconds={seconds} setSeconds={setSeconds}/>
        </div>
        </div>
  )
}

export default SingleChart
