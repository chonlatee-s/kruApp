import React from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import Welcome from './Welcome'
import SelectMode from './SelectMode'
import Exam from './Exam'
import ShowScore from './ShowScore'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3'
  }
});

export default class App extends React.Component {
  state = {
    loadingFont: true,

    countDown: true, // เพิ่มขึ้นมา 
    selectTopic: false,
    topic:'0',
    examList:[ { id:'', question:'', ch1: '', ch2: '', ch3:'', ch4:'', answer:'0', reply:'0', check:false }],
    arrPosition : 0,
    score : 0,
    showButtonAnswer:false,
    checkProgress:0,
    showScoreStatus:false,

    checkStartTime:false
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

  CountDown = () => {
    setTimeout(function () {
      this.setState({ countDown: false, selectTopic: true })
    }.bind(this), 3000);
  }

  getTopic = (topic) => {
    this.setState({ 
      // เซทหัวข้อ
      topic: topic
      }, () => {
      // ดึงข้อสอบ
      this.setState({ // เดี๋ยวค่อยเช็คว่าต่อเน็ตหรือไม่ ตอนดึงข้อสอบ
        examList:[
        { id: 1, question:'วันนี้กินอะไรดี', ch1: 'ส้มตำไก่ย่าง', ch2: 'น้ำเต้าหู้นมเนย', ch3:'มะม่วงข้าวเหนียว', ch4:'พิซซ่าหน้าขอบผลไม้', answer:'1', reply:'0', check:false },
        { id: 2, question:'วันจันทร์สีอะไร', ch1: 'แดง', ch2: 'ขาว', ch3:'ดำ', ch4:'น้ำตาล', answer:'2', reply:'0', check:false },
        { id: 3, question:'นกอะไรน่ากลัว', ch1: 'นกกา', ch2: 'นกแก้ว', ch3:'นกเอี้ยง', ch4:'นกเขาไม่ใช่นกเรา', answer:'2', reply:'0', check:false },
        ]})
    })

    this.setState({checkStartTime:true})
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
    this.resetTime()
  }
  

  beginAgain = () => {
    this.setState({
      examList:[{ id:'', question:'', ch1: '', ch2: '', ch3:'', ch4:'', answer:'', reply:'0', check:false }],
      countDown: false,
      selectTopic: true,
      topic:'0',
      arrPosition : 0,
      score : 0,
      showButtonAnswer:false,
      checkProgress:0,
      showScoreStatus:false,

      checkStartTime :false
    })
  }
  resetTime = () => {
    this.setState({checkStartTime:false})
  }

  render() {
    const { loadingFont } = this.state

    if (loadingFont) {
      return <AppLoading />
    }

    if (this.state.countDown === true) this.CountDown()

    return (
      <View style = { styles.container }>
        <Modal visible = { this.state.countDown } animationType = "fade">
          <Welcome />
        </Modal>
        <Modal visible={ this.state.selectTopic } animationType = "fade">
          <SelectMode 
            getTopic = { this.getTopic }
          />
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

            checkStartTime = {this.state.checkStartTime}
            resetTime = {this.resetTime}
          />
        </Modal>

        <Modal visible = {this.state.showScoreStatus} animationType = "fade">
            <ShowScore score = {this.state.score} exam = {this.state.examList} beginAgain={this.beginAgain}/>
        </Modal>

      </View>
    );
  }
}

