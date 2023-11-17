import { TouchableOpacity } from "react-native"
import { View, Text, ActivityIndicator, FlatList, Button } from "react-native"
import Estilo from "../components/Estilo"
import { useEffect, useState } from "react"

// botao de cancelar
// put
//consulta/{id}/cancelar

export default props =>{
    const Id = props.id;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const URL = 'https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/paciente/' + {Id} + '/consultas/agendadas'; 

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
        getMovies();
    }, [])

    return(
        <>
            <View>
                <Text>Minhas Consultas: </Text>

                {isLoading ? (
                    <ActivityIndicator size={80} />
                ) : (
                    <FlatList 
                        data={data}
                        keyExtractor={({id})=>id}
                        renderItem={ ({item})=>(
                            <Text style={Estilo.textFlatList}>
                                - {item.NomeMedico} - {item.DataHora} - {item.Status} - {item.Observacoes}
                            </Text>
                        )
                        }
                    />
                )
                }
                <Button title="Atualizar" onPress={ () => getMovies()} />
                </View></>)
}
