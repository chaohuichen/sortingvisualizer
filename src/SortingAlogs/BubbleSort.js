import { comparing, swap, original } from './ConstantsColor';

const BubbleSort = async (data, animationChange, swapStateValue, finalFinishAnimation, finalSetData) => {
  for (let i = 0; i < data.length; ++i) {
    for (let j = i; j < data.length - 1; ++j) {
      // comparing the change in state
      await animationChange(data, comparing, j + 1, i)
      if (data[j + 1].value < data[i].value) {
        // swap in local
        const temp = data[j + 1]
        data[j + 1] = data[i]
        data[i] = temp
        // swap in state
        swapStateValue(i, j + 1)
        await animationChange(data, swap, j + 1, i)
      }
      // change back the original color
      await animationChange(data, original, j + 1, i)
    }
  }

  finalSetData([...data])
  finalFinishAnimation()
};

export default BubbleSort
