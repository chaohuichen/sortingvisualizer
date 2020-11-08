const MergeSort = (data) => {
  const mid = Math.floor((0 + data.length) / 2)
  const left = data.slice(0, mid)
  const right = data.slice(mid + 1)
  return sort(left, right)
}
function sort (left, right) {
  let i = 0
  let j = 0
  const leftSize = left.length
  const rightSize = right.length
  const tempArr = new Array(leftSize + rightSize)
  while (i < leftSize && j < leftSize) {
    if (left[i] < right[j]) {
      tempArr[i + j] = left[i]
      i++
    } else {
      tempArr[j + i] = right[j]
      j++
    }
  }
  while (i < leftSize)tempArr[i + j] = left[i]
  while (j < rightSize)tempArr[i + j] = right[j]
  return tempArr
}
export default MergeSort
