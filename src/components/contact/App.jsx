import { useState, useEffect } from "react"
import { Routes, Route, Navigate , useNavigate } from "react-router-dom";
import { Navbar, Contacts, Contact, AddContact, EditContact } from "../index"
// import axios from "axios";
import { getAllContacts , getAllgroups , createContact } from "../server-URL";
import ViewContact from "./ViewContact";

function App() {
  const navigate = useNavigate()
  const [contacts, setcontacts] = useState([]);
  const [loading, setloading] = useState(false);
  const [groups, setgroups] = useState();
  const [contact , setContact] = useState({
    fullname : "",
    photo : "",
    mobile :  "",
    email : "",
    job : "",
  })//وظیفه گرفتن اطلاعات و ساخت مخاطب جدید را دارد
  // console.log(setcontacts)
  console.log(setloading)
  console.log(groups)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        // const { data: contactsData } = await axios.get("http://localhost:9000/contacts")//اطلاعات از سرور گرفته و داخل متغیر قرار داده
        // const { data: groupsData } = await axios.get("http://localhost:9000/groups")
        const { data: contactsData } = await getAllContacts()//از جایی که ادرس ها را در ان تعریف کردیم فراخوانی میکنیم
        const { data: groupsData } = await getAllgroups()
        setcontacts(contactsData);//مقدار جدید برای دیتایی که از سرور گرفته
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


  const setContactInfo =(event)=>{
    setContact({
      ...contact,
      [event.target.name] : event.target.value// مقدار مناسب رو به نام مناسب نسبت داده ورودی پرامپ و ابجکتی که در بالا تعریف شده
    })
  }

  const createContactForm = async(event)=>{
    event.preventDefault()
    try{
      const {status} = await createContact(contact)

      if(status == 201){
        setContact([])
        navigate("/contacts")
      }
    }
    catch(err){
      console.log(err.massage)
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts"} />}></Route>
        <Route path="contacts"
          element={<Contacts contacts={contacts} loading={loading} />}
        />
        <Route path="contacts/:contactsId" element={<ViewContact />} />
        <Route path="contacts/edit/:contactsID" element={<EditContact />} />
        <Route path="contacts/add" element={<AddContact createContactForm={createContactForm} groups={groups} loading={loading} contact={contact} setContactInfo={setContactInfo} />} />

      </Routes>
    </div>
  );
};

export default App
{/* 
  خط71
  در صورتی که ادرس خالی باشه به صفحه کانتکتس می رود
  */}

{/*
     خط30
     در خواست دادن به سرور برای دسترسی به دیتا
     */}

{
  /* 
  خط28
  طریقه ساخت اسم موقتی برای یک متغیر
  */
}
{/* 
  خط47
  ...یعنی کپی کردن یک مقدار
  هرچه از قبل مقدار داشتیم کپی بگیر و فقط مقدار که انتخاب شده را اپدیت کن
  */}