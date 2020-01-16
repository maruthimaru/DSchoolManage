import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DSchool.db' });
export default class Splash extends Component {

moveScreen(){
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
                           Actions.homeAdmin() 
                          }else if(loginType=="Driver"){
                          Actions.homeDriver() 
                          }else{
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
        setTimeout(() => {
            this.moveScreen()
            // Actions.login()
        }, 3000);
        let pic={
            uri:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.winudf.com%2Fv2%2Fimage%2FY29tLmdhbWVzLmVkZ2UuY2FyLmRyaXZpbmdzY2hvb2wyMDE3X3NjcmVlbl80XzE1MjAwMDIxNjdfMDg0%2Fscreen-4.jpg%3Fh%3D800%26fakeurl%3D1%26type%3D.jpg&f=1&nofb=1"
        };
        return (
            <View style={styles.viewColor}>
               <Image source={require("../images/splash_img.jpeg")} style={{width: 412, height: 324}}/>
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
    backgroundColor: '#DDDDDD',
    height:35,
    justifyContent:"center",
    margin:20,

  },
})

