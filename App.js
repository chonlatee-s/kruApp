import React from 'react';
import { View, StyleSheet, Modal} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import Welcome from './Welcome'
import SelectMode from './SelectMode'
import Exam from './Exam'
import ShowScore from './ShowScore'
import axios from 'axios'

import {AdMobBanner} from 'expo-ads-admob';
import {BackHandler} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3'
  }
});

export default class App extends React.Component {
  state = {
    loadingFont: true,

    selectTopic: true,
    topic:'0',
    examList:[ { id:'', question:'', ch1: '', ch2: '', ch3:'', ch4:'', answer:'0', reply:'0', check:false, ref:'' }],
    arrPosition : 0,
    score : 0,
    showButtonAnswer:false,
    checkProgress:0,
    showScoreStatus:false,

    checkStartTime:false,
    statusPopup:true,
    statusShowScore:false,
  }
  constructor(props) {
    super(props)
    this._loadingFont = this._loadingFont.bind(this)
  }

  componentDidMount() {
    this._loadingFont()
  }

  async _loadingFont() {
    await Font.loadAsync({
      kanitLight: require('./assets/fonts/Kanit-Light.ttf'),
      kanitMedium: require('./assets/fonts/Kanit-Medium.ttf'),
      kanitBlackItalic: require('./assets/fonts/Kanit-BlackItalic.ttf'),
      kanitRegular: require('./assets/fonts/Kanit-Regular.ttf')
    })

    this.setState({ loadingFont: false })
  }

  getTopic = (topic) => {
    let ExamFromDB = []
    this.setState({ 
      topic: topic, // เซทหัวข้อ
      checkStartTime: true // เริ่มเวลา
      }, () => {// ดึงข้อสอบ
        axios.get(`http://xn--42cm7czac0a7jb0li.com/getExam.php?topic=${topic}`)
        .then((response)=>{
          if(response.data.length === 0) console.log('No Data')
          else{
            response.data.map((item)=>{
              return(
                ExamFromDB.push({ 
                  id: item.id, 
                  question:item.question,
                  ch1:item.ch1,
                  ch2:item.ch2,
                  ch3:item.ch3,
                  ch4:item.ch4,
                  answer:item.answer, 
                  reply:'0', check:false,
                  ref:item.ref
                })
              ) // end return
            })//end map
            this.setState({examList:ExamFromDB} , () => { 
              this.setState({statusPopup:false})
            })
          }
        }).catch((err)=>{
          console.log(err)
        })
    })
  }
  // set ค่าตำแหน่ง array
  setArrPosition = (BF) => {
    this.setState({arrPosition:BF})
  }

  updateProgress = () => {
    let num = 0
    this.state.examList.forEach( (item)=> {
      if(item.reply !== '0') {
        num += 1 
      }
    })
    this.setState({ checkProgress : num})

    if(num === this.state.examList.length) { // หาค่าว่าทำครบหรือยัง จะได้เซทค่าให้ปุ่มคำตอบแสดง
      this.setState({showButtonAnswer:true})
    }
  }


  nextQuestion = (data) => {    
    const examList = [...this.state.examList]
    // หาตำแหน่งที่กดมา
    const newData = examList.findIndex((item) => {
        return item.id === data.id
    })
    // แก้ไขเฉพาะตำแหน่งที่กดมา
    examList[newData] = { 
        id : data.id, 
        question : data.question, 
        ch1 : data.ch1, 
        ch2 : data.ch2, 
        ch3 : data.ch3, 
        ch4 : data.ch4, 
        answer : data.answer, 
        reply : data.reply,
        check : data.check
      } 
    // อัพเดทข้อมูลใหม่
    this.setState({
      examList : examList
    }, () => {
      this.updateProgress()
    })
  }
  
  result = () => {
    let score = 0
    this.state.examList.forEach( (item) => {
        if(item.answer === item.reply) score += 1
    })
    return score
  }
  showScore = () => {
    this.setState({score : this.result()})
    this.setState({showScoreStatus:true})
    this.setState({statusShowScore:true})
    this.resetTime()
  }
  

  beginAgain = () => {
    this.setState({
      examList:[{ id:'', question:'', ch1: '', ch2: '', ch3:'', ch4:'', answer:'', reply:'0', check:false }],
      selectTopic: true,
      topic:'0',
      arrPosition : 0,
      score : 0,
      showButtonAnswer:false,
      checkProgress:0,
      showScoreStatus:false,

      checkStartTime :false,
      statusPopup:true,
      statusShowScore:false,
    })
  }
  resetTime = () => {
    this.setState({checkStartTime:false})
  }
  setStatusShowScore = () => {
    this.setState({statusShowScore:false})
  }
  
  handleBackButton(){
  }

  render() {
    const { loadingFont } = this.state

    if (loadingFont) {
      return <AppLoading />
    }

    return (
      <View style = { styles.container }>
        <Modal visible={ this.state.selectTopic } animationType = "fade">
          <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-5901161227057601/7431599741" // Test ID, Replace with your-admob-unit-id
              testDeviceID="EMULATOR"
              servePersonalizedAds // true or false
              onDidFailToReceiveAdWithError={this.bannerError} />
          <SelectMode 
            getTopic = { this.getTopic }
          />
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-5901161227057601/7431599741" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR"
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={this.bannerError} />
        </Modal>
        <Modal visible = { this.state.topic === '0' ? false : true } animationType = "fade">
          
          <Exam 
            examList = { this.state.examList }
            arrPosition = {this.state.arrPosition}
            setArrPosition = { this.setArrPosition }
            nextQuestion = { this.nextQuestion }
            checkProgress = {this.state.checkProgress}
            showScore = {this.showScore}
            showButtonAnswer =  {this.state.showButtonAnswer}

            topic = {this.state.topic}
            checkStartTime = {this.state.checkStartTime}
            resetTime = {this.resetTime}
            statusPopup = {this.state.statusPopup}

          />
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-5901161227057601/7431599741" // Test ID, Replace with your-admob-unit-id
            testDeviceID="EMULATOR"
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={this.bannerError} />
        </Modal>
        
        <Modal visible = {this.state.showScoreStatus} animationType = "fade">
          <ShowScore 
            score = {this.state.score} 
            exam = {this.state.examList} 
            beginAgain={this.beginAgain}
            statusShowScore={this.state.statusShowScore}
            setStatusShowScore={this.setStatusShowScore}
          />
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-5901161227057601/7431599741"
            testDeviceID="EMULATOR"
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={this.bannerError} />
        </Modal>
      </View>
    );
  }
}

