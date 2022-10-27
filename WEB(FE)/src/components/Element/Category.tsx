interface CategoryProps {
  label: string;
  clicked: boolean;
  onClick: () => void;
}

export const Category = ({ label, clicked, onClick }: CategoryProps) => {
  return (
    <button
      className={`w-32 h-32 rounded-2xl text-center text-xl font-semibold m-1 ${
        !clicked ? 'bg-white-200 text-gray-400' : 'bg-orange text-white-200'
      }`}
      onClick={onClick}>
      {label}
    </button>
  );
};
