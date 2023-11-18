import { View, Text, ActivityIndicator, FlatList } from "react-native"
import Estilo from "../components/Estilo"
import { useContext, useEffect, useState } from "react"
import { MeuContexto } from "../context/UserContext";

export default props => {
    const {userId} = useContext(MeuContexto)
    const Id = userId.usuario.id;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const URL = 'https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/paciente/relatorio/' + Id; 
    const getHistorico = async () => {
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

    // Função para formatar a data dd/mm/yyyy hh:mm
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(()=>{
        getHistorico();
    }, [])
    return (
        <>
        <View>
        
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#1865AC', }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>Data</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>Médico</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>Status</Text>
                
            </View>
                {isLoading ? (
                    <ActivityIndicator size={80} />
                ) : (
                    <FlatList 
                        data={data}
                        keyExtractor={({id})=>id}
                        renderItem={ ({item})=>(
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8, backgroundColor: '#E3F2FD' }}>
                            <Text style={{ flex: 1, textAlign: 'center' }}>{formatDate(item.dataHora)}</Text>
                            <Text style={{ flex: 1, textAlign: 'center' }}>{item.nomeMedico}</Text> 
                            <Text style={{ flex: 1, textAlign: 'center' }}>{item.status}</Text> 
                            </View>
                        )
                        }
                    />
                )
                }
                
                </View>
        </>
    )
}