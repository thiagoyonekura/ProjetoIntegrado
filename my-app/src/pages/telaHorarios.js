import { useContext, useEffect, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { MedicoContext } from "../context/MedicoContext";
import { MeuContexto } from "../context/UserContext";

export default (props) => {
  const { medico } = useContext(MedicoContext);
  const { userId } = useContext(MeuContexto);
  const Id = medico;
  const user = userId.paciente.id;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const URL =
    "https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/horario/medicos/" +
    Id +
    "/disponiveis";

  const getHorarios = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const agendar = async (id) => {
    try {
      const response = await fetch(
        "https://projetointegrado2023-dev-tgsa.2.sg-1.fl0.io/api/consulta/CriaConsulta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pacienteId: user,
            medicoId: medico,
            horarioId: id,
            observacoes: "Nenhuma",
          }),
        }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Agendado com sucesso!");
      } else {
        Alert.alert("Erro", data.message || "Erro ao cadastrar.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
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

  useEffect(() => {
    getHorarios();
  }, []);

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "#1865AC",
          }}
        >
          <Text style={{ flex: 1, textAlign: "center" }}>Data e Hora</Text>
          <Text style={{ width: 100, textAlign: "center", marginRight: 10 }}>
            Ações
          </Text>
        </View>

        {isLoading ? (
          <ActivityIndicator size={80} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#CED0CE",
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
            )}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 8,
                  backgroundColor: "#E3F2FD",
                }}
              >
                <Text style={{ flex: 1, padding: 5, textAlign: "center" }}>
                  {formatDate(item.dataHoraInicio)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    agendar(item.id);
                  }}
                  style={{
                    width: 100,
                    backgroundColor: "#4CAF50", // Cor de fundo do botão
                    padding: 5, // Espaçamento interno
                    borderRadius: 5, // Bordas arredondadas
                    justifyContent: "center", // Centraliza o conteúdo verticalmente
                    marginRight: 10, // Adiciona margem à direita, movendo o botão para a esquerda
                  }}
                  activeOpacity={0.7} // Opacidade ao tocar
                >
                  <Text
                    style={{
                      color: "white", // Cor do texto
                      textAlign: "center", // Alinhamento do texto
                      fontWeight: "bold", // Peso da fonte
                    }}
                  >
                    Agendar
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};
