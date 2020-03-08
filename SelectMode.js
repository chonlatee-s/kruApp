import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    top: {
        height: '30%',
    },
    beforeMiddle: {
        height: '10%',
    },
    middle: {
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor:'#fff',
    },
    textDetailTopic:{
        color:'#2196F3',
        fontSize:24,
        fontFamily: 'kanitLight',
        textAlign:'center'
    },
    textDetail:{
        color:'#7A7575',
        fontSize:14,
        fontFamily: 'kanitLight',
        textAlign:'center'
    },
    menu: {
        width: '45%',
        height: '100%',
        margin:2,
        backgroundColor: '#2196F3',
    },
    menuText: {
        color:'#fff',
        fontSize:100,
        fontFamily: 'kanitLight',
        textAlign:'center'
    }
});

class SelectMode extends React.Component{
    Show = (topic) => {
        this.props.getTopic(topic)
    }
    render() {
        return (
        <View style = { styles.container }>
            <View style = { styles.top }></View>
            <View style = { styles.beforeMiddle }>
                <Text style = { styles.textDetailTopic }>หัวข้อในการสอบ</Text>
                <Text style = { styles.textDetail }>กรุณาเลือกหัวข้อที่ต้องการทดสอบ</Text>
            </View>
            <View style = { styles.middle }>
                <TouchableOpacity style = {styles.menu} onPress = { () => this.Show('1') }>
                    <Text style = { styles.menuText }>ก</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.menu} onPress={ () => this.Show('2') }>
                    <Text style = { styles.menuText }>ข</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}

export default SelectMode
