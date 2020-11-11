import { comparing, point, swap } from './ConstantsColor';

const SelectionSort = async (arr, animationChange, swapStateValue, finalFinishAnimation, finalSetData) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i
    await animationChange(arr, point, min)
    for (let j = i + 1; j < arr.length; ++j) {
      await animationChange(arr, comparing, j)
      if (arr[j].value < arr[min].value) {
        min = j
      }
    }
    if (min !== i) {
      swapStateValue(i, min)
      const temp = arr[min]
      arr[min] = arr[i]
      arr[i] = temp
      await animationChange(arr, swap, min, i)
    }
  }
  finalSetData(arr)
  finalFinishAnimation()
}

export default SelectionSort
