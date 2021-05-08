import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import {AdMobBanner} from 'expo-ads-admob';

export default class Policies extends React.Component {
    render() {
        return (
            <View style={styles.containerBig}>
                <View style={styles.box}>
                    <Image
                        style={styles.logo}
                        source={require('./assets/home.png')}
                    />
                </View>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.txtPolicy}>
                        แอปพลิเคชันนี้จัดทำขึ้นเพื่อให้เหล่าผู้กล้าที่มาพร้อมกับอุดมการณ์ความเป็นครู ได้ร่วมทดสอบประลองฝีมือ 
                        พร้อมฝึกปรือวิทยายุทธก่อนลงสนามสอบจริง โดยข้อสอบทั้งหมดนี้ได้ถูกผนึกขึ้นมาจากผู้มีประสบการณ์อันแก่กล้าในการสอบครูผู้ช่วยจากทุกสังกัด 
                        </Text>
                        <Text style={styles.txtPolicy}>
                            ทำข้อสอบได้ฟรี ไม่มีค่าใช้จ่ายใด ๆ สามารถร่วมเป็นกำลังใจ และสนับสนุนนักพัฒนา
                            พร้อมเพย์ 082 781 8941 สุดท้ายนี้ขอให้โชคดีมีชัยในการสอบครูผู้ช่วย
                        </Text>
                        <Text style={styles.txtPolicy}>
                            ดาวน์โหลดแนวข้อสอบ หรือฝึกทำข้อสอบออนไลน์ผ่านเว็บไซต์ได้ที่ ครูผู้ช่วย.com
                            หากมีข้อสงสัย คำแนะนำ หรือคำติชมใด ๆ แจ้งได้ที่อีเมล kruchonlatee@gmail.com
                        </Text>
                        <View style={styles.line}/>
                        <Text style={styles.txtPolicy}>
                            แอดมิน
                        </Text>
                    </ScrollView>
                </View>
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-5901161227057601/7431599741"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={this.bannerError} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerBig: {
        flex: 1,
        backgroundColor:'#fdfdfb'
    },
    box: {
        alignItems: 'center'
    },
    logo: {
        marginTop: 50,
        marginTop: 50,
        width: 99,
        height: 90,
    },
    container: {
        height:'50%',
        backgroundColor: '#fdfbf9',
        borderColor:'#b7996c',
        borderLeftWidth:5,
        margin:10,
        padding:10
    },
    txtPolicy: {
        color: '#b7996c',
        fontFamily: 'kanitLight',
        fontSize: 12,
        padding: 5,
    },
    line: {
        borderBottomColor: '#cfd1cf',
        borderBottomWidth: 0.3,
        marginTop:10,
        marginBottom:10
      }
});
