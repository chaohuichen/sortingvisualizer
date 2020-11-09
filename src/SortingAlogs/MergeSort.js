import { comparing, point } from './ConstantsColor';
// https://www.geeksforgeeks.org/iterative-merge-sort/
const MergeSort = async (array, animationChange, finalFinishAnimation, finalSetData, changeSingleValue) => {
  const n = array.length
  let currSize
  let leftStart

  for (currSize = 1; currSize <= n - 1; currSize = 2 * currSize) {
    for (leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
      const mid = Math.min(leftStart + currSize - 1, n - 1)
      const rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1)

      await Merge(array, leftStart, mid, rightEnd, animationChange, changeSingleValue)
    }
  }
  finalFinishAnimation()
  finalSetData(array)
}

const Merge = async (arr, left, mid, right, animationChange, changeSingleValue) => {
  let i, j, k
  const leftArrSize = mid - left + 1
  const rightArrSize = right - mid

  const leftArr = new Array(leftArrSize)
  const rightArr = new Array(rightArrSize)
  // copy the array into the left and right
  for (i = 0; i < leftArrSize; ++i) {
    leftArr[i] = arr[left + i]
  }
  for (j = 0; j < rightArrSize; ++j) {
    rightArr[j] = arr[mid + 1 + j]
  }

  i = 0
  j = 0
  k = left

  while (i < leftArrSize && j < rightArrSize) {
    // comparing left and right
    await animationChange(arr, comparing, left + i, mid + 1 + j)
    if (leftArr[i].value <= rightArr[j].value) {
      changeSingleValue(k, leftArr[i].value)

      await animationChange(arr, point, left + i)
      arr[k++] = leftArr[i++]
    } else {
      changeSingleValue(k, rightArr[j].value)
      await animationChange(arr, point, mid + 1 + j)
      arr[k++] = rightArr[j++]
    }
  }
  // copy left over
  while (i < leftArrSize) {
    changeSingleValue(k, leftArr[i].value)
    await animationChange(arr, point, left + i)
    arr[k++] = leftArr[i++]
  }
  while (j < rightArrSize) {
    changeSingleValue(k, rightArr[j].value)
    await animationChange(arr, point, mid + 1 + j)
    arr[k++] = rightArr[j++]
  }
}

export default MergeSort
