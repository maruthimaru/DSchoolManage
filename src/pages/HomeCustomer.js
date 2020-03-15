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
 
      backgroundColor: '#4b964b'
 
    },
 
    headerTintColor: '#fff',
 
   };

   constructor(props) {
     super(props)
   
     this.state = {
        noOfClass:'',
        customerId:'',
        customerName:'',
        image:'',
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
        global.customerId=temp[0].customer_id
        console.log(temp[0]);
        this.setState({
            customerId:temp[0].customer_id,
            customerName:temp[0].customer_name,
            image:temp[0].image,
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
moveQrcode(customerId){
    console.log("customerId "+customerId);
Actions.customerQrcode({customerId:customerId})
}
moveAboutUsScreen(){
Actions.aboutUs()
}
moveLicenceDetailsScreen(){
Actions.licenceDetails()
}
    render() {
        
        return (
            // <ImageBackground style= { styles.backgroundImage } source={require("../images/bg.png")}>
            // {/* <Image source={require("../images/bg.png")} style={{flex:1}}/> */}
            <View style={styles.viewColor}>
              <View  style={styles.image_item}>
                                {/*<Image
                                 source = { item.image
                                  ? 
                               
                                   {uri: `data:image/gif;base64,${item.image}`}
                                  
                                  : 
                                  require('../images/avatar_image.png')}
                                style={styles.image}/>*/}
                               
                                 <Image
                                 source = {{uri: "data:image/png;base64,"+this.state.image}}
                                style={styles.image}/>
                        
                            </View>
            <Text style={styles.textWelcome}>
                Welcome <Text style={styles.textWelcomeBold}>{this.state.customerName}
            </Text></Text>
            <Text style={styles.textWelcome}>
                This is your Customer Id : {this.state.customerId}
            </Text>

<View style={styles.viewRow}>
            <TouchableOpacity 
            onPress={(this.moveDriverScreen)}
            style={styles.button}>
                <Text style={styles.buttonStyle}> Trainer Details </Text>
            </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>this.moveCustomerScreen(this.state.noOfClass)}
                style={styles.button}>
                <Text style={styles.buttonStyle}> Number Of class Attend: {this.state.noOfClass} </Text>
            </TouchableOpacity>
</View>
<View style={styles.viewRow}>
           
                        <TouchableOpacity 
                onPress={()=>this.moveLicenceDetailsScreen(this.state.noOfClass)}
                style={styles.button}>
                <Text style={styles.buttonStyle}> License details</Text>
            </TouchableOpacity>
             <TouchableOpacity 
                // onPress={()=>this.moveQrcode(this.state.customerId)}
                onPress={()=>this.moveAboutUsScreen()}
                style={styles.button}>
                <Text style={styles.buttonStyle}> About us </Text>
            </TouchableOpacity>
            </View>
           {/* <View style={styles.viewRow}>
     <TouchableOpacity 
                onPress={()=>this.moveAboutUsScreen()}
                style={styles.button}>
                <Text style={styles.buttonStyle}> About us</Text>
            </TouchableOpacity>
            </View>
             // </ImageBackgroun
            d> */}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    viewColor:{
    alignContent:"center",
    // justifyContent:"center",
    backgroundColor:"#FFf",
    flex:1,
    paddingTop:10
},
    button: {
    alignItems: 'center',
    backgroundColor: '#5fc25f',
    height:100,
    width:100,
    justifyContent:"center",
    margin:20,
borderRadius:10,
  },
   viewRow:{
    // alignContent:"center",
    // justifyContent:"center",
    alignSelf:'center',
    backgroundColor:"#FFf",
    flexDirection:'row',
},
  textColor:{
    fontSize:15,
    textAlign:"center",
    color:"#FFFFFF"
},
 textWelcome:{
    fontSize:16,
    textAlign:"left",
    alignSelf: 'center',
    color:"#5fc25f",
    marginLeft:20,
},
textWelcomeBold:{
    fontSize:16,
    textAlign:"left",
    color:"#5fc25f",
    marginLeft:20,
    fontWeight:'bold'
},
backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
      buttonStyle:{
    fontSize:16,
    textAlign:"center",
    color:"#fff",
    borderWidth:0,
    borderColor:"#FFFFFF",
    padding: 5,
    // backgroundColor:'#5fc25f',
    
},
image: {
        // flex:1,
        width: 64,
        height: 64,
        // aspectRatio: 1.5, 
        borderRadius: 150 / 2,
        overflow: "hidden",
        // borderWidth: 1,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderColor: "#422F86",
        marginBottom: 10,
      },
})

export default HomeCustomer
