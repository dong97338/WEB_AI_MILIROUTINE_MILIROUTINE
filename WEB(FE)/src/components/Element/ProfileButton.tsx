import addImageServerPrefix from '@/utils/addImageServerPrefix';

interface ProfileButtonProps {
  nickname: string;
  profile_img: string;
  background_img: string;
  point: number;
  exp: number;
  margin?: string;
  onClick?: () => void;
}

export const ProfileButton = ({ nickname, profile_img, background_img, point, exp, margin, onClick }: ProfileButtonProps) => {
  return (
    <button className={margin} onClick={onClick}>
      <img src={addImageServerPrefix(profile_img)} className="w-10 h-10 rounded-full" />
    </button>
    // <button
    //   className={`bg-orange text-white-100 ${text} font-bold rounded-full ${px} ${py}${margin ? ` ${margin}` : ''}`}
    //   onClick={onClick}>
    //   {label}
    // </button>
  );
};
