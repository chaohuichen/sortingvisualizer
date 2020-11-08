import { Bar, BarChart, Cell } from 'recharts'
import { useEffect, useState } from 'react'
import { sleep } from './ult'
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
const comparing = 'red'
const original = '#8884d8'
const finish = 'green'
const swap = 'yellow'
const point = 'orange'
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
  }, [incomingData, startAnimation])

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startSorting = () => {
    if (sortingAlgo === 'bubbleSort') {
      bubbleSort()
    } else {
      insertionSort()
    }
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

    await sleep(10)
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
  const bubbleSort = async () => {
    for (let i = 0; i < data.length; ++i) {
      for (let j = i; j < data.length - 1; ++j) {
        // comparing the change in state
        await animationChange(data, comparing, j + 1, i)
        if (data[j + 1].value < data[i].value) {
          // swap in local
          const temp = data[j + 1]
          data[j + 1] = data[i]
          data[i] = temp
          // swap in state
          swapStateValue(i, j + 1)
          await animationChange(data, swap, j + 1, i)
        }
        // change back the original color
        await animationChange(data, original, j + 1, i)
      }
      // await animationChange(data, finish, i)
      // // comparing the change in local
      // data[i] = {
      //   value: data[i].value,
      //   color: finish
      // }
    }
    finalFinishAnimation()
    setData([...data])
    setIsActive(false)
  };

  const insertionSort = async () => {
    for (let i = 1; i < data.length; i++) {
      const temp = data[i]
      await animationChange(data, point, i)
      for (let j = i; j >= 0; j--) {
        await animationChange(data, comparing, j - 1, i)
        if (j > 0 && data[j - 1].value > temp.value) {
          data[j] = data[j - 1];
          // change in state
          setData((prevState) => {
            return prevState.map((element, index) => {
              if (index === j) {
                return { ...data[j - 1] }
              } else {
                return element
              }
            })
          })
          await animationChange(data, swap, j, j - 1)
        } else {
          data[j] = temp;
          await animationChange(data, swap, j, i)
          break;
        }
      }
    }
    finalFinishAnimation()
    setData([...data])
    setIsActive(false)
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
          <div>{seconds}s</div>
        </div>
        </div>
  )
}

export default SingleChart
