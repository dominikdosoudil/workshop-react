import { useEffect, useState } from "react";
import * as formatDuration from "format-duration";

interface TimerProps {
  from: number;
}

const Timer = ({ from }: TimerProps) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const currentMs = Date.now();
    const nextRoundSec = Math.ceil(Date.now() / 1000) * 1000;
    const nextRoundSecAfter = nextRoundSec - currentMs;
    console.log(`Next round sec: `, nextRoundSecAfter);

    let intervalId: number | null = null;

    const timeoutId = setTimeout(() => {
      setNow(Date.now());
      intervalId = setInterval(() => {
        setNow(Date.now());
      }, 1000);
    }, nextRoundSecAfter);

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
      clearTimeout(timeoutId);
    };
  }, [from]);

  return <div>{formatDuration(Math.max(0, now - from))}</div>;
};
interface HomeProps {}

const Home = ({}: HomeProps) => {
  const [a, setA] = useState(Date.now());

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Timer from={1704463927217} />
      <Timer from={a} />
      <button onClick={() => setA(Math.floor(Date.now() / 1000) * 1000)}>
        change
      </button>
    </div>
  );
};

export default Home;
