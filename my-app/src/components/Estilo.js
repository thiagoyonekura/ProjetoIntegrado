import { StyleSheet } from "react-native";

export default StyleSheet.create({
    containerCentralized:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textMedium:{
        fontSize: 35,
        fontWeight: "bold"
    },
    loginContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loginTextInputs:{
        width: 300,
        height: 45,
        marginTop: 20,
        fontSize: 15,
        borderRadius: 30,
        padding: 10,
        paddingLeft: 20,
        color: "#084160",
        borderColor: "#222",
        borderWidth: 1,
        //borderWidth: StyleSheet.hairlineWidth,
    },
    loginForgotPassword:{
        color: 'white',
        marginTop: 25,
        marginBottom: 45
    },
    loginButton:{
        width: 300,
        height: 55,
        backgroundColor: "#3cb371",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    
})