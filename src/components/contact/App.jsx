import { useState } from "react"
import { Routes , Route , Navigate} from "react-router-dom";
import { Navbar, Contacts, Contact ,AddContact , EditContact } from "../index"


function App() {
  const [contacts, setcontacts] = useState([]);
  const [loading, setloading] = useState(false)
  console.log(setcontacts)
  console.log(setloading)


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
  خط17
  در صورتی که ادرس خالی باشه به صفحه کانتکتس می رود
  */}