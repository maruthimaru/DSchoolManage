import React, { Component } from 'react'
import { Text, View,TextInput,TouchableOpacity,StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { openDatabase } from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage'
var db = openDatabase({ name: 'DSchool.db' });

var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var currentDate= date + '-' + month + '-' + year;

export class CurrentDayCus extends Component {

    constructor(props) {
      super(props)

      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM login",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length != 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        this.CurrentList(temp[0].trainer_id)
          }
        });
              });
    };

    CurrentList(trainer_id){
        console.log(" currentDate: "+currentDate);
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM today_customer_reg where trainer_id='"+trainer_id+"' and date='"+currentDate+"'",[],(tx, res)=>{
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

     SearchList(id){
           
        console.log(" currentDate: "+currentDate);

          db.transaction((txn)=> {
           txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='today_customer_reg'",
        [],
        (tx, res)=> {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
           
          }else{
            console.log("already table created")
        
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM today_customer_reg as tcr inner join customer_reg as cr on tcr.user_id = cr.user_id where tcr.user_id="+id +" and tcr.date='"+currentDate+"'",[],(tx, res)=>{
          console.log('item:', res.rows.length);
          
          if (res.rows.length == 0) {
         console.log('Eligible to attend');
          }else{
            console.log("Already attended" )
          }
        }
      );
              });
               }
         }
      );
              });

      }
    

state={
    searchId:'',
}
    render() {
        return (
            <View>

            <TextInput 
            style={styles.textInputStyle}
            onChangeText={(text)=> this.setState({searchId: text})}
            />
            <TouchableOpacity 
            onPress={()=> this.SearchList(this.state.searchId)}
            style={styles.button}>
<Text> Search </Text>
            </TouchableOpacity>
                
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
    button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height:35,
    justifyContent:"center",
    margin:20,

  },
  textInputStyle:{
    margin:20,
    paddingLeft:5,
    paddingRight:5,
    color:"#FFFFFF",
    borderColor:"#dbdbdb",
    borderWidth:0.5,
    
},
})


export default CurrentDayCus
