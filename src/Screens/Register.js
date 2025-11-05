import React, {Component} from "react";
import { View, Text, Pressable, TextInput  } from "react-native";
import { StyleSheet} from "react-native"
import { auth } from "../fireBase/Config"
class Register extends Component{
    constructor(props) {
        super(props);
        this.state ={
            email: "",
            password: "",
            userName:"",
            registered: false,
            error: ""
        }
    }
    register(email, pass){
   auth.createUserWithEmailAndPassword(email, pass)
    .then( response => {
        this.setState({registered: true});
        this.props.navigation.navigate("Login");
     })
    .catch( error => {
      this.setState({error: 'Fallo en el registro.'})
    })
 }
    onSubmit = () => {
        console.log("Email:", this.state.email);
        console.log("Password:", this.state.password);
         console.log("Password:", this.state.userName);
        this.register(this.state.email, this.state.password, this.state.userName);
    }
     render(){
            return(
                <View style={styles.contenedor}>
                    <Text style={styles.titulo}>Registrarse</Text>
                    <Text>Esta es la pantalla donde debe ir el formulario de login. Navegación cruzada a Register</Text>
                    <Pressable  onPress={
                        () => this.props.navigation.navigate("Login")}>
                    <Text style={styles.login}>
                    No tengo cuenta
                    </Text>
                    </Pressable>
                    <Text>Navegación cruzada a ingresar a la app. Este paso se hará automaticamente cuando veamos la funcionalidad de login</Text>
                    <Pressable onPress={
                        () => this.props.navigation.navigate("HomeMenu")}>
                    <Text style={styles.app}>Ir a la app</Text>
                    </Pressable>
                    <TextInput  style={styles.input}
                        keyboardType="email-address"
                        placeholder="email"
                        onChangeText={text => this.setState({email: text})}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        placeholder="userName"
                        onChangeText={text => this.setState({userName: text})}
                        value={this.state.userName}
                     />
                    <TextInput style={styles.input}
                        keyboardType="default"
                        placeholder="password"
                        secureTextEntry= {true}
                        onChangeText={text => this.setState({password: text})}
                        value={this.state.password}
                     />
                    <Pressable onPress={() => this.onSubmit()} style={styles.boton}>
                        <Text style={styles.texto}>Enviar</Text>
                    </Pressable>
                </View>
            )
        }
}
const styles = StyleSheet.create({
    contenedor: {
        paddingHorizontal:10,
        marginTop:20
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10
    },
    boton: {
        backgroundColor: "#28A745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28A745"
    },
    texto: {
        color: "#fff"
    },
    login:{
        textAlign: "center",
        padding: 16,
        borderRadius: 10,
        fontWeight: "bold",
        backgroundColor: "lightblue"
    },
    titulo: {
        alignItems: "flex-start",
        fontWeight: "bold",
        fontSize: 20
    },
    app:{
        textAlign: "center",
        padding: 16,
        borderRadius: 10,
        backgroundColor: "orange",
        fontWeight: "bold",
        marginTop: 10
    }
})
export default Register