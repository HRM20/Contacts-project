import axios from "axios"

const   server_url = "http://localhost:9000"
//ادرس سرور وبسایت

export const getAllContacts = ()=> {
    const url = `${server_url}/conracts`
    return axios.get(url)
}

export const getContacts = (contactsid)=>{
    const url =  `${server_url}/conracts/${contactsid}`;
    return axios.get(url)
}

export const getAllgroups = ()=> {
    const url = `${server_url}/groups`;
    return axios.get(url)
}

export const getGroup = (groupid)=> {
    const url = `${server_url}/groups/${groupid}`;
    return axios.get(url);
}