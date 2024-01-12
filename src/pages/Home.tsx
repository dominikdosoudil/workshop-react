import * as React from "react";
import { useEffect, useState } from "react";

interface TimerProps {
  from: number;
}

const Timer = ({ from }: TimerProps) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [from]);

  return <div>{now - from}</div>;
};
interface HomeProps {}

const Home = ({}: HomeProps) => {
  const [a, setA] = useState(Date.now());

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Timer from={1704463927217} />
      <Timer from={a} />
      <button onClick={() => setA(Date.now())}>change</button>
    </div>
  );
};

export default Home;
