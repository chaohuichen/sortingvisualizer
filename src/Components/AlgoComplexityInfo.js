import ComplexityDict from './ComplexityDict.json'
const TimeComplexityColor = {
  'O(n log(n))': 'orange',
  'O(n^2)': 'red',
  'O((nlog(n))^2)': 'red',
  'O(n)': 'green',
  'O(n+k)': 'green',
  'O(nk)': 'green'
}

const SpaceComplexityColor = {
  'O(1)': 'green',
  'O(n)': 'yellow',
  'O(log(n))': 'greenyellow',
  'O(n+k)': 'yellow'
}
const AlgoComplexityInfo = ({ sortingAlgo }) => {
  const {
    TimeComplexity: {
      Best: timeBest, Average: timeAvg, Worst: timeWorst
    },
    SpaceComplexity: {
      Worst: spaceWorst
    }
  } = ComplexityDict[sortingAlgo]

  return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <div >
                <h4>Time Complexity:</h4>
                  <p className={TimeComplexityColor[timeBest]}>Best: {timeBest}</p>
                  <p className={TimeComplexityColor[timeAvg]}>Average: {timeAvg}</p>
                  <p className={TimeComplexityColor[timeWorst]}>Worst: {timeWorst}</p>
            </div>
            <div>
                <h4>Space Complexity:</h4>
                 <p className={SpaceComplexityColor[spaceWorst]}>Worst: {spaceWorst}</p>
            </div>
        </div>
  )
}

export default AlgoComplexityInfo
