import { ReactComponent as CheckGray } from '@/assets/check_gray.svg';
import { ReactComponent as CheckWhite } from '@/assets/check_white.svg';
import { useState } from 'react';

interface PreferMiliroutineProps {
  label: string;
  clicked: boolean;
  onClick: () => void;
}

export const PreferMiliroutine = ({ label, clicked, onClick }: PreferMiliroutineProps) => {
  return (
    <button
      className={`rounded-2xl font-lg font-semibold p-4 m-1  ${!clicked ? 'bg-white-200 text-gray-400' : 'bg-orange text-white-200'}`}
      onClick={onClick}>
      <div className="flex">
        {!clicked ? <CheckGray /> : <CheckWhite />}
        <p className="ml-5">{label}</p>
      </div>
    </button>
  );
};
