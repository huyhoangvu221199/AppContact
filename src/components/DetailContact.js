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

export default class DetailContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      givenName: '',
      familyName: '',
      phoneNumbers: '',
      contacts: '',
      thumbnailPath: '',
      contacts:'',
    };
  }

  componentDidMount() {
    this.props.navigation.state.params;
    console.log(
      '-------------------data result',
      this.props.navigation.state.params.item,
    );
  }
  loadContacts(){
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {},
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        console.log('ahihihi>>>>', contacts);
        if (err === 'denied') {
          throw err;
        } else {
          this.setState({contacts});
        }
      });
    });
  }

  updateThumb = source => {
    this.setState({thumbnailPath: source});
  };
  handleChangeGivenName = text => {
    this.setState({givenName: text});
  };
  handleChangeFamilyName = text => {
    this.setState({familyName: text});
  };

  updateContactList= () => {
    Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      }
      const phone= [
        {
          id:'0',
          label:'mobile',
          number : this.state.phoneNumbers,
        }
      ]
      var UpdateRecord = contacts[{
        givenName : this.state.givenName,
        familyName : this.state.familyName,
        phoneNumbers : phone,
        thumbnailPath :this.state.thumbnailPath
      }] 
      Contacts.updateContact(UpdateRecord, (err) => {
        if (err) throw err;
        Alert.alert(
          'Thông báo',
          'Cập nhật thành công',
          [{text: 'OK', onPress: () => this.props.navigation.goBack()}],
          {cancelable: false},
        );
        this.loadContacts()
      })
    })
  };

  deleteContactList = () => {
    Contacts.deleteContact(recordID,()=>{
      this.loadContacts();
    })
   
  };

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={styles.textStart}>Hủy</Text>
          </TouchableOpacity>
          <Text style={styles.textTitle}> Chỉnh sửa Liên hệ </Text>
          <TouchableOpacity onPress={this.viewDetailContactList}>
            <Text style={styles.textEnd}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <View data={this.state.contacts} style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <GalleryContact {...this.props} updateThumb={this.updateThumb} />
            <Text style={{textAlign: 'center', marginTop: 45}}> Di Động</Text>
          </TouchableOpacity>
          <View style={styles.viewContainerTextInput}>
            <TextInput
              style={styles.textInputFirstName}
              onSubmitEditing={this.checkSubmitButton}
              placeholder="Họ"
              maxLength={30}
              onChangeText={this.handleChangeText}
              defaultValue={this.props.navigation.state.params.item.givenName}
            />
            <TextInput
              style={styles.textInputLastName}
              onSubmitEditing={this.checkSubmitButton}
              placeholder="Tên"
              maxLength={30}
              onChangeText={this.handleChangeFamilyName}
              defaultValue={this.props.navigation.state.params.item.familyName}
            />
            <TextInput
              keyboardType="numeric"
              onSubmitEditing={this.checkSubmitButton}
              style={styles.textInputPhoneNumbers}
              placeholder="SĐT"
              maxLength={13}
              onChangeText={phoneNumbers => {
                this.setState({phoneNumbers});
              }}
              defaultValue={
                this.props.navigation.state.params.item.phoneNumbers[0].number
              }
            />
          </View>
        </View>
        <View style={styles.viewTouch}>
          <TouchableOpacity
            style={styles.textEditProperty}
            onPress={this.updateContactList}>
            <Text style={{textAlign: 'center', color: '#fff', marginTop: 15}}>
              Cập nhật
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textDeleteProperty}
            onPress={this.deleteContactList}>
            <Text style={{textAlign: 'center', color: '#fff', marginTop: 15}}>
              Xóa
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
  textEditProperty: {
    height: 50,
    width: 120,
    backgroundColor: '#0cadea',
    marginTop: 40,
    borderRadius: 5,
  },
  textDeleteProperty: {
    height: 50,
    width: 120,
    backgroundColor: '#e74c3c',
    marginTop: 40,
    borderRadius: 5,
    marginLeft: 10,
  },
  viewTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    flexDirection: 'row',
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
