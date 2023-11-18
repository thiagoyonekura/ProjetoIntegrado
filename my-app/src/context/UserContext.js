import React, { createContext, useState } from 'react';
export const MeuContexto = createContext();

export const MeuContextoProvidender= ({children})=>{
    [userId, setUserId] = useState('')
    function set(id){
        setUserId(id)
    }
    return(
        <MeuContexto.Provider value={{userId, set}}>
        {children}
        </MeuContexto.Provider>
    )
}

export default MeuContextoProvidender