import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
export default class SearchContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        contacts :[]
    };
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
            Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
                this.setState({ contacts });
              });
        }
      });
    });
  } 

  searchText=(text)=>{
         console.log("------------->>>text",text);   
      if(text==='' || text === null){
            this.loadContacts();
      }else{     
      }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
         placeholder="Search,..."></TextInput>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 50,
  },
});
