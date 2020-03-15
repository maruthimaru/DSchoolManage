import React from 'react'
import { Router, Scene,Stack ,Actions} from 'react-native-router-flux'
import Login from '../pages/Login'
import UserList from '../pages/UserList'
import DocumentPickerApp from '../pages/DocumentPickerApp'
import DriverRegistration from '../pages/DriverRegistration'
import DriverList from '../pages/DriverList'
import CustomerList from '../pages/CustomerList'
import CustomerRegistration from '../pages/CustomerRegistration'
import HomeAdmin from '../pages/HomeAdmin'
import HomeCustomer from '../pages/HomeCustomer'
import HomeDriver from '../pages/HomeDriver'
import Splash from '../pages/Splash'
import Menu from '../../src/routes'
import TrainerDetails from '../pages/TrainerDetails'
import TrainerCustomerList from '../pages/TrainerCustomerList'
import Register from '../Page3/Register'
import SlotList from "../pages/SlotList";
import SlotNew from "../pages/SlotNew";
import CurrentDayCus from "../pages/CurrentDayCus";
import CustomerAttendance from "../pages/CustomerAttendance";
import CarList from "../pages/CarList";
import CarRegistration from "../pages/CarRegistration";
import CustomerQrcode from '../pages/CustomerQrcode';
import AboutUs from '../pages/AboutUs';
import LicenceDetails from '../pages/LicenceDetails';
import CurrentDayDriver from '../pages/CurrentDayDriver';
// import SideMenu from '../components/SideMenu'
import { ToastAndroid ,BackHandler} from 'react-native';

var backButtonPressedOnceToExit = false;
export class  Routes extends React.Component {


  onBackPress() {
      console.log("Actions.currentScene$"+Actions.currentScene );
      
        if (backButtonPressedOnceToExit) {
            BackHandler.exitApp();
        } else {
            if (Actions.currentScene === 'login' || Actions.currentScene ==='homeAdmin' 
            || Actions.currentScene ==='homeDriver' || Actions.currentScene ==='homeCustomer') {
                 backButtonPressedOnceToExit = true;
                ToastAndroid.show("Press Back Button again to exit",ToastAndroid.SHORT);
                //setting timeout is optional
                setTimeout( () => { backButtonPressedOnceToExit = false }, 2000);
                return true;
                
            } else if(Actions.currentScene === 'customerList' || Actions.currentScene === 'driverList' || Actions.currentScene==='slotList' 
            || Actions.currentScene ==='carList'){
                Actions.homeAdmin();
                return true;
            }
            else {
               Actions.pop();
                return true;
            }
        }
    }
render(){
   return(
      <Router navigationBarStyle={{ backgroundColor: '#81b71a' }} backAndroidHandler={this.onBackPress}>
      <Stack key = "root">
      <Scene key = "splash" component = {Splash} title = "Splash" hideNavBar={true} initial = {true} />
         <Scene key = "login" component = {Login} title = "Login" hideNavBar={true} />
         <Scene key = "userList" component = {UserList} title = "UserList" />
         <Scene key="driverRegistration" component={DriverRegistration} title = "DriverRegistration"/>
         <Scene key="driverList" component={DriverList} title = "DriverList"/>
         <Scene key="customerRegistration" component={CustomerRegistration} title = "CustomerRegistration"/>
         <Scene key="customerList" component={CustomerList} title = "CustomerList"/>
         <Scene key="homeAdmin" component={HomeAdmin} title ="Home"/>
         <Scene key="menu" component={Menu} title ="Menu"/>
         <Scene key="homeCustomer" component={HomeCustomer} title ="Home"/>
         <Scene key="homeDriver" component={HomeDriver} title ="Home"/>
         <Scene key="trainerCustomerList" component={TrainerCustomerList} title ="Customer List"/>
         <Scene key="trainerDetails" component={TrainerDetails} title="Trainer Details"/>
         <Scene key = "documentUpload" component = {DocumentPickerApp} title = "DocumentUpload" />
         <Scene key="register" component={Register} title = "Register"/>
         <Scene key="slotList" component={SlotList} title="SlotList"/>
         <Scene key="slotNew" component={SlotNew} title="SlotNew"/>
         <Scene key="currentDayCus" component={CurrentDayCus} title="CurrentDayCus"/>
         <Scene key="customerAttendance" component={CustomerAttendance} title="Customer Attendance"/>
         <Scene key="carRegistration" component={CarRegistration} title="Car Registration"/>
         <Scene key="carList" component={CarList} title="Car List"/>
         <Scene key="customerQrcode" component ={CustomerQrcode} title="Customer code"/>
         <Scene key ="aboutUs" component ={AboutUs} title="AboutUs"/>
         <Scene key ="licenceDetails" component ={LicenceDetails} title="Licence Details"/>
         <Scene key ="currentDayDriver" component ={CurrentDayDriver} title="Current Day Driver"/>
          {/* <Scene
     key="sideMenu" component={HomeAdmin} navTransparent={1}
     navBar={SideMenu}
       /> */}
      </Stack>
   </Router>
   )
}
  
}
export default Routes