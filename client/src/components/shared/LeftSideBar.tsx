import { loggedInCategories } from '../../constants';
import { SideBarItem } from '../index';

const LeftSideBar = () => {
  return (
    <div className="flex flex-col w-[185px]">
      {loggedInCategories.map((category) => (
        <SideBarItem
          key={category.label}
          label={category.label}
          icon={category.icon}
          route={category.route}
        />
      ))}
    </div>
  );
};

export default LeftSideBar;
