import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxScore: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        margin:10,
        padding:10
    },
    txtTopScore: {
        color:'#fff',
        fontFamily: 'kanitRegular',
        fontSize: 18,
        textAlign:'center',
        marginBottom:-15,
    },
    txtScore: {
        color:'#fff',
        fontFamily: 'kanitRegular',
        fontSize: 50,
        textAlign:'center',
    },
    txtAnswer: {
        color:'#b7996c',
        fontFamily: 'kanitRegular',
        fontSize: 18,
        textAlign:'center',
        marginBottom:15,
    },
    boxAnswer: {
        height:'73%',
        backgroundColor: '#fdfbf9',
        borderColor:'#b7996c',
        borderLeftWidth:5,
        margin:10,
        padding:10
    },
    question: {
        fontFamily:'kanitRegular',
        fontSize:12,
        color:'#627498',
        marginTop:5
    },
    answer: {
        fontFamily:'kanitLight',
        fontSize:12,
        color:'#b7996c',
    },
    ref: {
        fontFamily:'kanitLight',
        fontSize:10,
        paddingRight:5,
        color:'#b7996c',
    },
    reply: {
        fontFamily:'kanitLight',
        fontSize:12,
        color:'#b7996c',
        margin:0,
        padding:0
    },
    hr: {
        borderBottomColor: '#C7BCBC',
        borderBottomWidth: 0.5,
        opacity: 0.3,
    }
});

export default class Result extends React.Component {
    openWEB = (link) => {
        Linking.openURL(link);
    }
    render() {
        return (
            <View style = { styles.container }>
                <View style = { styles.boxScore }>
                    <Text style = { styles.txtTopScore } >คะแนนรวม</Text>
                    <Text style = { styles.txtScore } >{this.props.score}/10</Text>
                </View>
        
                <View style = { styles.boxAnswer }>                     
                    <ScrollView>
                        <Text style = { styles.txtAnswer } >เฉลยข้อสอบ</Text>
                        {this.props.exam.map((item, index) => {
                            return (
                                <View key = {index}>
                                    {
                                        item.img !== '' ?
                                            <Image
                                                style={{width: 250, height: 150, marginBottom:5, marginTop:5 }}
                                                resizeMode="contain"
                                                source={{ uri: item.img }}
                                            />
                                        :null
                                    }

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
                                        <Text style={styles.answer}><Text style={{textDecorationLine:"underline"}}>เฉลย</Text> {
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
                                        {
                                            item.ref === '' ? null 
                                            :<TouchableOpacity onPress={() => this.openWEB(item.ref)}>
                                                <Text style = { styles.ref }>อ้างอิง</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    <View style = { styles.hr }></View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }
}
