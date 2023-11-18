import { useEffect, useState } from "react"
import { ActivityIndicator, Button, FlatList, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import Estilo from "../components/Estilo";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default props => {
    const item = props.item
   
    console.log(item)
    const Id = 1
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const URL = 'https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/horario/medicos/' + Id + 'disponiveis';
    const navigation = useNavigation()
    const getMovies = async () => {
        try{
            const response = await fetch(URL);
            const json = await response.json();
            console.log(json);
            setData(json);
        } catch(error) {
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        //getMovies();
    }, [])

    return(
        <>
            <View>
                <Text>Exemplo API</Text>

                {isLoading ? (
                    <ActivityIndicator size={80} />
                ) : (
                    <FlatList 
                        data={data}
                        keyExtractor={({id})=>id}
                        renderItem={ ({item})=>(
                            <>
                            <Text style={Estilo.textFlatList}>
                                
                            </Text>
                            <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate('Horarios');
                            }}
                            ><AntDesign name="right" size={24} color="black" /></TouchableOpacity>
                            </>
                        )
                        }
                        
                    />
                )
                }
                <Button title="Atualizar" onPress={ () => getMovies()} />
            </View>
        </>
    )
}