import { View, Text, ActivityIndicator, FlatList, Button } from "react-native"
import Estilo from "../components/Estilo"
import { useContext, useEffect, useState } from "react"
import { MeuContexto } from "../context/UserContext";

// botao de cancelar
// put

export default props =>{
    const {userId} = useContext(MeuContexto)
    const Id = userId.paciente.id;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const URL = 'https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/paciente/' + Id + '/consultas/agendadas'; 
    const getAgenda = async () => {
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

    const cancelaConsulta = async (consultaId) => {
        const cancelUrl = 'https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/consulta/' + consultaId + '/cancelar';
        try {
            const response = await fetch(cancelUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Consulta cancelada com sucesso.');
                getAgenda(); // Chama getAgenda novamente para atualizar a lista
                // Atualiza a lista de consultas ou dê feedback ao usuário
            } else {
                console.error('Falha ao cancelar a consulta:', response.status);
            }
        } catch (error) {
            console.error('Erro ao cancelar a consulta:', error);
        }
    };

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
        getAgenda();
    }, [])

    return(
        <>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#1865AC', }}>
                <Text style={{ flex: 1, textAlign: 'center' }}>Data</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>Médico</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>Observações</Text>
                <Text style={{ width: 100, textAlign: 'center' }}>Ações</Text>
            </View>
                {isLoading ? (
                    <ActivityIndicator size={80} />
                ) : (
                    <FlatList 
                        data={data}
                        keyExtractor={({id})=>id}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8, backgroundColor: '#E3F2FD' }}>
                            <Text style={{ flex: 1, textAlign: 'center' }}>{formatDate(item.dataHora)}</Text>
                            <Text style={{ flex: 1, textAlign: 'center' }}>{item.nomeMedico}</Text>
                            <Text style={{ flex: 1, textAlign: 'center' }}>{item.observacoes}</Text>
                            <View style={{ width: 100, justifyContent: 'center' }}>
                                <Button 
                                    title="Cancelar" 
                                    onPress={() => cancelaConsulta(item.consultaId)}
                                    color="#B22222"
                                />
                            </View>
                            </View>
                        )}
                    />
                )
                }
                </View></>)
}
