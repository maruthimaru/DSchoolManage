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
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Actions} from 'react-native-router-flux';
import UserList from './UserList';
import {openDatabase} from 'react-native-sqlite-storage';
import ActionBarImage from '../components/ActionBarImage';
import SendSMS from 'react-native-sms';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
var db = openDatabase({name: 'DSchool.db'});
var item;
export class HolidayReg extends Component {
  static navigationOptions = {
    title: 'Home',

    headerRight: <ActionBarImage />,

    headerStyle: {
      backgroundColor: '#4b964b',
    },

    headerTintColor: '#fff',
  };

  state = {
    list: [
      {name: 'raja'},
      {name: 'Sri'},
      {name: 'hari'},
      {name: 'Ram'},
      {name: 'Jp'},
    ],
    date: moment(new Date()).format('YYYY-MM-DD'),
    reason: '',
    isLoading: true,
    customerList: [],
    numberList: [],
  };

  constructor(props) {
    super(props);
    // console.log('props');
    // console.log(props);

    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='holiday_reg'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS driver_reg', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS holiday_reg(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'date VARCHAR(225), reason VARCHAR(225))',
              [],
            );
            console.log('table created');
          } else {
            console.log('already table created');
          }
        },
      );
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
            dataSource: [],
          });
          console.log(' datasource ' + this.state.dataSource);
        }
      });
    });
  }

  componentWillMount() {
    item = this.props.item;
    console.log('item');
    console.log(item);
    if (item != null) {
      console.log(item);
      this.setState({
        date: item.date,
        reason: item.reason,
      });
    }
  }

  //insert
  insert = (user_name, number) => {
    var context = this;
    console.log('username : ' + user_name + ' pass ' + number);
    db.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO holiday_reg(date, reason) VALUES (?,?)',
        [user_name, number],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    context.sendSms(
                      'From Driving school, \n Leave on ' + user_name,
                    );
                    Actions.holidayList();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Registration Failed');
          }
        },
      );
    });
  };

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
    // console.log(this.state.data)

    return (
      <View style={styles.viewColor}>
        <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.viewColor}>
              <Text style={styles.textColor}> Leave </Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={this.state.date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({date: date});
                }}
              />
              {/* <TextInput
                style={styles.textInputStyle}
                placeholder="Enter Date"
                placeholderTextColor="#afafaf"
                value={this.state.userName}
                onChangeText={text => this.setState({date: text})}
              /> */}
              <TextInput
                style={styles.textInputStyle}
                placeholder="Enter Reason"
                placeholderTextColor="#afafaf"
                value={this.state.number}
                onChangeText={text => this.setState({reason: text})}
              />

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
                onPress={() => this.insert(this.state.date, this.state.reason)}
                style={styles.button}>
                <Text style={styles.buttonStyle}>Register</Text>
              </TouchableOpacity>
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
    justifyContent: 'center',
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
    color: '#439243',
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  buttonStyle: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#FFFFFF',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5fc25f',
    height: 35,
    margin: 20,
    borderRadius: 10,
  },
  scrollView: {
    borderColor: '#FFFFFF',
  },
});

export default HolidayReg;
