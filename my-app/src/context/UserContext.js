import React, { createContext, useEffect, useReducer, useState } from 'react';
//import users from '../data/users';

const URL = "http://localhost:3306/api/usuario"

var initialState = []
const UserContext = createContext({})

const actions = {
    createUser(state, action){
        const newUser = action.payload
        newUser.id = Math.random()
        return{
            ...state,
            users: [...state.users, newUser]
        }
    },

    updateUser(state, action){
        const userUpdated = action.payload
        return{
            ...state,
            users: state.users.map(u => u.id === userUpdated.id ? userUpdated: u )
        }
    },
    
    deleteUser(state, action){
        const  userReceive = action.payload
        return {
            ...state,
            users: state.users.filter(u => u.id !== userReceive.id)
        }
    }
}

export const UserProvider = props => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        getUsers();
    }, [])
    
    useEffect(()=>{
        initialState = {users};
    }, [users])

    const getUsers = async () => {
        try{
            const response = await fetch(URL);
            const json = await response.json();
            setUsers(json);
        }
        catch(error){
            console.error(error);
        }
    }

    function reducer(state, action){
        const fn = actions[action.type]

        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext