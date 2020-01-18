import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AddContact from './src/components/AddContact';
import ListContact from './src/components/ListContact';
import GalleryContact from './src/components/GalleryContact';
import DetailContact from './src/components/DetailContact';
import SearchContact from './src/components/SearchContact';

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.viewContact}>
              <Text style={styles.textTitle}>Danh bạ</Text>
            </View>
            <TouchableOpacity
              style={styles.viewImage}
              onPress={() => this.props.navigation.navigate('AddContact')}>
              <Image
                style={{width: 40, height: 40, marginTop: 10}}
                source={{
                  uri: 'https://image.flaticon.com/icons/png/512/60/60740.png',
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <SearchContact {...this.props} />
          </View>
        </View>
        <View style={{backgroundColor: '#ecf0f1', height: 540, marginTop: 30}}>
          <ListContact {...this.props} />
        </View>
      </View>
    );
  }
}

class AddContactScreen extends React.Component {
  render() {
    return (
      <View>
        <AddContact {...this.props} />
      </View>
    );
  }
}

class GalleryContactScreen extends React.Component {
  render() {
    return (
      <View>
        <GalleryContact {...this.props} />
      </View>
    );
  }
}

class DetailContactScreen extends React.Component {
  render() {
    return (
      <View>
        <DetailContact {...this.props} />
      </View>
    );
  }
}

const defaultNavOpts = {headerMode: 'none'};
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    AddContact: AddContactScreen,
    GalleryContact: GalleryContactScreen,
    DetailContact: DetailContactScreen,
  },
  {
    initialRouteName: 'Home',
  },
  defaultNavOpts,
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#bdc3c7',
    flexDirection: 'row',
  },
  textTitle: {
    textAlign: 'center',
    color: '#34495e',
    fontSize: 16,
    marginTop: 20,
  },
  imageAdd: {
    height: 30,
    width: 30,
    marginTop: 15,
  },
  viewContact: {
    width: '90%',
  },
  viewImage: {
    width: '10%',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
