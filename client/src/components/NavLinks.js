// import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ toggleSidebar }) => {
//   const { user, toggleSidebar } = useDashboardContext();

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        
        return (
          <NavLink
            to={path}
            key={text}
            onClick={toggleSidebar}
            className='nav-link'
            end
            // className={({ isActive }) =>
            //   isActive ? 'nav-link active' : 'nav-link'
            // }
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;