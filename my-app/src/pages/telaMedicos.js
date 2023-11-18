import { useContext, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import Estilo from "../components/Estilo";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { MedicoContext } from "../context/MedicoContext";

export default props => {
    const {setMedicoId} = useContext(MedicoContext)
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const URL = 'https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/medico';
    const navigation = useNavigation()
    const getMedicos = async () => {
        try{
            const response = await fetch(URL);
            const json = await response.json();
            setData(json);
        } catch(error) {
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getMedicos();
    }, [])

    return(
        <>
            <View>
                <Text>Profissionais</Text>

                {isLoading ? (
                    <ActivityIndicator size={80} />
                ) : (
                    <FlatList 
                        data={data}
                        keyExtractor={({id})=>id}
                        renderItem={ ({item})=>(
                            <><Text style={Estilo.textFlatList}>
                                - {item.id} - {item.nome}
                            </Text>
                            <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate('Horarios');
                                setMedicoId(item.id)
                            }}
                            ><AntDesign name="right" size={24} color="black" /></TouchableOpacity>
                            </>
                        )}
                        
                        
                    />
                )
                }
                
            </View>
        </>
    )
}