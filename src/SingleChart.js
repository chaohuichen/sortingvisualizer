import {Bar, BarChart, Cell} from 'recharts'
import {useEffect, useState} from 'react'
import {sleep} from './ult'

const comparing = 'red'
const original = '#8884d8'
const finish = 'green'
const swap = 'yellow'
function SingleChart ({ incomingData, startAnimation }) {
  const [data, setData] = useState([])

  useEffect(() => {
    setData([...incomingData])
  }, [incomingData])
  useEffect( ()=>{
    if(startAnimation){
      bubbleSort()
    }
    // bubbleSort()
  },[startAnimation])

  const animationChange = async (data,  color,x, y) => {
      setData(()=>{
          return data.map((element, index) => {
              if (index === x || index===y) {
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
  const swapStateValue = (x,y)=>{
      setData((prevState)=>{
          return prevState.map((element, index) => {
              if (index === x) {
                  return {...data[y]}
              }else if(index === y){
                  return {...data[x]}
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
        await animationChange(data, comparing,j + 1, i )
        if (data[j + 1].value < data[i].value) {
            //swap in local
            const temp = data[j + 1]
            data[j + 1] = data[i]
            data[i] = temp
            //swap in state
            swapStateValue(i,j+1)
          await animationChange(data, swap,j + 1, i)
        }
        // change back the original color
          await animationChange(data, original, j + 1, i)
      }
      await animationChange(data, finish, i)
        //comparing the change in local
       data[i] = {
          value:data[i].value,
           color:finish
      }
    }
    setData([...data])
  };

  return (
      <BarChart width={250} height={200} data={data}>
        <Bar dataKey='value'>
          {data.map((d, index) => {
            return <Cell key={index} fill={d.color} />
          })}
        </Bar>
      </BarChart>
  )
}

export default SingleChart
