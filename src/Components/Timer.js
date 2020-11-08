import { useEffect } from 'react'

const Timer = ({ isActive, setIsActive, seconds, setSeconds }) => {
  // const [isActive, setIsActive] = useState(false);
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

  return <div>{seconds}s</div>
}
export default Timer
