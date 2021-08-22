import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import swal from "sweetalert";

export default function Programming() {
  const cachData = JSON.parse(localStorage.getItem("cachData"));
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const responseData = await axios.get(
        `http://localhost:3001/api/v1/programming/read/`, {headers:{Authorization : `Bearer ${cachData}`}}
      );
      const { data: programming } = responseData;
      const { data } = programming;
      setData(data);
    } catch (error) {
      console.log("xxx : ",error);
    }
  };

  let History = useHistory();
  const Create = () => {
    History.push({
      pathname: "./Createprogramming",
    });
  };

  const Edit = (id) => {
    History.push({
      pathname:"./Editprogramming/",
      search:"?id="+id,
    })
  }

  const Delete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {
        try{
          const resData = await axios.delete(`http://localhost:3001/api/v1/programming/delete/`+id, {headers:{Authorization : `Bearer ${cachData}`}});
          const data = resData.data
          const message = data.message
          if(message === "ลบข้อมูลสำเร็จ"){
            swal("Poof! Your data has been deleted!", {
              icon: "success",
            });
          }else{
            swal("Error!", "Cannot delete this data!", "error");
          }
          window.setTimeout(function(){
            window.location.reload();
          }, 2000)
        }catch(error){ 
          console.log(error);
        }
      } else {
        swal("Your data is safe!");
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderTable = () => {
    let i = 0;
    return data.map(programming => {
        i++
        return (
            <tr>
                <td>{i}</td>
                <td align="center">{programming.Name}</td>
                <td align="center" style={{width:'100%'}}><textarea rows="10" style={{width:'100%', border:'none'}} disabled>{programming.Detail}</textarea></td>
                <td align="center">
                    <button className="btn btn-block btn-outline-primary" onClick={() => {Edit(programming.id)}}><i className="fa fa-edit"></i></button>
                </td>
                <td align="center">
                    <button className="btn btn-block btn-outline-primary" onClick={() => {Delete(programming.id)}}><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        )
    })
  }

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="col-6" style={{ float: "left" }}>
                <h1>Programming Language</h1>
              </div>
              <div
                className="col-6"
                style={{ float: "right", margin: "10px 0px 0px 0px" }}
              >
                <div style={{width:'10%', float:'right'}}>
                  <button
                    type="submit"
                    className="btn btn-block btn-outline-primary"
                    onClick={() => {
                      Create();
                    }}
                  >
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
              <div style={{ clear: "both" }}></div>
              <div className="card">
                <table className="table table-head-fixed text-nowrap">
                  <thead>
                    <tr align="center">
                      <th>No</th>
                      <th>Name</th>
                      <th>Detail</th>
                      <th>#</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                  {renderTable()}
                  </tbody>
                </table>

              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
