export interface NavItemProps {
  text?: string;
  label: string;
  margin?: string;
  onClick?: () => void;
}

export const NavItem = ({ text, label, margin, onClick }: NavItemProps) => {
  return (
    <div className={`cursor-pointer${margin ? ` ${margin}` : ''}`} onClick={onClick}>
      <a className={`text-black${text ? ` ${text}` : ''}`}>{label}</a>
    </div>
  );
};
