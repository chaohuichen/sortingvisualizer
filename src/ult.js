const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds)
  })
};
const  generateRandomArray=()=>{
  let randomLen = Math.ceil(Math.random()*100)+10
  let randomArray = new Array(randomLen)
  for(let  i = 0;i<randomLen;i++){
    randomArray[i] ={value:Math.ceil(Math.random()*100),color:'#8884d8'}
  }
  return  randomArray
}
export { sleep,generateRandomArray }
