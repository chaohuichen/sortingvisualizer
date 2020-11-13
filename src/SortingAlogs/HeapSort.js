import { comparing, swap, original } from './ConstantsColor';

const HeapSort = async (arr, animationChange, swapStateValue, finalFinishAnimation, finalSetData) => {
  for (let i = arr.length; i > 0; i--) {
    await MaxHeapify(arr, i, animationChange, swapStateValue)
    if (i - 1 === 0) { continue }
    const temp = arr[0]
    arr[0] = arr[i - 1]
    arr[i - 1] = temp
    swapStateValue(0, i - 1)
    await animationChange(arr, swap, 0, i - 1)
    await animationChange(arr, original, 0, i - 1)
  }
  finalSetData(arr)
  finalFinishAnimation()
}

const MaxHeapify = async (arr, limit, animationChange, swapStateValue) => {
  if (arr.length <= 0 || arr.length < limit) return

  let parentIdx = Math.floor(limit / 2)

  for (;parentIdx >= 0; parentIdx--) {
    if (parentIdx * 2 >= limit) {
      continue
    }

    const left = parentIdx * 2
    const right = (left + 1) >= limit ? left : (left + 1)

    const maxChildIdx = arr[left].value >= arr[right].value ? left : right

    await animationChange(arr, comparing, maxChildIdx, parentIdx)
    if (arr[maxChildIdx].value > arr[parentIdx].value) {
      const temp = arr[parentIdx]
      arr[parentIdx] = arr[maxChildIdx]
      arr[maxChildIdx] = temp

      swapStateValue(maxChildIdx, parentIdx)
      await animationChange(arr, swap, maxChildIdx, parentIdx)
    }
    await animationChange(arr, original, maxChildIdx, parentIdx)
  }
}
export default HeapSort
