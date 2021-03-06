import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet,ImageBackground,PermissionsAndroid} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DSchool.db' });
var isAdmin= false;
const name = require('../../package.json').name
export default class Splash extends Component {

  state={
            isAdmin: false,
          };


  componentDidMount() {
     this.requestCameraPermission()
            
  }


    requestCameraPermission() {
        try {
            var context=this
          const granted =  PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]).then((result) => {
                if (result['android.permission.CAMERA']
                && result['android.permission.READ_EXTERNAL_STORAGE']
                && result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
                    console.log("granted");
                   setTimeout(() => {
                this.moveScreen()
            // Actions.login()
              }, 3000); 
                    return 'granted'
                  
                } else if (result['android.permission.CAMERA']
                || result['android.permission.READ_EXTERNAL_STORAGE']
                || result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again') {
                    
                    alert('Please Go into Settings -> Applications -> '+name+' -> Permissions and Allow permissions to continue')
                
                  return 'denied'
                }
              });
              console.log('You can use the permission granted' +PermissionsAndroid.RESULTS.GRANTED);
        //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     console.log('You can use the permission granted');
        //     // this.setState({
        //     //     permissionsGranted: true
        //     //   });
             
           
            
        //   } else {
        //     console.log('Camera permission denied');
        //     permissionsGranted=false
        //   }
        } catch (err) {
          console.warn(err);
        }
      }
  

moveScreen(){
  let currentComponent = this;
     db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='login'",
        [],
        (tx, res)=> {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
           Actions.login()
          }else{
txn.executeSql(
        "SELECT type FROM login",
        [],
        (tx, res)=> {
          console.log('item:', res.rows.length);
          if (res.rows.length != 0) {
              var loginType=res.rows.item(0).type
              console.log('loginType:', loginType);
                if (loginType=="Admin") {
                  // Actions.menu()
                  
                  // currentComponent.setState({
                  //     isAdmin: true,
                  // });
                  Actions.homeAdmin()
                      // isAdmin=true;
                  // console.log("isAdmin2 ",isAdmin + "state : ");
                          }else if(loginType=="Driver"){
                          Actions.homeDriver()
                          }else{
                          // Actions.register()
                          Actions.homeCustomer()
                          }
          }else{
            console.log("already table created")
            Actions.login()
          }
        }
      );
          }
        }
      );
    });
}

    render() {
        
        let pic={
            uri:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.winudf.com%2Fv2%2Fimage%2FY29tLmdhbWVzLmVkZ2UuY2FyLmRyaXZpbmdzY2hvb2wyMDE3X3NjcmVlbl80XzE1MjAwMDIxNjdfMDg0%2Fscreen-4.jpg%3Fh%3D800%26fakeurl%3D1%26type%3D.jpg&f=1&nofb=1"
        };
console.log("isAdmin "+this.state.isAdmin);

        // if (this.state.isAdmin) {
        //   return(
        //                    <View  style={{flex:1}}>
        //                     <Routes/>
        //                     </View>)
        // }
        return (
           <View  style={{flex:1,justifyContent: "center",alignItems:'center',backgroundColor: '#FFF',}}>
            <Image style= { styles.backgroundImage } source={require("../images/splash_img.jpeg")}>
               {/* <Image source={require("../images/splash_img.jpeg")} style={{width: 412, height: 324}}/> */}
            </Image>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    viewColor:{
    alignContent:"center",
    justifyContent:"center",
     alignItems:"center",
    backgroundColor:"#500077",
    flex:1
},
    button: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    height:35,
    justifyContent:"center",
    margin:20,

  },
  backgroundImage:{
        // flex: 1,
        // width: 50,
        // height: 50,
        borderRadius: 200 / 2 ,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
})

