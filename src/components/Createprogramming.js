import React, {useState} from "react";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useHistory } from "react-router";
import swal from 'sweetalert';

export default function Createprogramming() {

    const cachData = JSON.parse(localStorage.getItem("cachData"));

    let History = useHistory();
    const [name, setName] = useState("");
    const [detail,setDetail] = useState("");

    const SaveData = async () => {
        try{
            let Postdata = {
                Name : name,
                Detail : detail,
            }                                                                                              
            const respData = await axios.post(`http://localhost:3001/api/v1/programming/create/`,Postdata, {headers:{Authorization : `Bearer ${cachData}` }})
            const data = respData.data
            const message = data.message
            if (message === "เพิ่มข้อมูลสำเร็จ"){
                swal({
                    title: "Done!",
                    text: "Save Success",
                    icon: "success",
                    button: "close",
                })
                window.setTimeout(function(){ 
                    History.push({
                        pathname:'./Programming'
                    })
                } ,2000);
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="content-wrapper">
        <section className="content">
            <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                <Form>
                    <Form.Group className="col-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Name" name="name" onChange={e => setName(e.target.value)} />
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
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="col-2">
                        <Button variant="success" onClick={() => {SaveData()}}>Save</Button>
                    </Form.Group>
                </Form>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}
