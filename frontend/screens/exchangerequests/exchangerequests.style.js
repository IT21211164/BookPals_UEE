import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        paddingTop: 40,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    screenHeadingContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom:10
    },  
    backBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        padding: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },  
    backIcon: {
        width: 32,
        height: 32
    },   
    screenHeading: {
        marginLeft: 25,
        fontSize: 24,
        fontWeight: "600",
        color: "#192A56"
    },
    subHeading:{
        alignSelf:"flex-start",
        margin:10,
        marginLeft:20,
        color:"#FA7A50",
        fontSize:16,
        fontWeight:"500"
    },

    requestbox:{
        marginHorizontal:18,
        marginVertical:5,
        width:320,
        height:85,
        borderRadius:5,
        backgroundColor:"#D9D9D9",
        padding:8,
        flexDirection:"row"
    },
    requestImage:{
        width:66,
        height:69,
        marginRight:10,
        borderRadius:15,
        borderWidth:2,
        borderColor:"#FA7A50"
    },
    statusnewreq:{
        color:"#192A56",
        fontWeight:"500",
        marginTop:7
    },
    statusacceptreq:{
        color:"#FA7A50",
        fontWeight:"500",
        marginTop:7,
        fontSize:14
    },
    requestname:{
        fontWeight:"500",
        fontSize:16
    },
    requestaddress:{
        color:"#898484",
        fontWeight:"500"
    }

})

export default styles;