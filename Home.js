import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import {AdMobBanner} from 'expo-ads-admob';
import axios from 'axios'

export default class Home extends React.Component {
    state = {
        txt : "ถิ่นไทยในป่ากว้าง ห่างไกล แสงอารยธรรมใด ส่องบ้าง เห็นเทียนอยู่รำไร เล่มหนึ่ง ครูนั่นแหละอาจสร้าง เสกให้ชัชวาล [ ม.ล.ปิ่น มาลากุล ]",
        linkNews:''
    }
    getNews = () => {
        axios.get('https://xn--42cm7czac0a7jb0li.com/getNews.php')
            .then((res) => {
                this.setState({txt:res.data.news, linkNews:res.data.ref})
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() { // ดึงข้อสอบจากฐานข้อมูล
        this.getNews()
    }

    openNews = (link) => {
        Linking.openURL(link);
    }

    render() {
        return (
            <View style={styles.containerBig}>
                <View style={styles.box}>
                    <Image
                        style={styles.logo}
                        resizeMode="contain"
                        source={require('./assets/home.png')}
                    />
                </View>
                <View style = { styles.boxNews }>
                    {
                        this.state.linkNews === '' ? <Text style = { styles.txtNews } >{this.state.txt}</Text>
                        :<TouchableOpacity onPress={() => this.openNews(this.state.linkNews)}>
                            <Text style = { styles.txtNews } >{this.state.txt}</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.container}>
                        <Text style={styles.txtdonate}>เลี้ยงชานมไข่มุกแอดมิน</Text>
                        <Text style={styles.txtdonate2}>พร้อมเพย์ 082 781 8941 ชลธี สินสาตร์</Text>
                    <View style={styles.line}/>
                    <TouchableOpacity style={styles.btnTest} onPress={() => this.props.navigation.navigate('ทำข้อสอบ')}>
                        <Text style={styles.txtBtn}>ทำข้อสอบ</Text>
                    </TouchableOpacity>
                </View>
                <View style = { styles.menu }>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ข้อตกลงการใช้งาน')}>
                        <Text style={{
                            fontFamily: 'kanitLight',
                            color:'#627498',
                            fontSize: 12,
                            marginTop: 15,
                            textAlign: 'center',
                            marginBottom:10
                        }}>ข้อตกลงการใช้งาน</Text>
                    </TouchableOpacity>
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
    boxNews: {
        backgroundColor: '#b7996c',
        borderRadius: 5,
        margin:20,
        marginBottom:0,
        padding:10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    txtNews: {
        color:'#fff',
        fontFamily: 'kanitLight',
        fontSize: 14,
        textAlign:'center',
    },
    box: {
        alignItems: 'center'
    },
    logo: {
        marginTop: 50,
        width: 99,
        height: 90,
    },
    container: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 5,
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    txtdonate: {
        color: '#fff',
        fontFamily: 'kanitRegular',
        fontSize: 14,
        paddingTop: 15,
        paddingBottom:0,
        textAlign: 'center'
    },
    txtdonate2: {
        color: '#fff',
        fontFamily: 'kanitRegular',
        fontSize: 14,
        paddingTop:0,
        paddingBottom:15,
        textAlign: 'center'
    },
    btnTest: {
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 5,
    },
    txtBtn: {
        color: '#b7996c',
        fontFamily: 'kanitRegular',
        fontSize: 18,
        padding:10
    },
    line: {
        borderBottomColor: '#cfd1cf',
        borderBottomWidth: 0.3,
        marginTop:10,
        marginBottom:10
    },
    menu: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
});
