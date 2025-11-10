import React, {Component} from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { StyleSheet} from "react-native"
import { auth, db } from "../fireBase/Config"

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state ={
            userPosteos: [],
            userName: ""
        }
    }

    componentDidMount() {
        this.dataUsuario();
        this.dataPosteos();
    }

    dataUsuario(){
        db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let userName = "";
                docs.forEach(doc => {
                    userName = doc.data().userName;
                })
                this.setState({ userName: userName });
            }
        )
    }

    dataPosteos(){
        db.collection('posts').onSnapshot(
            docs => {
                let posteos = [];
                let userEmail = auth.currentUser.email;
                
                docs.forEach(doc => {
                    let postData = doc.data();
                    if(postData.user === userEmail) {
                        posteos.push({
                            id: doc.id,
                            data: postData
                        })
                    }
                })
                
                this.setState({
                    userPosteos: posteos
                })
            }
        )
    }

    Logout(){
        auth.signOut();
        this.props.navigation.navigate("Login");
    }

    render(){
        let user = auth.currentUser;

        return(
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Mi Perfil</Text>
                
                <View style={styles.userInfo}>
                    <Text style={styles.infoText}>Usuario: {this.state.userName}</Text>
                    <Text style={styles.infoText}>Email: {user.email}</Text>
                    
                </View>

                <Text style={styles.subtitulo}>Mis Posts:</Text>
                
                <FlatList
                    data={this.state.userPosteos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.posteos}>
                             <Text style={styles.postText}>{item.data.descripcion}</Text>
                        </View>
                    )}
                />

                <Pressable onPress={() => this.Logout()} style={styles.boton}>
                    <Text style={styles.texto}>Cerrar Sesión</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "#000000",
        padding: 20,
        paddingTop: 60
    },
    userInfo: {
        backgroundColor: "#202327",
        padding: 20,
        borderRadius: 12,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: "#2F3336"
    },
    posteos: {
        backgroundColor: "#202327",
        padding: 15,
        borderRadius: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#2F3336"
    },
    boton: {
        backgroundColor: "#F4212E",
        padding: 15,
        borderRadius: 25,
        marginVertical: 20,
        alignItems: "center"
    },
    texto: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 30
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginVertical: 15
    },
    infoText: {
        color: "#FFFFFF",
        fontSize: 15,
        marginVertical: 5
    },
    postText: {
        color: "#FFFFFF",
        fontSize: 15
    }
})

export default Profile;