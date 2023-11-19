import { View, Text, ActivityIndicator, FlatList } from "react-native"
import { useContext, useCallback, useState } from "react"
import { MeuContexto } from "../context/UserContext";
import { useFocusEffect } from '@react-navigation/native';

export default props => {
    const {userId} = useContext(MeuContexto)
    const Id = userId.paciente.id;
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
        // Cria a data como se estivesse em UTC
        const date = new Date(dateString);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        date.setTime(date.getTime() + userTimezoneOffset);
    
        // Formata a data no fuso horário local
        return date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    useFocusEffect(
        useCallback(() => {
          getHistorico();
        }, [])
      );

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
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 1, backgroundColor: '#CED0CE', marginLeft: 10, marginRight: 10 }} />
                          )}
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