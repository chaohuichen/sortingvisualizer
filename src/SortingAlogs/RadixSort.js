import { point, original } from './ConstantsColor';

const RadixSort = async (arr, animationChange, swapStateValue, finalFinishAnimation, finalSetData, changeSingleValue) => {
  if (arr.length <= 1) return
  // find the max
  let max = findMax(arr)

  let maxDigit = 1
  while (Math.floor(max / 10) > 0) {
    maxDigit++
    max = Math.floor(max / 10)
  }

  const buckets = new Array(10)
  for (let i = 0; i < buckets.length; ++i) {
    buckets[i] = new Array(arr.length).fill(0)
  }

  let base = 10
  for (let i = 0; i < maxDigit; ++i) {
    const bktLen = new Array(10).fill(0)

    for (let j = 0; j < arr.length; ++j) {
      const whichBucket = Math.floor((arr[j].value % base) / (base / 10))
      buckets[whichBucket][bktLen[whichBucket]] = arr[j]
      bktLen[whichBucket]++
    }

    let k = 0
    for (let b = 0; b < buckets.length; ++b) {
      for (let p = 0; p < bktLen[b]; ++p) {
        changeSingleValue(k, buckets[b][p].value)
        await animationChange(arr, point, k)
        arr[k++] = buckets[b][p]
        await animationChange(arr, original, k)
      }
    }
    base *= 10
  }

  finalSetData(arr)
  finalFinishAnimation()
}

const findMax = (arr, max = 0) => {
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i].value) {
      max = arr[i].value
    }
  }
  return max
}
export default RadixSort
