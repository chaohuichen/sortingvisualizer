import { comparing, swap, point } from './ConstantsColor';
const InsertionSort = async (data, animationChange, swapStateValue, finalFinishAnimation, finalSetData, setData) => {
  for (let i = 1; i < data.length; i++) {
    const temp = data[i]
    await animationChange(data, point, i)
    for (let j = i; j >= 0; j--) {
      await animationChange(data, comparing, j - 1, i)
      if (j > 0 && data[j - 1].value > temp.value) {
        data[j] = data[j - 1];
        // change in state
        setData((prevState) => {
          return prevState.map((element, index) => {
            if (index === j) {
              return { ...data[j - 1] }
            } else {
              return element
            }
          })
        })
        await animationChange(data, swap, j, j - 1)
      } else {
        data[j] = temp;
        await animationChange(data, swap, j, i)
        break;
      }
    }
  }
  finalFinishAnimation()
  finalSetData(data)
}
export default InsertionSort
