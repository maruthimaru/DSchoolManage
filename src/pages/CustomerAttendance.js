import React, { Component } from 'react'
import { Text, View,TextInput,TouchableOpacity,StyleSheet,Alert,ActivityIndicator } from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux'
import { openDatabase } from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage'
import moment from 'moment';
var db = openDatabase({ name: 'DSchool.db' });

// var date = new Date().getDate();
//       var month = new Date().getMonth() + 1;
//       var year = new Date().getFullYear();
//       var currentDate= date + '-' + month + '-' + year;

        //Getting the current date-time with required formate and UTC   
    var currentDate = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD');

      var currentTime = moment()
      .utcOffset('+05:30')
      .format('hh:mm a');

export class CustomerAttendance extends Component {

    constructor(props) {
      super(props)

      this.state={
    searchId:'',
    trainerId:'',
    animating:true,
    dataSource:[],
}

//getting data from the login
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM login",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        this.setState({
          trainerId:temp[0].trainer_id,
        })
        this.CurrentList(temp[0].customer_id)
          }
        });
              });
    };

    CurrentList(trainer_id){
        console.log(" currentDate: "+currentDate + "trainer_id "+trainer_id);
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM today_customer_reg where user_id='"+trainer_id+"'",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
         console.log('temp:',temp);
            this.setState({
              isLoading:false,
                animating:false,
          dataSource: temp,
          }); 
          console.log('dataSource:', this.state.dataSource);
          }else{
            console.log("No data" )
            console.log( " datasource1 " ) 
            this.setState({
          isLoading: true,
            animating:true,
          dataSource: [],
          });
          console.log( " datasource " + this.state.dataSource) 
          }
        }
      );
              });

      }

    
    render() {
      const animating = this.state.animating
        return (
            <View>

             <ActivityIndicator animating={animating}/>
        {this.state.dataSource.map((item, index) => (
              <TouchableOpacity
              style = {styles.listStyle}
                key = {item}
                onPress = {() =>  this.update(item)}>
                <View style = {styles.container}>
                <Text style = {styles.text}>
                    {item.user_name}
                </Text>
                <Text style = {styles.text}>
                    {item.address}
                </Text>
                <Text style = {styles.text}>Trainer Id : 
                    {item.trainerId}
                </Text>
                <Text style = {styles.text}>Ph:
                    {item.phone_number}
                </Text>
                <Text style = {styles.textDate}>Date: {item.date}
                </Text>
                <Text style = {styles.textDate}>Training: {item.start} - {item.end}
                </Text>
                </View>
              </TouchableOpacity>
          ))
        }
                
            </View>
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
textColor:{
    fontSize:25,
    textAlign:"center",
    color:"#FFFFFF"
},
textInputStyle:{
    margin:20,
    paddingLeft:5,
    paddingRight:5,
    color:"#000000",
    borderColor:"#a6a6a6",
    borderWidth:1,
    
},
buttonStyle:{

    fontSize:25,
    textAlign:"center",
    color:"#000",
    borderWidth:0,
    borderColor:"#FFFFFF"
},
 button: {
   justifyContent:"center",
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height:35,
    margin:20,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container:{
    backgroundColor: Colors.lighter,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
paddingLeft:5,
paddingRight:5,
  },
  textDate:{
     textAlign:"right",
  },

listStyle:{
    backgroundColor: Colors.lighter,
    shadowColor: "#d0d0d0",
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 2,
margin:3,
  },
});


export default CustomerAttendance
