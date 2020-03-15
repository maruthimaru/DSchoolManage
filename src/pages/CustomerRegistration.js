import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Button,Alert,
TouchableHighlight,TouchableOpacity,ActivityIndicator,Image,
FlatList,SafeAreaView, ScrollView} from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import { Dropdown } from 'react-native-material-dropdown';
import { Actions } from 'react-native-router-flux'
import UserList from './UserList'
import { openDatabase } from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage'
import ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
var db = openDatabase({ name: 'DSchool.db' });

export class CustomerRegistration extends Component {

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
  
  db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='customer_reg'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS customer_reg', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS customer_reg(user_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
               'user_name VARCHAR(225), age VARCHAR(225), address VARCHAR(225), llr_number VARCHAR(225),'+
               'licence_number VARCHAR(225), phone_number VARCHAR(15),'+
               'status VARCHAR(225), password VARCHAR(255), trainerId VARCHAR(255), selected_slot VARCHAR(255), due_date VARCHAR(25), image VARCHAR(255))',
              []
            );
            console.log("table created")
          }else{
            console.log("already table created")
          }
        }
      );
    });

    this.slotList()
  }
  

    state ={   
      list:[
           {name:"raja"},
           {name:"Sri"},
           {name:"hari"},
           {name:"Ram"},
           {name:"Jp"},
       ],
       userName: '',
       age: '',
       licenceNumber: '',
       phoneNumber: '',
       status: 'active',
       password: '',
       address:'',
       llrNumber:'',
       trainerId: '',
       selectedSlot:'',
       isLoading: true,
       ImageSource: '',
       imgToBase64:"",
       slotdata:[],}

        slotList(){
        console.log(" slot list: ");
        
      db.transaction((txn)=> {
           
        txn.executeSql("SELECT * FROM slot_reg",[],(tx, res)=>{
          console.log('itemslot :', res.rows.length);
          
          if (res.rows.length != 0) {
            var temp = [];
        for (let i = 0; i < res.rows.length; ++i) {
          temp.push({ value: res.rows.item(i).start +"-" +res.rows.item(i).end});
        }
         console.log('tempslot:',temp);
            this.setState({
              isLoading:false,
                animating:false,
          slotdata: temp,
          }); 
          console.log('slotdata:', this.state.slotdata);
          }else{
            console.log("No data slot" )
            console.log( " slotdata " ) 
            this.setState({
          isLoading: true,
            animating:true,
          slotdata: [],
          });
          console.log( " slotdata " + this.state.slotdata) 
          }
        }
      );
              });

      }


  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
               ImgToBase64.getBase64String(response.uri)
  .then(base64String => {
    console.log("base64String");
  console.log(base64String);
  this.setState({
    imgToBase64:base64String,
    ImageSource: source,
    isImage:true,
  });
  })
  .catch(err => doSomethingWith(err));
     

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      }
    });
  }

       //insert
insert=(user_name,age,address,llrNumber,licenceNumber,phoneNumber,status,password,trainerId,selectedSlot)=>{
  console.log("username : "+user_name +"age "+age +" llr "+llrNumber+" licence "+licenceNumber +" phone " 
  +phoneNumber+" status "+status+" pass "+ password+" selectedSlot "+selectedSlot)
  const image=this.state.imgToBase64
       db.transaction((tx)=> {
            tx.executeSql(
              'INSERT INTO customer_reg(user_name, age, address, llr_number,licence_number,phone_number,status,password,trainerId,selected_slot,image) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
              [user_name,age,address,llrNumber,licenceNumber,phoneNumber,status, password,trainerId,selectedSlot,image],
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
                           Actions.customerList() ,
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
      // console.log(this.state.data)

let data = [{
      value: '05-00AM - 06-00AM',
    }, {
      value: '06-00AM - 07-00AM',
    }, {
      value: '07-00AM - 08-00AM',
    }];
    const imageSource=this.state.ImageSource
        return (
      
       <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}> 
            <View style={styles.viewColor}>
           <View  style={styles.image_item}>
              <Text style={styles.textColor}> Customer Registration </Text>
                                <Image
                                 source = { this.state.isImage 
                                  ? 
                                   imageSource
                                  : 
                                  require('../images/avatar_image.png')}
                                style={styles.image}/>
                                {/* <Thumbnail
                                 source = { imageSource }
                                style={styles.image}

                                /> */}
                            <TouchableHighlight
                             style={styles.image_capture} onPress={this.selectPhotoTapped.bind(this)}>   
                              

                            <Text>Take photo</Text>
                            </TouchableHighlight>
                            </View>
             
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Name" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({userName : text})}
                />
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Age" 
                keyboardType={'numeric'}
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({age : text})}
                />
                 <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Address" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({address : text})}
                />
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter LLR Number" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({llrNumber : text})}
                />
              
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Phone Number" 
                placeholderTextColor="#afafaf"
                keyboardType={'numeric'}
                onChangeText={(text) => this.setState({phoneNumber : text})}
                />
                <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Password" 
                placeholderTextColor="#afafaf"
                secureTextEntry={true}
                 onChangeText={(text) => this.setState({password : text})}
                />

                  <TextInput 
                style={styles.textInputStyle} 
                placeholder="Enter Trainer Id" 
                placeholderTextColor="#afafaf"
                onChangeText={(text) => this.setState({trainerId : text})}
                />
{/* 
                 <Dropdown
                 style={{color:'#FFF'}}
        label='Select Slot'
        baseColor='#FFF'
        onChangeText={(text) => this.setState({selectedSlot : text})}
        data={this.state.slotdata}
      /> */}
                  

               {/* {
                this.state.data.map((item, index) => (
                  <TouchableOpacity
                     key = {item}
                     style = {styles.container}
                     onPress = {() =>  Alert.alert(item.message)}>
                     <Text style = {styles.text}>
                        {item.message}
                     </Text>
                  </TouchableOpacity>
               ))
               } */}

                <TouchableOpacity 
                onPress={()=> this.insert(  this.state.userName,this.state.age,this.state.address,this.state.llrNumber,this.state.licenceNumber, 
                this.state.phoneNumber,this.state.status,this.state.password,this.state.trainerId,this.state.selectedSlot) } 
                style={styles.button}>
                <Text style={styles.buttonStyle}>Register</Text>
                </TouchableOpacity>
          </View>
          </ScrollView>  
          </SafeAreaView> 
          
        )
    }
}

const styles=StyleSheet.create({
viewColor:{
    alignContent:"center",
    justifyContent:"center",
    backgroundColor:"#FFFFFF",
    flex:1
},
textColor:{
    fontSize:20,
    textAlign:"center",
    color:"#439243",
    margin:20,
},
textInputStyle:{
    margin:20,
    paddingLeft:5,
    paddingRight:5,
    color:"#439243",
    borderColor:"#dbdbdb",
    borderWidth:0.5,
    borderRadius:10,
    
},
buttonStyle:{

    fontSize:25,
    textAlign:"center",
    color:"#FFFFFF",
    borderWidth:0,
    borderColor:"#FFFFFF"
},
 button: {
    alignItems: 'center',
    backgroundColor: '#5fc25f', 
    height:35,
    margin:20,
    borderRadius:10,

  },
  scrollView: {
     alignContent:"center",
    backgroundColor:"#500077",
  },
    image: {
        // flex:1,
        width: 100,
        height: 100,
        // aspectRatio: 1.5, 
        borderRadius: 150 / 2,
        overflow: "hidden",
        // borderWidth: 1,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderColor: "#422F86",
        marginBottom: 10,
      },
       image_capture: {
        // flex:1,
        width: 100,
        // height: 24,
        // justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf:'center',
        // position: 'absolute',
        bottom:10,
        // aspectRatio: 1.5, 
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        resizeMode: 'cover',
        // alignSelf: 'bottom',
        borderColor: "green",
        marginTop: 10,
      }, 
      image_item: {
        // flex: 1,
        justifyContent: 'flex-end',
        borderColor: "#00000000",
        marginTop:20,
        // alignItems:'center',
        // justifyContent: 'center',
        // paddingBottom: check.isAndroid ? 14 : 0
      },

});

export default CustomerRegistration
