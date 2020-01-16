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
                
            } else if(Actions.currentScene === 'customerList' || Actions.currentScene === 'driverList'){
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
      <Router backAndroidHandler={this.onBackPress}>
      <Stack key = "root">
      <Scene key = "splash" component = {Splash} title = "Splash" hideNavBar={true} initial = {true} />
         <Scene key = "login" component = {Login} title = "Login" hideNavBar={true} />
         <Scene key = "userList" component = {UserList} title = "UserList" />
         <Scene key="driverRegistration" component={DriverRegistration} title = "DriverRegistration"/>
         <Scene key="driverList" component={DriverList} title = "DriverList"/>
         <Scene key="customerRegistration" component={CustomerRegistration} title = "CustomerRegistration"/>
         <Scene key="customerList" component={CustomerList} title = "CustomerList"/>
         <Scene key="homeAdmin" component={HomeAdmin} title ="Home"/>
         <Scene key="homeCustomer" component={HomeCustomer} title ="Home"/>
         <Scene key="homeDriver" component={HomeDriver} title ="Home"/>
         <Scene key = "documentUpload" component = {DocumentPickerApp} title = "DocumentUpload" />
      </Stack>
   </Router>
   )
}
  
}
export default Routes