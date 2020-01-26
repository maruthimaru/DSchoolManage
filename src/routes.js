import Page0 from './pages/HomeAdmin';
import Page1 from './pages/DriverList';
import Page2 from './pages/CustomerList';
import Page3 from './Page3/Page3';
import SideMenu from './SideMenu/SideMenu';
import {DrawerNavigator} from 'react-navigation';

export default DrawerNavigator({
  Page0: {
    screen: Page0
  },
  Page1: {
    screen: Page1
  },
  Page2: {
    screen: Page2
  },
  Page3: {
    screen: Page3
  }
}, {
  contentComponent: SideMenu,
  drawerWidth: 250,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});
