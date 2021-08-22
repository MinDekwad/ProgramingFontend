import React, { useState, useEffect, useCallback } from "react";
import {useLocation,useHistory} from "react-router-dom";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import swal from "sweetalert";

export default function Editprogramming() {
    let History = useHistory();
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');

    const cachData = JSON.parse(localStorage.getItem("cachData"));
    
    const [Name, setName] = useState();
    const [Detail, setDetail] = useState();

    const fetchData = useCallback(async (id) =>{
        try{
            const respData = await axios.get(`http://localhost:3001/api/v1/programming/readid/`+id, {headers:{Authorization:`Bearer ${cachData}`}});
            const { data : respdata } = respData
            const {data} = respdata
            setName(data.Name);
            setDetail(data.Detail);
        }catch(error){
            console.log(error);
        }
    },[])

    const SaveData = async (id) =>{
        try{
            let Putdata = {
                Name : Name,
                Detail : Detail,
            }
            const resData = await axios.put(`http://localhost:3001/api/v1/programming/update/`+id, Putdata, {headers:{Authorization: `Bearer ${cachData}`}});
            const data = resData.data;
            const message = data.message;
            if(message === "แก้ไขข้อมูลสำเร็จ"){
                swal({
                    title:"Done!",
                    text:"Save success",
                    icon:"success",
                    button:"close",
                })
                window.setTimeout(function(){
                    History.push({
                        pathname:"/Programming",
                    })
                }, 2000);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData(id)
      }, []);

    return (
        <div className="content-wrapper">
        <section className="content">
            <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                <Form>
                    <Form.Group className="col-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Name" name="name" onChange={e => setName(e.target.value)} defaultValue={Name} />
                    </Form.Group>
                    <br />
                    <Form.Group className="col-12">
                        <Form.Label>Detail</Form.Label>
                        <Form.Control
                            size="sm"
                            as="textarea"
                            placeholder="detail"
                            rows={10}
                            name="detail"
                            onChange={e => setDetail(e.target.value)}
                            value={Detail}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="col-2">
                        <Button variant="success" onClick={() => {SaveData(id)}}>Save</Button>
                    </Form.Group>
                </Form>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}
