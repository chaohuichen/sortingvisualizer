import { comparing, point } from './ConstantsColor';

const ShellSort = async (arr, animationChange, swapStateValue, finalFinishAnimation, finalSetData, changeSingleValue) => {
  let gap, i, j, temp
  const len = arr.length
  for (gap = len >> 1; gap > 0; gap >>= 1) {
    for (i = gap; i < len; i++) {
      temp = arr[i]
      await animationChange(arr, point, i)
      for (j = i - gap; j >= 0; j -= gap) {
        await animationChange(arr, comparing, j, i)
        if (arr[j].value > temp.value) {
          changeSingleValue(j + gap, arr[j].value)
          arr[j + gap] = arr[j]
        } else {
          break;
        }
      }
      changeSingleValue(j + gap, temp.value)
      arr[j + gap] = temp;
    }
  }
  finalSetData(arr)
  finalFinishAnimation(arr)
}
// const ShellSort = async (arr, animationChange, swapStateValue, finalFinishAnimation, finalSetData, changeSingleValue) => {
//   let gap = 1
//   let j
//   let i
//   const len = arr.length
//   let temp
//   while (gap < Math.ceil(len / 3)) {
//     gap = gap * 3 + 1 // <O(n^(3/2)) by Knuth,1973>: 1, 4, 13, 40, 121, ...
//   }
//   // calculate the gap
//   for (;gap > 0; gap = Math.floor(gap / 3)) {
//     for (i = gap; i < len; i++) {
//       temp = arr[i]
//       await animationChange(arr, point, i)
//       for (j = i - gap; j >= 0; j -= gap) {
//         if (arr[j].value > temp.value) {
//           await animationChange(arr, comparing, j, i)
//           changeSingleValue(j + gap, arr[j].value)
//           arr[j + gap] = arr[j]
//         } else {
//           break // doing the comparison on the for loop j >= 0 && arr[j].value > temp.value;
//         }
//       }
//       changeSingleValue(j + gap, temp.value)
//       arr[j + gap] = temp;
//     }
//   }
//
//   finalSetData(arr)
//   finalFinishAnimation(arr)
// }
export default ShellSort
