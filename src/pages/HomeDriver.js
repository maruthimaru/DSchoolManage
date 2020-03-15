import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,ImageBackground,Dimensions,Image } from 'react-native'
import DriverList from './DriverList'
import CustomerList from './CustomerList'
import { Actions } from 'react-native-router-flux'
import ActionBarImage from '../components/ActionBarImage'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height*(10/30);
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DSchool.db' });
export class HomeDriver extends Component {

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
         customerId:'',
        customerName:'',
        image:'',
    }

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
            customerId:temp[0].trainer_id,
            customerName:temp[0].customer_name,
            image:temp[0].image,
        });
        console.log('loginitem2:', temp[0].customer_id);
          }
        });
              });


}


moveDriverScreen(){
Actions.trainerCustomerList()
}
moveCustomerScreen(){
Actions.currentDayCus()
}
moveAboutUsScreen(){
Actions.aboutUs()
}
    render() {
        return (
            // <ImageBackground style= { styles.backgroundImage } source={require("../images/bg.png")}>
            <View style={styles.viewColor}>
                  {/* <View style={{height:windowHeight,width:windowWidth,backgroundColor: '#5fc25f',}}>

            </View> */}
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
                This is your Id : {this.state.customerId}
            </Text>
  <View style={styles.viewRow}>
            <TouchableOpacity 
            onPress={(this.moveCustomerScreen)}
            style={styles.button}>
                <Text  style={styles.buttonStyle}> Customer Attendance </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={(this.moveDriverScreen)}
            style={styles.button}>
                <Text  style={styles.buttonStyle}> Customer List </Text>
            </TouchableOpacity>
            </View>
             <View style={styles.viewRow}>
            <TouchableOpacity 
            onPress={(this.moveAboutUsScreen)}
            style={styles.button}>
                <Text  style={styles.buttonStyle}> About us </Text>
            </TouchableOpacity>
            </View>
                {/* <TouchableOpacity 
                onPress={(this.moveCustomerScreen)}
                style={styles.button}>
                <Text> Customer </Text>
            </TouchableOpacity> */}
            {/* </ImageBackground> */}
      
            </View>
            
        )
    }
}

const styles=StyleSheet.create({
    viewColor:{
    alignContent:"center",
    justifyContent:"center",
    backgroundColor:"#FFf",
    flex:1
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

  viewRow:{
    // alignContent:"center",
    // justifyContent:"center",
    alignSelf:'center',
    backgroundColor:"#FFf",
    flexDirection:'row',
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
  backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
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
        marginLeft:20,
        alignSelf: 'center',
        borderColor: "#422F86",
        marginBottom: 10,
      },

 textWelcome:{
    fontSize:16,
    textAlign:"left",
    color:"#5fc25f",
    alignSelf: 'center',
    marginLeft:20,
},
textWelcomeBold:{
    fontSize:16,
    textAlign:"left",
    color:"#5fc25f",
    marginLeft:20,
    fontWeight:'bold'
},
})

export default HomeDriver
