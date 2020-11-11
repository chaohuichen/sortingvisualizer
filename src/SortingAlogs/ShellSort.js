import { comparing, point } from './ConstantsColor';
// const ShellSort = async (arr, animationChange, swapStateValue, finalFinishAnimation, finalSetData) => {
//   let gap = Math.floor(arr.length / 2)
//   for (;gap > 0; gap = Math.floor(gap / 2)) {
//     console.log('the gap', gap)
//     for (let j = 0; (j + gap) < arr.length; ++j) {
//       for (let k = 0; (k + gap) < arr.length; k += gap) {
//         await animationChange(arr, comparing, k, k + gap)
//         if (arr[k].value > arr[k + gap].value) {
//           swapStateValue(k, k + gap)
//           const temp = arr[k + gap]
//           arr[k + gap] = arr[k]
//           arr[k] = temp
//           await animationChange(arr, swap, k, k + gap)
//         }
//       }
//     }
//   }
//   finalSetData(arr)
//   finalFinishAnimation(arr)
// }
const ShellSort = async (arr, animationChange, swapStateValue, finalFinishAnimation, finalSetData, changeSingleValue) => {
  let gap = 1
  let j
  let i
  const len = arr.length
  let temp
  while (gap < Math.ceil(len / 3)) {
    gap = gap * 3 + 1 // <O(n^(3/2)) by Knuth,1973>: 1, 4, 13, 40, 121, ...
  }
  // calculate the gap
  for (;gap > 0; gap = Math.floor(gap / 3)) {
    for (i = gap; i < len; i++) {
      temp = arr[i]
      await animationChange(arr, point, i)
      for (j = i - gap; j >= 0; j -= gap) {
        if (arr[j].value > temp.value) {
          await animationChange(arr, comparing, j, i)
          changeSingleValue(j + gap, arr[j].value)
          arr[j + gap] = arr[j]
        } else {
          break // doing the comparison on the for loop j >= 0 && arr[j].value > temp.value;
        }
      }
      changeSingleValue(j + gap, temp.value)
      arr[j + gap] = temp;
    }
  }

  finalSetData(arr)
  finalFinishAnimation(arr)
}
export default ShellSort
