import { View, Text, ActivityIndicator, FlatList } from "react-native"
import Estilo from "../components/Estilo"
import { useContext, useEffect, useState } from "react"
import { MeuContexto } from "../context/UserContext";

// botao de cancelar
// put

export default props =>{
    const {userId} = useContext(MeuContexto)
    const Id = userId.usuario.id;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const URL = 'https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/paciente/' + Id + '/consultas/agendadas'; 
    const getMovies = async () => {
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
                                {item.dataHora} - {item.nomeMedico} - {item.observações}
                            </Text>
                        )
                        }
                    />
                )
                }
                </View></>)
}
