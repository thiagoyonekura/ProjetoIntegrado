import { useContext, useEffect, useState } from "react"
import { Alert, ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import Estilo from "../components/Estilo";
import { MedicoContext } from "../context/MedicoContext";
import { MeuContexto } from "../context/UserContext";

export default props => {
    const {medico} = useContext(MedicoContext)
    const {userId} = useContext(MeuContexto)
    const Id = medico
    const user = userId.paciente.id;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const URL = 'https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/horario/medicos/' + Id + '/disponiveis';
    
    const getHorarios = async () => {
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
    const agendar = async (id) => {
        try{
            const response = await fetch('https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/consulta/CriaConsulta', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pacienteId: user, medicoId: medico, horarioId: id, observacoes: "Nenhuma" }),
              });
            
              if (response.status === 200 || response.status === 201) {
                
                Alert.alert('Agendado com sucesso!')
              } else {
                Alert.alert('Erro', data.message || 'Erro ao cadastrar.');
              }
        } catch(error) {
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }
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
        getHorarios();
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
                                {formatDate(item.dataHoraInicio)} - {formatDate(item.dataHoraFim)}
                            </Text>
                            <TouchableOpacity
                            onPress={()=>{
                                agendar(item.id)
                            }}
                            ><Text>Agendar</Text></TouchableOpacity>
                            </>
                        )
                        }
                        
                    />
                )
                }
            </View>
        </>
    )
}
