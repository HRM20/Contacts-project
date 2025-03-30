import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Navbar, Contacts, Contact, AddContact, EditContact } from "../index"
// import axios from "axios";
import { getAllContacts, getAllgroups, createContact, deletContact } from "../server-URL";
import ViewContact from "./ViewContact";
import { confirmAlert } from "react-confirm-alert";
import { CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from "../../helpers/colors";

function App() {
  const navigate = useNavigate()
  const [contacts, setcontacts] = useState([]);
  const [loading, setloading] = useState(false);
  const [groups, setgroups] = useState();
  const [forceRender, setForceRender] = useState(false);
  const [contact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
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


  const setContactInfo = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value// مقدار مناسب رو به نام مناسب نسبت داده ورودی پرامپ و ابجکتی که در بالا تعریف شده
    })
  }

  const createContactForm = async (event) => {
    event.preventDefault()
    try {
      const { status } = await createContact(contact)

      if (status == 201) {
        setContact([])
        navigate("/contacts")
      }
    }
    catch (err) {
      console.log(err.massage)
    }
  }

  const confirm = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir="rtl" style={{ background: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: "1em", padding:"2rem" }}>
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>ایا از حذف {contactFullname}اطمینان دارید ؟</p>
            <button
              className="btn btn-outline-danger mx-2"
              onClick={() => {
                removeContact(contactId)
                onClose()
              }}>مطمعن هستم </button>
            <button
              className="btn btn-outline-light" onClick={onClose}>انصراف</button>
          </div>
        )
      }
    });
  };

  const removeContact = async (contactId) => {
    try {
      setloading(true)
      const response = await deletContact(contactId)
      if (response) {
        const { data: contactData } = await getAllContacts()
        setcontacts(contactData)
        setloading(false)
      }
    } catch (error) {
      console.log(error.massage)
      setloading(false)
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts"} />}></Route>
        <Route path="contacts"
          element={<Contacts contacts={contacts} loading={loading} confirmDelete={confirm} />}
        />
        <Route path="contacts/:contactsId" element={<ViewContact />} />
        <Route path="contacts/edit/:contactsID" element={<EditContact setForceRender={setForceRender} forceRender={forceRender} />} />
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