import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet,ImageBackground} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Routes from '../../src/routes'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DSchool.db' });
var isAdmin= false;
export default class Splash extends Component {

  state={
            isAdmin: false,
          };


  componentDidMount() {
     
          setTimeout(() => {
                this.moveScreen()
            // Actions.login()
              }, 3000);    
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

        if (this.state.isAdmin) {
          return(
                           <View  style={{flex:1}}>
                            <Routes/>
                            </View>)
        }
        return (
            <ImageBackground style= { styles.backgroundImage } source={require("../images/bg.png")}>
               {/* <Image source={require("../images/splash_img.jpeg")} style={{width: 412, height: 324}}/> */}
            </ImageBackground>
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
    backgroundColor: '#DDDDDD',
    height:35,
    justifyContent:"center",
    margin:20,

  },
  backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
})

