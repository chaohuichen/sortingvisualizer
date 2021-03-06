import { Bar, BarChart, Cell } from 'recharts'
import { useEffect, useState } from 'react'
import { sleep } from './ult'
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import {
  InsertionSort,
  MergeSort,
  BubbleSort,
  QuickSort,
  SelectionSort,
  ShellSort,
  ShellSortKnuth,
  PancakeSort,
  HeapSort,
  RadixSort
} from '../SortingAlogs';
import { finish } from '../SortingAlogs/ConstantsColor';
import Timer from './Timer';
import AlgoComplexityInfo from './AlgoComplexityInfo'

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
    switch (sortingAlgo) {
      case 'selectionSort':
        SelectionSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData)
        break;
      case 'quickSort':
        QuickSort(data, 0, data.length - 1, animationChange, swapStateValue, finalFinishAnimation, finalSetData)
        break;
      case 'bubbleSort':
        BubbleSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData)
        break;
      case 'insertionSort':
        InsertionSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData)
        break;
      case 'mergeSort':
        MergeSort(data, animationChange, finalFinishAnimation, finalSetData, changeSingleValue)
        break;
      case 'shellSort':
        ShellSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData, changeSingleValue)
        break;
      case 'shellSortKnuth':
        ShellSortKnuth(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData, changeSingleValue)
        break;
      case 'pancakeSort':
        PancakeSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData);
        break;
      case 'heapSort':
        HeapSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData)
        break;
      case 'radixSort':
        RadixSort(data, animationChange, swapStateValue, finalFinishAnimation, finalSetData, changeSingleValue)
        break;
      default:
    }
  }

  const changeSingleValue = (k, value) => {
    setData((prevState) => {
      return prevState.map((element, index) => {
        if (index === k) {
          return { value: value, color: element.color }
        } else {
          return element
        }
      })
    })
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

  const finalFinishAnimation = async () => {
    setData((prevState) => {
      return prevState.map((element) => {
        return {
          value: element.value,
          color: finish
        }
      })
    })
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
        <div>
          <BarChart width={350} height={250} data={data}>
            <Bar dataKey='value'>
             {data.map((d, index) => {
               return <Cell key={index} fill={d.color} />
             })}
            </Bar>
            </BarChart>
          <AlgoComplexityInfo sortingAlgo={sortingAlgo}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '5px' }}>
        <FormControl style={{ }}>
          <InputLabel >Sorting Algo</InputLabel>
          <Select className='menuitem'
              onChange={(e) => setSortingAlgo(e.target.value)}
              value={sortingAlgo}
          >
            <MenuItem value={'bubbleSort'}>Bubble Sort</MenuItem>
            <MenuItem value={'shellSort'}>Shell Sort</MenuItem>
            <MenuItem value={'shellSortKnuth'}>Shell Sort Knuth</MenuItem>
            <MenuItem value={'insertionSort'}>Insertion Sort</MenuItem>
            <MenuItem value={'selectionSort'}>Selection Sort</MenuItem>
            <MenuItem value={'mergeSort'}>Merge Sort</MenuItem>
            <MenuItem value={'quickSort'}>Quick Sort</MenuItem>
            <MenuItem value={'pancakeSort'}>Pancake Sort</MenuItem>
            <MenuItem value={'heapSort'}>Heap Sort</MenuItem>
            <MenuItem value={'radixSort'}>Radix Sort</MenuItem>
          </Select>
        </FormControl>
          <Timer isActive={isActive} seconds={seconds} setSeconds={setSeconds}/>
        </div>
        </div>
  )
}

export default SingleChart
