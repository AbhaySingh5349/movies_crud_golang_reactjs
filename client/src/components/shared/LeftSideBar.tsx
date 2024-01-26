import { useContext } from 'react';

import { loggedInCategories, loggedOutCategories } from '../../constants';
import { SideBarItem } from '../index';
import { JwtContext } from '../../context/JwtContext';

const LeftSideBar = () => {
  const { jwtToken } = useContext(JwtContext);
  return (
    <div className="flex flex-col w-[185px]">
      {jwtToken === ''
        ? loggedOutCategories.map((category: any) => (
            <SideBarItem
              key={category.label}
              label={category.label}
              icon={category.icon}
              route={category.route}
            />
          ))
        : loggedInCategories.map((category: any) => (
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
