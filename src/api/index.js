import axios from 'axios';
const BASE = 'https://jsonplace-univclone.herokuapp.com';

export async function getUsers(){
    try{
        const {data} = await axios.get(`${BASE}/users`);
        return data;
    }catch(error){
        throw error;
    }
}

export async function getPostsByUser(userId){
    try{
        const {data} = await axios.get(`${ BASE }/users/${ userId }/posts`)
        return data
    }catch (error){
        throw error
    }
}

export async function getTodosByUser(userId){
    try{
        const {data} = await axios.get(`${ BASE }/users/${ userId }/todos`);
        return data
    }catch(error){
        throw error  
    }
}

