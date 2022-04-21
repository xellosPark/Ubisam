import React, { useState } from 'react'
import { Container} from 'react-bootstrap';
import contactUs from "..//db/data.json";
import Personnelinfo from "../modals/Personnelinfo.js";
import { BsPencil, BsTrash } from "react-icons/bs";


export default function EmergencyNetwork() {
  // console.log(contactUs);
  const [personnelinfo, setpersonnelinfo] = useState(false);
  const columns = ["#", "이 름", "직 급", "Phone","Email","Actions"];
  const [IsDataChange, setIsDataChange] = useState(true);

  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let dateString = year + '년 ' + month  + '월 ' + day + '일 ';
  //setNowDay(dateString);
  // const [NowDay, setNowDay] = useState(dateString);
  

  function userPhone(phone){
    let userPhone  = phone.substring(0,3) + "-" + phone.substring(3,7) + "-" + phone.substring(7,11);
    return userPhone;
  }

  function del(data){
    if(window.confirm('삭제 하시겠습니다?')){
      // console.log(data.id);
      fetch(`http://localhost:3001/ContactUs/${data.id}`,{
          method: "DELETE",
        }).then(res => {
            if(res.ok){
              console.log("삭제 성공");
            }
            else{
              throw new Error('400 아니면 500 에러남');
            }
        })
        .then((resData) => {
          console.log("성공",resData);
        })
        .catch(() => {
          console.log("error 발생");
        })
    }
  }

  return (
    <>
      <Personnelinfo
        show={personnelinfo}
        onHide={() => setpersonnelinfo(false)}
      />
      <Container
        className="my-4"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <table className="table table-. "> */}
        <table className="table table-striped table-hover border-primary">
          <caption>{dateString}</caption>
          <thead className="text-dark table-info">
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
                //<th align="center" key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody >
            {contactUs.ContactUs.map((user, index) => (
              <tr key={index + 1}>
                <td input type="checkbox">
                  {" "}
                  {index + 1}
                </td>
                <td>{user.name}</td>
                <td>{user.position}</td>
                <td>{userPhone(user.phone)}</td>
                <td>{user.email}</td>
                {/* {IsDataChange &&  <td  className="d-flex gap-2">} */}
                <td className="gap-2">
                  {/* <button
                    type="button"
                    className="btn btn-outline-info col-5 btn-sm"
                    disabled={IsDataChange}
                  >
                    <BsPencil />
                  </button> */}
                  <button onClick={() => del(user) }
                    type="button"
                    className="btn btn-outline-danger col-8 "
                    disabled={IsDataChange}
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <button type="button" class="btn btn-outline-info">Info</button> */}
        {/* <div className="d-grid gap-2 col-6 mx-auto" role="group"> */}
        <div className="d-flex justify-content-center gap-2">
          <button
            type="button"
            style={{ textAlign: "center" }}
            onClick={() => setpersonnelinfo(true)}
            className="btn btn-outline-info btn-lg-end col-6"
          >
            연락망 추가
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setIsDataChange(!IsDataChange)}
          >
            {IsDataChange ? "수정/삭제" : "진행중 ..."}
          </button>
        </div>
      </Container>
    </>
  );
}
