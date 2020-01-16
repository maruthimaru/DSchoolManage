import React, { Component } from 'react'
import { Text, View,Image,TouchableOpacity,Alert } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';
import { Actions } from 'react-native-router-flux'
var db = openDatabase({ name: 'DSchool.db' });
export default class ActionBarImage extends Component {


logout(){
Alert.alert(
                    'Logout',
                    'Are you sure want to logout!',
                    [
                      {
                        text: 'Yes',
                        onPress: () =>{
                           db.transaction(function(txn) {
      txn.executeSql(
        "DELETE FROM login",
        [],
        function(tx, res) {
          console.log('item:', res.rowsAffected);
          if (res.rowsAffected > 0) {
            Actions.login()
          }
        }
      );
    });
                           
                         } ,
                      }, {
                        text: 'No',
                        onPress: () =>{
                           
                         } ,
                      }
                    ],
                    { cancelable: false }
                  );
}
    render() {
        return (
            <View>
<TouchableOpacity onPress={()=> this.logout()}>

                <Image source={require("../images/logout.png")}
                  style={{ width: 24, height: 24,  marginRight: 15}}
                  />
                  </TouchableOpacity>
            </View>
        )
    }
}
