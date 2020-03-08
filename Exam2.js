import React from 'react';
import { View, Text, StyleSheet, ScrollView, ProgressBarAndroid , TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExamList from './ExamList'

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textTop: {
        fontFamily: 'kanitLight',
        textAlign: 'center',
        fontSize: 14,
        color: '#fff'
    },
    perpose: {
        height : '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#2196F3',
        padding:15
    },
    Timmer: {
        height : '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff',
    },
    boxExam: {
        height:'50%',
        backgroundColor:'#fff',
        padding:10
    },
    bottom: {
        height: '5%'
    },
    TextBottom: {
        fontFamily: 'kanitLight',
        fontSize: 12,
        color: '#7A7575',
        textAlign: 'center',
        paddingTop: 10
    },
    bottomNP: {
        height:'20%',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingRight:15,
        paddingLeft:15
    },
    percent: {
        fontFamily: 'kanitRegular',
        fontSize: 28,
        color: '#7A7575',
        textAlign: 'center',
        
    },
    percentSmall:{
        fontFamily: 'kanitLight',
        fontSize: 9,
        color: '#7A7575',
        textAlign: 'center',
        paddingBottom: 10
    },
    circlePercen: {
        flex: 1,
        paddingTop:14,
        paddingLeft:25,
        paddingRight:25
    },
    areaCheckAnswer: {
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttomCheckAnswer:{
        width:'100%',
        alignItems: 'center'
    },
    buttonCheck: {
        fontFamily:'kanitRegular',
        backgroundColor: '#2196F3',
        textAlign:'center',
        width:100,
        fontSize:18,
        padding:4,
        color:'#fff',
    },
    textTime: {
        fontFamily: 'kanitLight',
        textAlign: 'center',
        fontSize: 34,
        color: '#FF6AB2'
    }
});

class Exam extends React.Component{
    state = {
        colorControlNext:'#2196F3',
        statusControlNext: false,
        // ตั้งค่าเริ่มต้นให้ปุ่ม back กดไม่ได้ เพราะเป็นข้อแรกก่อน
        colorControlBack:'#eee',
        statusControlBack: true,
    }

    setArr = (x) => {
        let BF = 0
        if(x === 2) {
            if( this.props.arrPosition === (this.props.examList.length-1)-1){
                this.setState({ colorControlNext :'#eee'})
                this.setState({ statusControlNext : true})
            }
            if(this.props.arrPosition === this.props.examList.length-1) {
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
        if( this.props.arrPosition === (this.props.examList.length-1)-1){
            this.setState({ colorControlNext :'#eee'})
            this.setState({ statusControlNext : true})
        }

        if(this.props.arrPosition === this.props.examList.length-1) {
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
            <View style = { styles.perpose }>
                <Text style = { styles.textTop }><Text style={{textDecorationLine:"underline"}}>คำชี้แจง</Text> ข้อสอบมีทั้งหมด 10 ข้อ เวลาในการทำ 10 นาที</Text>
            </View>
            <View style = { styles.Timmer }>
                <Text style={styles.textTime}>
                    {
                        this.props.minute !== 0 ? this.props.minute +' นาที '+ this.props.sec +' วินาที'
                        : this.props.sec !== 0 ? this.props.sec +' วินาที' : 'หมดเวลา'
                    }
                </Text>
            </View>   
            <View style = { styles.boxExam }>
                <ScrollView>
                    <ExamList 
                        examAll = { this.props.examList[ this.props.arrPosition ] } 
                        number = { this.props.arrPosition + 1 } 
                        setNextQuestion = { this.setNextQuestion }
                    />
                </ScrollView>
            </View>  
            <View style = { styles.areaCheckAnswer }> 
                {this.props.showButtonAnswer === true ?
                    <TouchableOpacity style = { styles.buttomCheckAnswer } onPress={this.props.showScore} >    
                        <Text style = { styles.buttonCheck }>ส่งคำตอบ</Text>
                    </TouchableOpacity>
                :null}
            </View>
            <View style = { styles.bottom }>
                <Text style = { styles.TextBottom }>หมวดวิชาภาค ก</Text> 
            </View>
            <View style = { styles.bottomNP }>
                <TouchableOpacity  onPress={() => this.setArr(1)} disabled={ this.state.statusControlBack }>
                    <Ionicons name="md-arrow-back" size={44} color={this.state.colorControlBack }/>
                </TouchableOpacity > 
                <View style = { styles.circlePercen }>
                    <ProgressBarAndroid
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={ this.props.checkProgress/10 }
                        color="#2196F3"
                    />
                </View>
                <TouchableOpacity  onPress={() => this.setArr(2)} disabled={ this.state.statusControlNext }>
                    <Ionicons name="md-arrow-forward" size={ 44 } color={ this.state.colorControlNext }/>
                </TouchableOpacity >
            </View>
        </View>
        );
    }
}

export default Exam
