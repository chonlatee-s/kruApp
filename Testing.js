import React from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios'
import Exam from './Exam'

export default class Testing extends React.Component {
    state = {
        examAll:[ { id:'', question:'', ch1: '', ch2: '', ch3:'', ch4:'', answer:'0', reply:'0', check:false, ref:'', img:'' }],
        arrPosition : 0,
        checkProgress: 0,
        score:0,
        showResultPageStatus:false,
        checkDownloadStatus:true,

        minute:10,
        sec:0
    }

    // TIMEMER
    startTimer = () => {
        this.clockCall = setInterval(() => {
            this.decrementClock()
        }, 1000);
    }
    
    decrementClock = () => {
        if (this.state.sec !== 0) {
            this.setState({ sec: this.state.sec - 1 })
        }
        else {
            if (this.state.minute === 0) {
                clearInterval(this.clockCall)
                // ถ้าหมดเวลา
                this.showScore()
            }
            else {
                this.setState({ minute: this.state.minute - 1 })
             this.setState({ sec: 60 })
            }
        }
    }
    componentWillUnmount() {
        clearInterval(this.clockCall);
    }

    getExam = () => {
        let examDB = []
        axios.get(`https://xn--42cm7czac0a7jb0li.com/getExamsApp.php`)
            .then((response) => {
                if (response.data.length === 0) console.log('No Data')
                else {
                    response.data.map((item) => {
                        return (
                            examDB.push({
                                id: item.id,
                                question: item.question,
                                ch1: item.ch1,
                                ch2: item.ch2,
                                ch3: item.ch3,
                                ch4: item.ch4,
                                answer: item.answer,
                                reply: '0', 
                                check: false,
                                ref: item.ref,
                                img: item.img
                            })
                        )
                    })
                    this.setState({
                        examAll: examDB, checkDownloadStatus:false, minute:9, sec:59
                    }, () => {
                        this.startTimer()
                    })
                    
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    setArrPosition = (BF) => {
        this.setState({arrPosition:BF})
    }
    nextQuestion = (data) => {    
        const examAllNew = [...this.state.examAll]
        // หาตำแหน่งที่กดมา
        const newData = examAllNew.findIndex((item) => {
            return item.id === data.id
        })
        // แก้ไขเฉพาะตำแหน่งที่กดมา
        examAllNew[newData] = { 
            id : data.id, 
            question : data.question, 
            ch1 : data.ch1, 
            ch2 : data.ch2, 
            ch3 : data.ch3, 
            ch4 : data.ch4, 
            answer : data.answer, 
            reply : data.reply,
            ref: data.ref,
            img: data.img,
            check : data.check
          } 
        // อัพเดทข้อมูลใหม่
        this.setState({
            examAll : examAllNew
        }, () => {
            this.updateProgress()
        })
    }

    updateProgress = () => {
        let num = 0
        this.state.examAll.forEach( (item)=> {
          if(item.reply !== '0') {
            num += 1 
          }
        })
        this.setState({ checkProgress : num})
    }

    result = () => {
        let score = 0
        this.state.examAll.forEach( (item) => {
            if(item.answer === item.reply) score += 1
        })
        return score
    }
    showScore = () => {
        this.setState({ score : this.result(), showResultPageStatus:true })
    }

    componentDidMount() {
        this.getExam()
    }


    render() {
        return (
            <View style={styles.containerBig}>
                <Exam 
                    examAll = { this.state.examAll} 
                    arrPosition = {this.state.arrPosition}
                    setArrPosition = { this.setArrPosition }
                    nextQuestion = { this.nextQuestion }
                    checkProgress = {this.state.checkProgress}
                    showScore = {this.showScore}
                    showResultPageStatus = {this.state.showResultPageStatus}
                    score = {this.state.score}
                    checkDownloadStatus = {this.state.checkDownloadStatus}

                    sec = {this.state.sec}
                    minute = {this.state.minute}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerBig: {
        flex: 1,
        backgroundColor:'#fff'
    }
});
