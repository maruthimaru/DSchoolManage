import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Image,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Actions} from 'react-native-router-flux';
import {openDatabase} from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage';
import SendSMS from 'react-native-sms';
var db = openDatabase({name: 'DSchool.db'});
export class HolidayList extends Component {
  static navigationOptions = {
    title: 'Leave',

    headerRight: <ActionBarImage />,

    headerStyle: {
      backgroundColor: '#4b964b',
    },

    headerTintColor: '#fff',
  };

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      backHandler: '',
      dataSource: [],
      isLoading: true,
      animating: true,
      customerList: [],
      numberList: [],
    };

    db.transaction(txn => {
      txn.executeSql('SELECT * FROM holiday_reg', [], (tx, res) => {
        console.log('item:', res.rows.length);

        if (res.rows.length != 0) {
          var temp = [];
          for (let i = 0; i < res.rows.length; ++i) {
            temp.push(res.rows.item(i));
          }
          console.log('temp:', temp);
          this.setState({
            isLoading: false,
            animating: false,
            dataSource: temp,
          });
          console.log('dataSource:', this.state.dataSource);
        } else {
          console.log('No data');
          console.log(' datasource1 ');
          this.setState({
            isLoading: true,
            animating: true,
          });
          console.log(' datasource ' + this.state.dataSource);
        }
      });
    });

    const constThis = this;
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM customer_reg', [], (tx, res) => {
        console.log('item:', res.rows.length);

        if (res.rows.length != 0) {
          var temp = [];
          var numtemp = [];
          for (let i = 0; i < res.rows.length; ++i) {
            temp.push(res.rows.item(i));
            numtemp.push(res.rows.item(i).phone_number);
          }
          console.log('temp:', temp);
          constThis.setState({
            isLoading: false,
            animating: false,
            customerList: temp,
            numberList: numtemp,
          });
          console.log('dataSource:', this.state.dataSource);
        } else {
          console.log('No data');
          console.log(' datasource1 ');
          constThis.setState({
            isLoading: true,
            animating: true,
            customerList: [],
          });
          console.log(' datasource ' + this.state.dataSource);
        }
      });
    });
  }

  //  handleBackPress(backHandler){
  //    console.log("backHandler :" +backHandler);
  //    Actions.userList(onBack=()=>

  //    )
  // return true;
  //  }

  newDriver() {
    Actions.holidayReg();
  }
  editDriver(item) {
    Actions.carUpdate({item: item});
  }

  delete(selecteditem) {
    Alert.alert('Holiday List', 'Are you sure want to Delete?', [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: () => {
          db.transaction(txn => {
            txn.executeSql(
              'DELETE FROM holiday_reg where id=?',
              [selecteditem.id],
              (tx, res) => {
                console.log('item:', res.rows.length);
                const filteredData = this.state.dataSource.filter(
                  item => item.id !== selecteditem.id,
                );
                this.sendSms(
                  'From Driving school, \n Leave has been canceled ' +
                    selecteditem.date,
                );
                this.setState({
                  dataSource: filteredData,
                });
              },
            );
          });
        },
      },
    ]);
  }

  sendSms(message) {
    SendSMS.send(
      {
        //Message body
        body: message,
        //Recipients Number
        recipients: this.state.numberList,
        //An array of types that would trigger a "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  }

  render() {
    const animating = this.state.animating;
    return (
      <View style={styles.viewColor}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.newDriver()}>
                <Text style={styles.buttonStyle}>New leave Add</Text>
              </TouchableOpacity>

              <ActivityIndicator animating={animating} />
              {this.state.dataSource.map((item, index) => (
                <View style={styles.container}>
                  <TouchableOpacity
                    // onPress={() => this.editDriver(item)}
                    style={styles.listStyle}
                    key={item}>
                    {/* <Image
                      style={styles.imageEdit}
                      source={require('../images/edit.png')}
                    /> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.delete(item)}
                    style={styles.listStyleTrash}
                    key={item}>
                    <Image
                      style={styles.imageTrash}
                      source={require('../images/trash.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.text}>{item.date}</Text>
                  <Text style={styles.text}>
                    Reason:
                    {item.reason}
                  </Text>
                </View>
              ))}

              {/* <FlatList
                data={this.state.dataSource}
                renderItem={({item}) =>
                <Text>{item.user_id}</Text>
                }
                keyExtractor={({id}, index) => id}
              /> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewColor: {
    alignContent: 'center',
    // justifyContent:"center",
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  textColor: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  textInputStyle: {
    margin: 20,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
  },
  buttonStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#FFFFFF',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5fc25f',
    height: 35,
    margin: 20,
    borderRadius: 10,
  },
  scrollView: {
    borderColor: '#FFFFFF',
  },
  container: {
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 1,
    padding: 10,
  },
  textDate: {
    textAlign: 'right',
  },

  listStyle: {
    // backgroundColor: Colors.lighter,
    shadowColor: '#d0d0d0',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    // margin: 3,
    // position: 'absolute',
    alignSelf: 'flex-end',
    width: 32,
    height: 24,
    marginRight: 33,
    // padding: 10,
  },
  listStyleTrash: {
    // backgroundColor: Colors.lighter,
    shadowColor: '#d0d0d0',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    // margin: 3,
    position: 'absolute',
    alignSelf: 'flex-end',
    width: 24,
    height: 24,
    top: 10,
    padding: 0,
  },
  imageEdit: {
    width: 24,
    height: 24,
    marginRight: 33,
  },
  imageTrash: {
    width: 24,
    height: 24,
    marginRight: 3,
  },
});

export default HolidayList;
