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

    column:{
        marginTop: 0,
        borderRadius: 5,
        marginLeft: 3,
        height: 40,
        width: 78,
        paddingTop:10,
        marginBottom: 10,
        backgroundColor:"#192A56"
    },
    columntext:{
        textAlign:"center",
        fontWeight:"500",
        color:"white"
    },

    requestbox:{
        marginHorizontal:18,
        marginVertical:5,
        width:320,
        height:86,
        borderRadius:5,
        backgroundColor:"#D9D9D9",
        padding:8,
        flexDirection:"row"
    },
    requestImage:{
        width:62,
        height:66,
        marginRight:15,
        borderRadius:5,
    },
    statusnewreq:{
        color:"#192A56",
        fontWeight:"500",
        marginTop:7,
        fontSize:15
    },
    statusacceptreq:{
        color:"#FA7A50",
        fontWeight:"500",
        marginTop:7,
        fontSize:15
    },  
    statusrejectreq:{
        color:"#696969",
        fontWeight:"500",
        marginTop:7,
        fontSize:15
    },
    requestname:{
        fontWeight:"500",
        fontSize:17
    },
    requestaddress:{
        color:"black",
        fontWeight:"400"
    },

})

export default styles;