import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,Image,ImageBackground } from 'react-native'
import DriverList from './DriverList'
import CustomerList from './CustomerList'
import { Actions } from 'react-native-router-flux'
import ActionBarImage from '../components/ActionBarImage'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DSchool.db' });
export class HomeCustomer extends Component {

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
   
     this.state = {
        noOfClass:'',
        customerId:'',
     };
     var constThis=this

     db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM login",[],(tx, res)=>{
          console.log('loginitem:', res.rows.length);
          
          if (res.rows.length > 0) {
              console.log('loginitem1:', res.rows.length);
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }                
        this.setState({
            customerId:temp[0].customer_id
        });
        console.log('loginitem2:', temp[0].customer_id);
        constThis.CurrentList(temp[0].customer_id)
          }
        });
              });

   };


    CurrentList(UserId){
        console.log(" currentDate: " + "trainer_id "+UserId);
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM today_customer_reg where user_id='"+UserId+"'",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          this.setState({
              noOfClass:res.rows.length,
          });
        }
      );
              });

      }
   


moveDriverScreen(){
Actions.trainerDetails()
}
moveCustomerScreen(customerId){
    console.log("customerId "+customerId);
Actions.customerAttendance()
}
    render() {
        return (
            <ImageBackground style= { styles.backgroundImage } source={require("../images/bg.png")}>
            {/* <Image source={require("../images/bg.png")} style={{flex:1}}/> */}
            <Text style={styles.textColor}>
                Customer Id : {this.state.customerId}
            </Text>


            <TouchableOpacity 
            onPress={(this.moveDriverScreen)}
            style={styles.button}>
                <Text> Trainer Details </Text>
            </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>this.moveCustomerScreen(this.state.noOfClass)}
                style={styles.button}>
                <Text> Number Of class Attend: {this.state.noOfClass} </Text>
            </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles=StyleSheet.create({
    viewColor:{
    alignContent:"center",
    justifyContent:"center",
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
  textColor:{
    fontSize:25,
    textAlign:"center",
    color:"#FFFFFF"
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

export default HomeCustomer
