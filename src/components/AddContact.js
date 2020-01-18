import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Contacts from 'react-native-contacts';
import GalleryContact from './GalleryContact';

export default class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      givenName: '',
      familyName: '',
      phoneNumbers: '',
      thumbnailPath: '',
    };
  }
  addContactList = () => {
    const phone = [
      {
        id: '0',
        label: 'mobile',
        number: this.state.phoneNumbers,
      },
    ];
    var AddNewPersonal = {
      givenName: this.state.givenName,
      familyName: this.state.familyName,
      phoneNumbers: phone,
      thumbnailPath: this.state.thumbnailPath,
    };
    console.log('params>>>', AddNewPersonal);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
    }).then(() => {
      Contacts.addContact(AddNewPersonal, err => {
        if (err) {
          throw err;
        } else if (
          this.state.givenName == '' ||
          this.state.familyName == '' ||
          this.state.phoneNumbers == ''
        ) {
          Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
        } else {
          Alert.alert(
            'Thông báo',
            'Thêm người dùng thành công',
            [{text: 'OK', onPress: () => this.props.navigation.goBack()}],
            {cancelable: false},
          );
        }
      });
    });
  };
  updateThumb = source => {
    this.setState({thumbnailPath: source});
  };
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={styles.textStart}>Hủy</Text>
          </TouchableOpacity>
          <Text style={styles.textTitle}>Liên hệ mới</Text>
          <TouchableOpacity onPress={this.addContactList}>
            <Text style={styles.textEnd}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <GalleryContact {...this.props} updateThumb={this.updateThumb} />
            <Text style={{textAlign: 'center', marginTop: 45}}> Di Động</Text>
          </TouchableOpacity>
          <View
            onPress={this.checkSubmitButton}
            style={styles.viewContainerTextInput}>
            <TextInput
              style={styles.textInputFirstName}
              onSubmitEditing={this.checkSubmitButton}
              placeholder="Họ"
              maxLength={15}
              onChangeText={givenName => {
                this.setState({givenName});
              }}
              value={this.state.givenName}
            />
            <TextInput
              style={styles.textInputLastName}
              onSubmitEditing={this.checkSubmitButton}
              placeholder="Tên"
              maxLength={30}
              onChangeText={familyName => {
                this.setState({familyName});
              }}
              value={this.state.familyName}
            />
            <TextInput
              keyboardType="numeric"
              onSubmitEditing={this.checkSubmitButton}
              style={styles.textInputPhoneNumbers}
              placeholder="SĐT"
              maxLength={10}
              onChangeText={phoneNumbers => {
                this.setState({phoneNumbers});
              }}
              value={this.state.phoneNumbers}
            />
          </View>
        </View>
        <View style={styles.viewTouch}>
          <TouchableOpacity
            style={styles.textAddProperty}
            onPress={this.addContactList}>
            <Text style={{textAlign: 'center', color: '#fff', marginTop: 10}}>
              Thêm trường
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#bdc3c7',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitle: {
    marginTop: 20,
    textAlign: 'center',
    color: '#34495e',
    fontSize: 16,
  },
  textStart: {
    color: '#0cadea',
    margin: 20,
  },
  textEnd: {
    color: '#0cadea',
    margin: 20,
  },
  imageAdd: {
    height: 60,
    width: 60,
    borderRadius: 30,
    padding: 10,
    margin: 20,
  },
  textAddProperty: {
    height: 50,
    width: 120,
    backgroundColor: '#0cadea',
    marginTop: 40,
    borderRadius: 5,
  },
  viewTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  textInputPhoneNumbers: {
    height: 60,
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 5,
  },
  textInputLastName: {
    height: 60,
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 5,
  },
  textInputFirstName: {
    height: 60,
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 5,
    marginLeft: 5,
  },
  viewContainerTextInput: {
    flexDirection: 'column',
    marginLeft: 50,
    width: 200,
  },
});
