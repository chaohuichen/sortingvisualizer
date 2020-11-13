const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds)
  })
};
const generateRandomArray = (size) => {
  // const randomLen = Math.ceil(Math.random() * 100) + 10
  const arrayLen = size || Math.ceil(Math.random() * 100) + 10
  const randomArray = new Array(arrayLen)
  for (let i = 0; i < arrayLen; i++) {
    randomArray[i] = { value: Math.ceil(Math.random() * 100), color: 'rgba(88,81,219,0.9)' }
  }
  return randomArray
}
export { sleep, generateRandomArray }
