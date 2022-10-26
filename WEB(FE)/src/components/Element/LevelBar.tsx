import { useEffect, useState } from 'react';

export interface LevelBarProps {
  exp: number;
  margin?: string;
}

const getLevel = (exp: number) => {
  if (exp < 100) {
    return [1, exp, 100];
  } else if (exp < 600) {
    return [2, exp - 100, 500];
  } else if (exp < 1600) {
    return [3, exp - 600, 1000];
  } else if (exp < 3600) {
    return [4, exp - 1600, 2000];
  } else if (exp < 5600) {
    return [5, exp - 3600, 2000];
  } else if (exp < 7600) {
    return [6, exp - 5600, 2000];
  } else if (exp < 12600) {
    return [7, exp - 7600, 5000];
  } else if (exp < 17600) {
    return [8, exp - 12600, 5000];
  } else if (exp < 22600) {
    return [9, exp - 17600, 5000];
  }
  return [10, exp - 22600, 1000000];
};

export const LevelBar = ({ exp, margin }: LevelBarProps) => {
  const [level, setLevel] = useState<number>();
  const [curExp, setCurExp] = useState<number>();
  const [levelUpExp, setLevelUpExp] = useState<number>();

  useEffect(() => {
    const [a, b, c] = getLevel(exp);
    setLevel(a);
    setCurExp(b);
    setLevelUpExp(c);
  }, []);

  return (
    <div className={`flex flex-col items-center${margin ? ` ${margin}` : null}`}>
      <div className="text-orange">{level} 레벨</div>
      <div></div>
      <div className="text-gray-400 text-xs">
        {curExp?.toLocaleString()}/{levelUpExp?.toLocaleString()}
      </div>
    </div>
  );
};
