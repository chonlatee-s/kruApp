import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Image } from 'react-native';

const styles = StyleSheet.create({
    box: {
        height: '100%',
    },
    question: {
        fontFamily: 'kanitRegular',
        fontSize: 18,
        color: '#fff',
        padding:10,
        backgroundColor:'#2196F3'
    },
    hr: {
        width:'100%',
        borderBottomColor: '#C7BCBC',
        borderBottomWidth: 0.5,
        opacity: 0.3
    },
    img: {
        width:'90%',height:'90%', margin:5
    },
    //// css img ///
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
      button: {
        borderRadius: 5,
        padding: 5,
        elevation: 2,
        borderWidth:1,
        borderColor:'#17a2b8'
      },
      buttonClose: {
        backgroundColor: "#fff",
      },
      textStyle: {
        fontFamily: 'kanitRegular',
        color: "#17a2b8",
        textAlign: "center",
        fontSize: 12,
      },
      boxShowIMG: {
        justifyContent: "center",
        alignItems: "center",
      },
      textShowIMG: {
        fontFamily: 'kanitLight',
        color:'#627498',
        fontSize: 12,
        textAlign: 'center',
        marginBottom:5
      }
});

export default class ExamList extends React.Component {
    state = {
        imgStatus:false
    }
    hideImg = () => { this.setState({imgStatus:false}) }
    showImg = () => { this.setState({imgStatus:true}) }
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
            ref: this.props.examAll.ref,
            img: this.props.examAll.img,
            check: this.props.examAll.answer === ans ? true : false
        }
        this.props.setNextQuestion(data)
    }

    render() {
        let choice1, choice2, choice3, choice4 = {}

        if(this.props.examAll.reply === '1'){
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#eb5749',
                padding:10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
        }else if(this.props.examAll.reply === '2'){
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#eb5749',
                padding:10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
        }else if(this.props.examAll.reply === '3'){
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#eb5749',
                padding:10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
        }else if(this.props.examAll.reply === '4'){
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#eb5749',
                padding:10
            }
        }else{
            choice1 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice2 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice3 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
            choice4 = {
                fontFamily: 'kanitLight',
                fontSize: 16,
                color: '#2196F3',
                padding:10
            }
        }

        return (
            <View style = { styles.box }>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.imgStatus}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Image
                                style={{width: 250, height: 150, marginBottom:5 }}
                                resizeMode="contain"
                                source={{ uri: this.props.examAll.img }}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.hideImg()}
                            >
                            <Text style={styles.textStyle}>ปิดรูป</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                
                {
                    // ปุ่มดูรูป
                    this.props.examAll.img !== '' ?
                        <Pressable onPress={() => this.showImg()} style={styles.boxShowIMG}>
                            <Image
                                style={{ width: 39, height: 39, marginBottom:0 }}
                                resizeMode="contain"
                                source={require('./assets/showIMG.png')}
                            />
                            <Text style={styles.textShowIMG}>แตะเพื่อดูรูป</Text>
                        </Pressable>
                    :null
                }

                <Text style = { styles.question }>ข้อ {this.props.number} {this.props.examAll.question}</Text>
                <View style = { styles.hr }></View>

                <TouchableOpacity onPress = { () => this.getReply('1')} >
                    <Text style = { choice1 }>ก. {this.props.examAll.ch1}</Text>
                </TouchableOpacity>
                <View style = { styles.hr }></View>

                <TouchableOpacity onPress = { () => this.getReply('2')} >
                    <Text style = { choice2 }>ข. {this.props.examAll.ch2}</Text>
                </TouchableOpacity>
                <View style = { styles.hr }></View>

                <TouchableOpacity onPress = { () => this.getReply('3')} >
                    <Text style = { choice3 }>ค. {this.props.examAll.ch3}</Text>
                </TouchableOpacity>
                <View style = { styles.hr }></View>

                <TouchableOpacity onPress = { () => this.getReply('4')} >
                    <Text style = { choice4 }>ง. {this.props.examAll.ch4}</Text>
                </TouchableOpacity>
                <View style = { styles.hr }></View>
            </View>
        );
    }
}
