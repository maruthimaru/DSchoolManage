import React, { Component } from 'react'
import { Text, View,TextInput, TouchableOpacity,StyleSheet,Alert } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';
import { Actions } from 'react-native-router-flux'
import ActionBarImage from '../components/ActionBarImage'

var db = openDatabase({ name: 'DSchool.db' });

export default class SlotNew extends Component {

    static navigationOptions =
   {
      title: 'Home',
 
      headerRight : <ActionBarImage />,
 
      headerStyle: {
 
      backgroundColor: '#FFf'
 
    },
 
    headerTintColor: '#000',
 
   };

   constructor(props) {
     super(props)
  db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='slot_reg'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS slot_reg', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS slot_reg(user_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
               'start VARCHAR(225), end VARCHAR(225))',
              []
            );
            console.log("table created")
          }else{
            console.log("already table created")
          }
        }
      );
    });
   };
   

        state={
            firstSlot:'',
            secoundSlot:'',
        }

        insert=(start,end)=>{
console.log("start "+ start +"end: "+end );

db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO slot_reg(start, end) VALUES (?,?)',
              [start, end],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                           Actions.slotList() ,
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Registration Failed');
                }
              }
            );
          });

        }

    render() {
        return (
            <View style={styles.ViewStyle}>

                <TextInput 
                style={styles.textInputStyle}
                placeholder="Enter Start Time" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => {
                    
                    this.setState({
                        firstSlot : text,
                        })
                }}/>
                <TextInput 
                style={styles.textInputStyle}
                placeholder="Enter End Time" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => {
                    
                    this.setState({
                        secoundSlot : text,
                        })
                }}/>

                <TouchableOpacity  style={styles.button}
                onPress={()=> this.insert(this.state.firstSlot,this.state.secoundSlot)}>
                    <Text>Add</Text>
                </TouchableOpacity>


                
            </View>
        )
    }
}

const styles = StyleSheet.create({

VewStyle:{
flex:1,
justifyContent:'center',
},
textInputStyle:{
    margin:20,
    paddingLeft:5,
    paddingRight:5,
    color:"#000000",
    borderColor:"#dbdbdb",
    borderWidth:0.5,
    
},
button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height:35,
    margin:20,

  },
});
