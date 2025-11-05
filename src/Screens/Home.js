import React, {Component} from "react";
import { View, Text,  StyleSheet} from "react-native";
import { db, auth } from '../fireBase/Config';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
        posts: [],
        loading: true,
    };
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