import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { StyleSheet, Text, View} from 'react-native';


export default class ProcessApp extends React.Component {
    render() {
        return (
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ProgressBar indeterminate color='#2196F3'/>
                    <Text style={styles.modalText}>รอสักครู่ กำลังประมวลผล</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
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
        color:'#627498'
      }
});
