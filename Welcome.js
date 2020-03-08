import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: '60%', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  },
  Logo:{
    width: 150,
    height: 150,
  },
  middle: {
    height: '20%',
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bar: {
    height: '20%',
    backgroundColor: '#2196F3',

  },
  welcome: {
    paddingTop:20,
    color: '#fff',
    fontSize: 36,
    fontFamily: 'kanitMedium'
  },
  welcomeDetail: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'kanitRegular'
  }

});

class Welcome extends React.Component{
  render() {
    return (
      <View>
        <View style = { styles.top }>
            <Image
              style = { styles.Logo }
              source = { require('./assets/logo.png')}
            />
            <Text style = { styles.welcome }>ครูผู้ช่วย</Text>
            <Text style = { styles.welcomeDetail }>แนวข้อสอบครูผู้ช่วยทุกสังกัด</Text>
        </View>
        <View style = { styles.middle }>
        </View>
        <View style = { styles.bar }></View>
      </View>
    );
  }
}

export default Welcome
