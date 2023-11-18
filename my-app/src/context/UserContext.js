import React, { createContext, useState } from 'react';
export const MeuContexto = createContext();

export const MeuContextoProvidender= ({children})=>{
    [userId, setUserId] = useState('')
    const base = 'Hello'
    function set(id){
        setUserId(id)
    }
    return(
        <MeuContexto.Provider value={{userId, setUserId, base, set}}>
        {children}
        </MeuContexto.Provider>
    )
}

export default MeuContextoProvidender