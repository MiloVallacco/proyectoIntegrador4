import React, {Component} from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { StyleSheet} from "react-native"
import { auth } from "../fireBase/Config"
class Login extends Component{
    constructor(props) {
        super(props);
        this.state ={
            email: "",
            password: "",
            userName: "",
            error: ""
        }

    }
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("HomeMenu");
            }
        });
    }
    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then((response) => {
                this.setState({error: ""});
                this.props.navigation.navigate("HomeMenu");
            })
            .catch(error => {
                this.setState({error: 'Credenciales incorrectas'})
            })
    }
    onSubmit = () => {
        console.log("Email:", this.state.email);
        console.log("Password:", this.state.password);
        this.setState({error: ""});
        if (!this.state.email.includes('@')) {
            this.setState({error: "Email mal formateado"});
            return;
        }
        if (this.state.password.length < 6) {
            this.setState({error: "La password debe tener una longitud mínima de 6 caracteres"});
            return;
        }
        this.login(this.state.email, this.state.password);
    }
    render(){
        return(
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Login</Text>
                {this.state.error ? (
                    <Text style={styles.error}>{this.state.error}</Text>
                ) : null}
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                />
                <Pressable onPress={() => this.onSubmit()} style={styles.boton}>
                    <Text style={styles.texto}>Iniciar Sesión</Text>
                </Pressable>
                <Pressable onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.register}>
                        Ir a register
                    </Text>
                </Pressable>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#000000",
        paddingHorizontal: 20,
        paddingTop: 60
    },
    input:{
        height: 50,
        backgroundColor: "#202327",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#2F3336",
        borderRadius: 4,
        marginVertical: 8,
        color: "#FFFFFF",
        fontSize: 16
    },
    boton: {
        backgroundColor: "#1DA1F2",
        paddingVertical: 15,
        borderRadius: 25,
        marginVertical: 15,
        alignItems: "center"
    },
    texto: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    register:{
        textAlign: "center",
        padding: 15,
        color: "#1DA1F2",
        fontSize: 15,
        marginTop: 20
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#FFFFFF",
        marginBottom: 40,
        textAlign: "center"
    },
    error: {
        color: "#F4212E",
        marginBottom: 10,
        textAlign: "center",
        fontSize: 14
    }
})
export default Login