import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    top: {
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    middle: {
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textDetailTopic:{
        color:'#2196F3',
        fontSize:20,
        fontFamily: 'kanitMedium',
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
        fontSize:65,
        fontFamily: 'kanitLight',
        textAlign:'center'
    },
    boxAnswer: {
        height: '55%',
        marginTop:5,
        backgroundColor: '#fff',
    },
    bottom: {
        height: '10%',
    },
    boxInside:{
        height:'100%',
        padding:15,
    },

    question:{
        fontFamily: 'kanitLight',
        fontSize: 16,
        color:'#7A7575',
        paddingTop:5,
    },
    reply:{
        fontFamily: 'kanitLight',
        fontSize: 14,
        color:'#7A7575',
    },
    answer:{
        fontFamily: 'kanitLight',
        fontSize: 14,
        color:'#FF6AB2'
    },
    hr: {
        width:'100%',
        borderBottomColor: '#C7BCBC',
        borderBottomWidth: 0.5,
        opacity: 0.3,
    },
    head:{
        paddingTop:4,
        textAlign:'center',
        fontFamily: 'kanitLight',
        fontSize: 14,
        color:'#fff'
    },
    again:{
        height:'5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnAgain: {
        fontFamily:'kanitRegular',
        backgroundColor: '#2196F3',
        textAlign:'center',
        width:100,
        fontSize:18,
        padding:4,
        color:'#fff',
    },
    ad:{
        height:'5%',
        textAlign:'center',
        justifyContent: 'center',
    },
    textDetail:{
        color:'#7A7575',
        fontSize:12,
        fontFamily: 'kanitLight',
        textAlign:'center'
    },
    

});

class ShowScore extends React.Component{
    render() {
        return (
        <View style = { styles.container }>
            <View style = { styles.top }>
                <Text style = { styles.textDetailTopic }>สรุปผลการทดสอบ</Text>
            </View>
            <View style = { styles.middle }>
                <View style = {styles.menu} >
                    <Text style = {styles.head}>คะแนนที่ได้</Text>
                    <Text style = { styles.menuText }>{this.props.score}</Text>
                </View>
                <View style = {styles.menu} >
                    <Text style = {styles.head}>คะแนนเต็ม</Text>
                    <Text style = { styles.menuText }>{this.props.exam.length}</Text>
                </View>
            </View>
            <View style = { styles.boxAnswer }>
                <ScrollView>
                    <View style = {styles.boxInside}>
                        {this.props.exam.map((item, index) => {
                            return (
                                <View key = {index}>
                                    <Text style={styles.question}>ข้อ {index+1} {item.question}</Text>
                                    <Text style={styles.reply}>
                                        <Text style={{textDecorationLine:"underline"}}>ตอบ</Text> 
                                    {
                                        item.reply==='1' ?  ' '+item.ch1 :
                                        item.reply==='2' ?  ' '+item.ch2 :
                                        item.reply==='3' ?  ' '+item.ch3 : 
                                        item.reply==='4' ?  ' '+item.ch4 : ' ไม่ได้ตอบคำถาม'
                                    }
                                    </Text>
                                    { 
                                        item.check===true ? null : 
                                        <Text style={styles.answer}>เฉลย {
                                            item.answer==='1' ? item.ch1 :
                                            item.answer==='2' ? item.ch2 :
                                            item.answer==='3' ? item.ch3 : item.ch4
                                        }</Text>
                                    }
                                    <View style={{flexDirection:'row-reverse'}}>
                                        {
                                            item.check===true ? <Ionicons name="md-checkmark" size={ 14 } color="#7A7575"/> 
                                            :<Ionicons name="md-close" size={ 14 } color="#7A7575"/> 
                                        }
                                    </View>
        
                                    <View style = { styles.hr }></View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.ad}><Text style = { styles.textDetail }>ทำแบบทดสอบผ่านเว็บไซต์ได้ที่ <Text style={{color:'#FF6AB2'}}>ครูผู้ช่วย.com</Text> </Text></View>
            <View style = { styles.again }>
                <TouchableOpacity style = { styles.buttomCheckAnswer } onPress = {this.props.beginAgain}>    
                    <Text style = { styles.btnAgain }>ลองอีกครั้ง</Text>
                </TouchableOpacity>
            </View>
            <View style = { styles.bottom }></View>
        </View>
        );
    }
}

export default ShowScore
