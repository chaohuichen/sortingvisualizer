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

  return <div>{moment.utc(seconds * 1000).format('mm:ss')}</div>
}
export default Timer
