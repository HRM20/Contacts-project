import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Contacts, Contact, AddContact, EditContact } from "../index"
import axios from "axios";

function App() {
  const [contacts, setcontacts] = useState([]);
  const [loading, setloading] = useState(false);
  const [groups, setgroups] = useState();
  // console.log(setcontacts)
  console.log(setloading)
  console.log(groups)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const { data: contactsData } = await axios.get("http://localhost:9000/contacts")
        const { data: groupsData } = await axios.get("http://localhost:9000/groups")
        setcontacts(contactsData);
        setgroups(groupsData);
        setloading(false);
      }
      catch (e) {
        console.log(e.massage);
        setloading(false);
      }
    };
    fetchData()
  }, [])

  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts"} />}></Route>
        <Route path="contacts"
          element={<Contacts contacts={contacts} loading={loading} />}
        />
        <Route path="contacts/:contactsId" element={<Contact />} />
        <Route path="contacts/edit/:contactsID" element={<EditContact />} />
        <Route path="contacts/add" element={<AddContact />} />

      </Routes>
    </div>
  );
};

export default App
{/* 
  خط24
  در صورتی که ادرس خالی باشه به صفحه کانتکتس می رود
  */}

{/*
     خط12
     در خواست دادن به سرور برای دسترسی به دیتا
     */}