import { comparing, swap, point } from './ConstantsColor';
const partition = async (arr, low, high, animationChange, swapStateValue) => {
  const pivot = arr[high]
  let i = low - 1
  await animationChange(arr, point, high)
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

const Sort = async (arr, low, high, animationChange, swapStateValue) => {
  if (low < high) {
    const pi = await partition(arr, low, high, animationChange, swapStateValue)
    await Sort(arr, low, pi - 1, animationChange, swapStateValue)
    await Sort(arr, pi + 1, high, animationChange, swapStateValue)
  }
}
const QuickSort = async (arr, low, high, animationChange, swapStateValue, finalFinishAnimation, finalSetData) => {
  await Sort(arr, 0, arr.length - 1, animationChange, swapStateValue)
  finalSetData(arr)
  finalFinishAnimation()
}
export default QuickSort
