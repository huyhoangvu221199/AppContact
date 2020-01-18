import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

export default class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      thumbnailPath: 'null',
      data: '',
    };
  }
  onRefreshContactList = () => {
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
  };
  render() {
    return (
      <FlatList
        onScroll={this.onRefreshContactList}
        data={this.state.contacts}
        extraData={this.state.contacts}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => this.handlePressGoToDetail(item)}
            style={styles.viewSubContainer}>
            <Image
              style={styles.imageAvatar}
              source={{uri: item.thumbnailPath}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.textGivenName}>Họ : {item.givenName}</Text>
              <Text style={styles.textFamilyName}>Tên : {item.familyName}</Text>
              {item.phoneNumbers.map(phone => (
                <Text style={styles.textPhoneNumber}>SĐT: {phone.number}</Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
const styles = StyleSheet.create({
  viewSubContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    margin: 2,
    height: 100,
    width: '99%',
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 25,
  },
  textGivenName: {
    fontSize: 18,
  },
  textFamilyName: {
    fontSize: 18,
  },
  textPhoneNumber: {
    fontSize: 18,
  },
});
