import axios from "axios"

const   server_url = "http://localhost:9100"
//ادرس سرور وبسایت

export const getAllContacts = ()=> {
    const url = `${server_url}/contacts`;
    return axios.get(url)
};

export const getContact = (contactId)=>{//view Contacts component
    const url =  `${server_url}/contacts/${contactId}`;
    return axios.get(url)
};

export const getAllgroups = ()=> {
    const url = `${server_url}/groups`;
    return axios.get(url)
};

export const getGroup = (groupsId)=> {//view Contact component
    const url = `${server_url}/groups/${groupsId}`;
    return axios.get(url);
};

export const createContact = (contact) => {
    const url = `${server_url}/contacts`;
    return axios.post( url , contact )
};
export const updateContact = (contact, contactid ) =>{
    const url =  `${server_url}/contacts/${contactid}`;
    return axios.put(url, contact);

};

export const deletContact = (contactid) => {
     const url =  `${server_url}/contacts/${contactid}`;
    return axios.delete(url)
};