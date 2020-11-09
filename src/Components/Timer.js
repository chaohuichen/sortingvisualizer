import { useEffect } from 'react'
import moment from 'moment'
const Timer = ({ isActive, seconds, setSeconds }) => {
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
  <div>
    <h3>finish time: </h3>
    <div style={{ border: '2px solid black' }}>{moment.utc(seconds * 1000).format('mm:ss')}</div>
  </div>)
}
export default Timer
