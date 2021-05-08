import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home'
import Policies from './Policies';
import Testing from './Testing';
import Result from './Result';
import ProcessApp from './ProcessApp';

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      kanitLight: require('./assets/fonts/Kanit-Light.ttf'),
      kanitMedium: require('./assets/fonts/Kanit-Medium.ttf'),
      kanitBlackItalic: require('./assets/fonts/Kanit-BlackItalic.ttf'),
      kanitRegular: require('./assets/fonts/Kanit-Regular.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }
  render() {
    const RootStack = createStackNavigator(
      {
        ครูผู้ช่วย: Home,
        ข้อตกลงการใช้งาน: Policies,
        ทำข้อสอบ: Testing,
        เฉลยข้อสอบ: Result
      },
      {
        initialRouteName: 'ครูผู้ช่วย',
      }
    );
    
    const AppContainer = createAppContainer(RootStack);

    if (this.state.fontsLoaded) {
      return <AppContainer />;
    } else {
      return <ProcessApp/>;
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff'
  }
});
