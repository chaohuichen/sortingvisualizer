import {BarChart, Bar} from 'recharts'
import {useState} from 'react'
function SingleChart() {
    const [data,setData]=useState([
        { value: 4000},
        { value: 3000},
        { value: 2000},
        { value: 2780},
        { value: 1890},
        { value: 1000},
        { value: 3490},
    ])

    const bubbleSort =async (e)=>{
        // e.preventDefault()
        for(let i = 0;i<data.length;++i){
            for(let j=i;j<data.length-1;++j){
                if(data[j+1].value<data[i].value){
                    let temp  = data[j+1]
                    data[j+1]=data[i]
                    data[i]=temp

                }
            }
        }
        setData([...data])
    }
    return (<>
        <BarChart width={250} height={200} data={data}>
            <Bar dataKey='value' fill='#8884d8'/>
        </BarChart>
            <button onClick={bubbleSort}>Click</button>
        </>
    )
}

export default SingleChart