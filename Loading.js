import React from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid } from 'react-native';

const styles = StyleSheet.create({
    container2: {
        height:'100%',
        zIndex:1,
        flex:1, 
        backgroundColor:'#000000aa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup:{
        backgroundColor:'#fff', 
        margin:50, 
        padding:30,
    },
    textPopup:{
        fontFamily:'kanitRegular',
        fontSize:21,
        color:'#2196F3',
        textAlign: 'center',
    },
    textPopupSmall:{
        paddingTop:10,
        fontFamily:'kanitLight',
        fontSize:10,
        color:'#7A7575',
        textAlign: 'center',
    }
});

class Loading extends React.Component{
    render() {
        return (
        <View style = { styles.container2 }>
            <View style={styles.popup}>
                <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
                <Text style={styles.textPopup}>กรุณารอสักครู่ ระบบกำลังประมวลผล</Text>
                <Text style={styles.textPopupSmall}>หมายเหตุ : หากรอนานเกินไป โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต และเปิดแอปพลิเคชันใหม่</Text>
            </View>
        </View>
        );
    }
}

export default Loading
