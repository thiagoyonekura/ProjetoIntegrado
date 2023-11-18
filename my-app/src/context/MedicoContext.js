import React, { createContext, useState } from 'react';
export const MedicoContext = createContext();

export const MedicoProvidender = ({children})=>{
    [medico, setMedico] = useState('');
    function setMedicoId(id){
        setMedico(id)
    }
    return(
        <MedicoContext.Provider value={{medico, setMedico, setMedicoId}}>
        {children}
        </MedicoContext.Provider>
    )
}

export default MedicoProvidender;