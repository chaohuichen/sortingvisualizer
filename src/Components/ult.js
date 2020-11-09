const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds)
  })
};
const generateRandomArray = () => {
  const randomLen = Math.ceil(Math.random() * 100) + 10
  const randomArray = new Array(randomLen)
  for (let i = 0; i < randomLen; i++) {
    randomArray[i] = { value: Math.ceil(Math.random() * 100), color: 'rgba(88,81,219,0.9)' }
  }
  return randomArray
}
export { sleep, generateRandomArray }
