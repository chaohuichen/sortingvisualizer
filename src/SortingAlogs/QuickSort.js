import { comparing, swap } from './ConstantsColor';
const partition = async (arr, low, high, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData) => {
  const pivot = arr[high]
  let i = low - 1
  for (let j = low; j < high; j++) {
    await animationChange(arr, comparing, j, high)
    if (arr[j].value < pivot.value) {
      i++
      await swapStateValue(i, j)
      await animationChange(arr, swap, i, j)
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  await swapStateValue(i + 1, high)
  await animationChange(arr, swap, i + 1, high)
  const temp = arr[i + 1]
  arr[i + 1] = arr[high]
  arr[high] = temp;
  return i + 1
}

const Sort = async (arr, low, high, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData) => {
  if (low < high) {
    const pi = await partition(arr, low, high, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData)
    await Sort(arr, low, pi - 1, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData)
    await Sort(arr, pi + 1, high, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData)
  }
  // finalSetData(arr)
  // finalFinishAnimation()
}
const QuickSort = (arr, low, high, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData) => {
  Sort(arr, 0, arr.length - 1)
  finalSetData(arr)
  finalFinishAnimation()
  console.log(arr)
}
export default QuickSort
