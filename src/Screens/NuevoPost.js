import React, {Component} from "react";
import { View, Text, Pressable } from "react-native";
import { StyleSheet} from "react-native"
import DynamicForm from "../Components/DynamicForm.js";
class NuevoPost extends Component{
    render(){
        return(
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Crear Nuevo Post</Text>
                <Text>Compartí lo que estás pensando con la comunidad</Text>
                <DynamicForm />
                <Pressable onPress={() => this.props.navigation.navigate("HomeMenu")}>
                    <Text style={styles.volver}>Volver al inicio</Text>
                </Pressable>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
    },
    volver: {
        textAlign: "center",
        padding: 16,
        borderRadius: 10,
        backgroundColor: "lightblue",
        fontWeight: "bold",
        marginTop: 20
    }
})
export default NuevoPost;