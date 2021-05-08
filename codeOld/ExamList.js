import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';

const styles = StyleSheet.create({
    boxExamInside: {
        height: '100%',
    },
    question: {
        fontFamily: 'kanitRegular',
        fontSize: 20,
        color: '#2196F3',
        padding:5,
        backgroundColor:'#fff0f7'
    },
    choice: {
        fontFamily: 'kanitLight',
        fontSize: 16,
        color: '#7A7575',
        paddingBottom: 10,
        paddingTop: 10
    },
    hr: {
        width:'100%',
        borderBottomColor: '#C7BCBC',
        borderBottomWidth: 0.5,
        opacity: 0.3
    },

});

class Exam extends React.Component{
    getReply = (ans) => {
        const data =  {
            id : this.props.examAll.id,
            question : this.props.examAll.question,
            ch1 : this.props.examAll.ch1, 
            ch2 : this.props.examAll.ch2, 
            ch3 : this.props.examAll.ch3, 
            ch4 : this.props.examAll.ch4, 
            answer : this.props.examAll.answer, 
            reply : ans,
            check: this.props.examAll.answer===ans?true:false
        }
        this.props.setNextQuestion(data)
    }
    render() {
        let choice1, choice2, choice3, choice4 = {}

        if(this.props.examAll.reply === '1'){
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#FF6AB2',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
        }else if(this.props.examAll.reply === '2'){
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#FF6AB2',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
        }else if(this.props.examAll.reply === '3'){
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#FF6AB2',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
        }else if(this.props.examAll.reply === '4'){
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#FF6AB2',
                paddingBottom: 10,
                paddingTop: 10
            }
        }
        else{
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#7A7575',
                paddingBottom: 10,
                paddingTop: 10
            }
        }

        return (
            <View style = { styles.boxExamInside }>
                <Text style = { styles.question }> ข้อ {this.props.number} {this.props.examAll.question}</Text>
                <View style = { styles.hr }></View>

                <TouchableOpacity onPress = { () => this.getReply('1') }>
                    <Text style = { choice1 }> ก. {this.props.examAll.ch1}</Text>
                </TouchableOpacity>
                <View style = { styles.hr }></View>

                <TouchableOpacity onPress = { () => this.getReply('2') }>
                    <Text style = { choice2 }> ข. {this.props.examAll.ch2}</Text>
                </TouchableOpacity>
                <View style = { styles.hr }></View>

                <TouchableOpacity onPress = { () => this.getReply('3') }>
                    <Text style = { choice3 }> ค. {this.props.examAll.ch3}</Text>
                </TouchableOpacity>
                <View style = { styles.hr }></View>

                <TouchableOpacity onPress = { () => this.getReply('4') }>
                    <Text style = { choice4 }> ง. {this.props.examAll.ch4}</Text>
                </TouchableOpacity>
                <View style = { styles.hr }></View>
            </View>
        );
    }
}

export default Exam
