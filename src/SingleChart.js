import {BarChart, Bar,Cell} from 'recharts'
import {useState} from 'react'


const sleep = (milliseconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, milliseconds);
    });
};

const comparing = 'red'
const original = '#8884d8'
const finish = 'green'
const swap = 'yellow'
function SingleChart() {
    const [data,setData]=useState([
        { value: 4000,color:'#8884d8'},
        { value: 3000,color:'#8884d8'},
        { value: 2000,color:'#8884d8'},
        { value: 2780,color:'#8884d8'},
        { value: 1890,color:'#8884d8'},
        { value: 1000,color:'#8884d8'},
        { value: 3490,color:'#8884d8'},
    ])

    const animationChange = async (data,x,y,color)=>{
        data[x].color=color
        data[y].color=color
        setData([...data])
        await sleep(50)
    }
    const bubbleSort =async (e)=>{
        e.preventDefault()
        for(let i = 0;i<data.length;++i){
            for(let j=i;j<data.length-1;++j){
                //comparing
                await animationChange(data,j+1,i,comparing)
                if(data[j+1].value<data[i].value){
                    let temp  = data[j+1]
                    data[j+1]=data[i]
                    data[i]=temp
                    await animationChange(data,j+1,i,swap)
                }
              //change back the original color
                await animationChange(data,j+1,i,original)
            }
            data[i].color = finish
            setData([...data])
            await sleep(50)
        }
        setData([...data])
    }
    return (<>
        <BarChart width={250} height={200} data={data}>
        <Bar dataKey='value'>
            {data.map((d,index)=>{return <Cell key ={index}  fill={d.color}/>})}
        </Bar>
        </BarChart>
            <button onClick={bubbleSort}>Click</button>
        </>
    )
}

export default SingleChart