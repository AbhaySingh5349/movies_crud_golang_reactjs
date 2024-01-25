import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface SideBarItemProps {
  label: string;
  icon: IconType;
  route: string;
}

const SideBarItem = ({ label, icon: Icon, route }: SideBarItemProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(route)}
      className=" px-4 py-3 font-semibold transition hover:bg-neutral-100 flex gap-2 items-center"
    >
      <Icon size={18} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default SideBarItem;
