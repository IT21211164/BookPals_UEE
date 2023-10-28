import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header:{
        alignSelf:"center",
        marginTop:40,
        fontSize:22,
        color:"#192A56",
        fontWeight:"500",
        marginBottom:25
    },
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
        padding: "10",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
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


    //CreateExchangeAd screen
    submitbtn:{
        backgroundColor:"#FA7A50",
        width:100,
        padding:10,
        margin:10,
        marginTop:20,
        marginBottom:50,
        alignItems:"center",
        borderRadius:10,
        alignSelf:"center",
    },
    submitbtntext:{
        fontSize:16,
        fontWeight:"500",
        color:"white"
    },
    selectbtn:{
        backgroundColor:"#192A56",
        width:100,
        height:40,
        padding:5,
        margin:3,
        marginTop:3,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
    },
    selectbtntext:{
        fontSize:16,
        fontWeight:"500",
        color:"white"
    },
    bookimage:{
        width:120,
        height:170,
        marginLeft:40,
        borderRadius:6
    },


    //DisplayExchangeAds screen
    adsList:{
        marginTop:20,
    },
    adbox:{
        flexDirection:"row",
        backgroundColor:"rgba(25, 42, 86, 0.3)",
        marginHorizontal:25,
        padding:12,
        borderRadius:8,
        alignItems:"center",
        marginBottom:10
    },
    adimage:{
        width:110,
        height:130,
        borderRadius:10
    },
    addetailsbox:{
        marginLeft:25,
        width:165
    },
    adbooktitle:{
        fontSize:18,
        fontWeight:"500"
    },
    adbookcategory:{
        fontSize:16,
        fontWeight:"500",
        marginTop:5
    },
    viewbtn:{
        backgroundColor:"#FA7A50",
        width:120,
        padding:6,
        borderRadius:6,
        justifyContent:"center",
        alignItems:"center"
    },

    //ExchageAdDetails screen
    buttons:{
        flexDirection:"row",
        alignSelf:"center",
        marginTop:10
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
        color:"white",
        
    },
    confirmtext:{
        fontSize:16,
        marginBottom:10
    },
    confirmationBox:{
        backgroundColor:"white",
        padding:20,
        width:310,
        borderRadius:10
    },
    
    
    

})

export default styles;