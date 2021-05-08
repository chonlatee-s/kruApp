import React from 'react';
import { View, Text, StyleSheet, ScrollView , TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from 'react-native-progress/Bar';
import ExamList from './ExamList'
import Result from './Result'
import {AdMobBanner} from 'expo-ads-admob';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxExam: {
        height:'60%',
        marginBottom:20,
    },
    time: {
        color:'#627498',
        fontFamily:'kanitRegular',
        fontSize:16,
        textAlign:'center',
        marginTop:20,
        marginBottom:10,
    },
    btnNP: {
        height:'20%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    percentBar: {
        marginTop:5,
        paddingLeft:105,
        paddingRight:105,
        color:'#627498',
        fontFamily:'kanitRegular',
        fontSize:18,
        textAlign:'center',
    },
    btnAnswer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom:72,
        borderColor:'#627498',
        borderWidth:1.5
    },
    txtbtnAnswer: {
        color: '#627498',
        fontFamily: 'kanitRegular',
        fontSize: 18,
        paddingLeft:80,
        paddingRight:80,
        padding:10
    },
    areaCheckAnswer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    ////

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'kanitRegular',
        color:'#627498'
      }
});

export default class Exam extends React.Component {
    state = {
        colorControlNext:'#2196F3',
        statusControlNext: false,
        // ตั้งค่าเริ่มต้นให้ปุ่ม back กดไม่ได้
        colorControlBack:'#eee',
        statusControlBack: true,
    }
    setArr = (x) => {
        let BF = 0
        if(x === 2) {
            if( this.props.arrPosition === (this.props.examAll.length-1)-1){
                this.setState({ colorControlNext :'#eee'})
                this.setState({ statusControlNext : true})
            }
            if(this.props.arrPosition === this.props.examAll.length-1) {
                this.setState({ colorControlNext : '#eee'})
                this.setState({ statusControlNext : true})

                this.setState({ colorControlBack :'#2196F3'})
                this.setState({ statusControlBack : false})
            }
            else {//NEXT
                BF = this.props.arrPosition+1
                this.props.setArrPosition(BF)
                this.setState({ colorControlBack :'#2196F3'})
                this.setState({ statusControlBack : false})
            }
        }
        else {
            if( this.props.arrPosition === 1){
                this.setState({ colorControlBack :'#eee'})
                this.setState({ statusControlBack : true})
            }

            if( this.props.arrPosition === 0){
                this.setState({ colorControlBack :'#eee'})
                this.setState({ statusControlBack : true})

                this.setState({ colorControlNext : '#2196F3'})
                this.setState({ statusControlNext : false})
            }else {//BACK
                BF = this.props.arrPosition-1
                this.props.setArrPosition(BF)
                this.setState({ colorControlNext : '#2196F3'})
                this.setState({ statusControlNext : false})
            }
        }
    }
    setNextQuestion = (data) => {
        if( this.props.arrPosition === 1){
            this.setState({ colorControlBack :'#eee'})
            this.setState({ statusControlBack : true})
        }
        if( this.props.arrPosition === (this.props.examAll.length-1)-1){
            this.setState({ colorControlNext :'#eee'})
            this.setState({ statusControlNext : true})
        }

        if(this.props.arrPosition === this.props.examAll.length-1) {
            this.props.nextQuestion(data)
            this.setState({ colorControlNext : '#eee'})
            this.setState({ statusControlNext : true})

            this.setState({ colorControlBack :'#2196F3'})
            this.setState({ statusControlBack : false})
        }else{
            this.props.setArrPosition(this.props.arrPosition+1)
            this.props.nextQuestion(data)
            this.setState({ colorControlBack :'#2196F3'})
            this.setState({ statusControlBack : false})
        }
    }

    render() {
        return (
            <View style = { styles.container }>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.checkDownloadStatus}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ProgressBar indeterminate color='#17a2b8'/>
                            <Text style={styles.modalText}>รอสักครู่ กำลังประมวลผล</Text>
                        </View>
                    </View>
                </Modal>
            {
                // ถ้ายังไม่กดส่งคำตอบ หรือหมดเวลา จะยังไม่แสดงคะแนน
                this.props.showResultPageStatus?
                    <Result 
                        score = {this.props.score} 
                        exam = {this.props.examAll} 
                    />
                : // ทำข้อสอบ
                <View>
                    <View>
                        <Text style={styles.time}>
                            {
                                this.props.minute !== 0 ? this.props.minute +' นาที '+ this.props.sec +' วินาที'
                                : this.props.sec !== 0 ? this.props.sec +' วินาที' : 'หมดเวลา'
                            }
                        </Text>
                    </View>   

                    <View style = { styles.boxExam }>
                        <ScrollView>
                            <ExamList 
                                examAll = { this.props.examAll[this.props.arrPosition] } 
                                number = { this.props.arrPosition + 1 }
                                setNextQuestion = { this.setNextQuestion }
                            />
                        </ScrollView>
                    </View>  
                    <View style = { styles.btnNP }>
                        <TouchableOpacity onPress={() => this.setArr(1)} disabled={ this.state.statusControlBack }>
                            <Ionicons name="md-arrow-back" size={40} color={this.state.colorControlBack }/>
                        </TouchableOpacity > 

                        {this.props.checkProgress*10 === 100 ?
                            <TouchableOpacity style = { styles.btnAnswer } onPress={this.props.showScore} >    
                                <Text style = { styles.txtbtnAnswer }>ตรวจคำตอบ</Text>
                            </TouchableOpacity>
                        :<Text style = { styles.percentBar }>{(this.props.checkProgress*10)} % </Text>}
                        
                        <TouchableOpacity onPress={() => this.setArr(2)} disabled={ this.state.statusControlNext }>
                            <Ionicons name="md-arrow-forward" size={40} color={ this.state.colorControlNext }/>
                        </TouchableOpacity >
                    </View>
                </View>
            }
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-5901161227057601/7431599741"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={this.bannerError} />
        </View>
        );
    }
}
