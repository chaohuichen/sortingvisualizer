import { original, swap } from './ConstantsColor';
const PancakeSort = async (arr, animationChange, swapStateValue, finalFinishAnimation, finalSetData) => {
  for (let i = 0; i < arr.length; ++i) {
    // return the maximum number of the index
    const maxIdx = findMax(arr, arr.length - i)

    await flipElements(arr, 0, maxIdx, swapStateValue, animationChange)
    await flipElements(arr, 0, arr.length - 1 - i, swapStateValue, animationChange)
  }
  finalSetData([...arr])
  finalFinishAnimation()
}
const findMax = (arr, k) => {
  let max = 0
  let index = -1
  for (let i = 0; i < k; ++i) {
    if (arr[i].value > max) {
      max = arr[i].value
      index = i
    }
  }
  return index
}

const flipElements = async (arr, low, high, swapStateValue, animationChange) => {
  while (low < high) {
    await animationChange(arr, swap, low, high)
    const temp = arr[low]
    arr[low] = arr[high]
    arr[high] = temp
    swapStateValue(low, high)
    low++
    high--
    await animationChange(arr, original, low, high)
  }
}

export default PancakeSort
