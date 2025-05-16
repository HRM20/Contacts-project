import { Link } from "react-router-dom";
import Contact from "./Contact";
import AddContact from "./AddContact";

import { PINK } from "../../helpers/colors";
import { Spinner } from "react-bootstrap";

const Contacts = ({ contacts, loading, confirmDelete }) => {
  return (
    <div className="container">
      <section>
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 float-end">
                <Link
                  to={"add"}
                  className="btn m-2"
                  style={{ background: PINK }}>
                  ایجاد مخاطب جدید
                  <i className="fa fa-plus-circle mx-2"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        {
          loading ? <Spinner /> : (<div className="row">
            {
              contacts.length > 0 ? (contacts.map((c) => (
                <Contact contact={c} key={c.id} confirmDelete={() => confirmDelete(c.id, c.fullname)} />
              ))) : (<div>مخاطبی یافت نشد</div>
              )}


          </div>)
        }
      </section>
    </div>
  );
};
export default Contacts;

{/* 
  خط28
  شرط تک خطی در صورتی که مخاطبی پیدا نشد پیغام خط پایین را نمایش میدهد
  شرط ? (دستور1) :(دستور2)
  */}