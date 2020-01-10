import React from 'react'
import { Router, Scene,Stack } from 'react-native-router-flux'
import Login from '../pages/Login'
import UserList from '../pages/UserList'
import DocumentPickerApp from '../pages/DocumentPickerApp'

const Routes = () => (
   <Router>
      <Stack key = "root">
         <Scene key = "login" component = {Login} title = "Login" hideNavBar={true} initial = {true} />
         <Scene key = "userList" component = {UserList} title = "UserList" />
         <Scene key = "documentUpload" component = {DocumentPickerApp} title = "DocumentUpload" />
      </Stack>
   </Router>
)
export default Routes