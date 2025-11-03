import React, {Component} from "react";
import { View, Text,  StyleSheet} from "react-native";

class Home extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View
            style = {styles.contenedor}>
                <Text>Home</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
     contenedor: {
    flex: 1,                     
    alignItems: 'center',       
    justifyContent: 'center',    
    backgroundColor: 'green',
    padding: 15
    }
})

export default Home