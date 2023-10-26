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

    requestsheader:{
        alignSelf:"center",
        marginTop:10,
        fontSize:17,
        fontWeight:"400"
    },
    requestedbook:{
        alignSelf:"center",
        marginTop:5,
        fontSize:21,
        fontWeight:"500",
        color:"#192A56"
    },
    requestedbookimage:{
        width:120,
        height:160,
        alignSelf:"center",
        borderRadius:10,
        marginTop:5,
    },
    requestercontainer:{
        marginHorizontal:20,
        marginVertical:10,
        backgroundColor:"#FFFFFF",
        padding:10,
        borderRadius:8
    },
    detailrow:{
        flexDirection:"row",
        margin:3,

    },
    label:{
        width:140,
        fontWeight:"500",
        fontSize:16,
        fontStyle:"italic"
    },
    requesterdetail:{
        fontWeight:"400",
        width:155,
        fontSize:16,
    },

    exchangebookcontainer:{
        marginHorizontal:20,
        backgroundColor:"#FFFFFF",
        padding:10,
        borderRadius:8
    },
    requestedbookcontainer:{
        marginHorizontal:20,
        backgroundColor:"#FFFFFF",
        padding:10,
        borderRadius:8
    },
    headerexchangebook:{
        fontWeight:"500",
        fontSize:19,
        marginBottom:10,
        color:"#192A56"
    },

    buttons:{
        flexDirection:"row",
        alignSelf:"center",
        fontSize:16,
        marginVertical:20
    },
    btn:{
        backgroundColor:"#FA7A50",
        width:80,
        padding:10,
        margin:10,
        alignItems:"center",
        borderRadius:5,
     
    },
    btntext:{
        fontSize:16,
        fontWeight:"500",
        color:"white"
    },

    orderStatusAccept:{
        fontSize: 22,
        marginTop: 10,
        marginBottom:20,
        fontWeight:"500",
        color:"green"
        
    },
    orderStatusReject:{
        fontSize: 22,  
        fontWeight:"500",
        color:"red",
        marginTop: 10,
        marginBottom:20,
    },
    statusBar:{
        width:300,
    },

    //confirmation screen styles
    confirmbuttons:{
        flexDirection:"row",
        alignSelf:"center",
        fontSize:16
    },
    confirmbtn:{
        backgroundColor:"#FA7A50",
        width:70,
        padding:8,
        margin:10,
        alignItems:"center",
        borderRadius:5,
     
    },
    confirmbtntext:{
        fontSize:16,
        fontWeight:"500",
        color:"white"
    },
    confirmtext:{
        fontSize:16
    },
    confirmationBox:{
        backgroundColor:"white",
        padding:20,
        width:300,
        borderRadius:10
    }




})

export default styles;