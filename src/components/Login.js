import React,{useState} from "react";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

export default function Login() {

    let History = useHistory();

    const [Username, setUsername] = useState("");
    const [Password,setPassword] = useState("");

    const HandleLogin = async() => {
        try {
            let Postdata = {
                user : Username,
                password : Password,
            }
            const responseData = await axios.post(
            `http://localhost:3001/api/v1/programming/login`, Postdata
            );
            localStorage.setItem("cachData",JSON.stringify(responseData.data));
            const message = responseData.data.message
            if (message === "Login success"){
                swal({
                    title: "Done!",
                    text: "Login Success",
                    icon: "success",
                    button: false,
                    timer:'2000',
                }).then(()=>{
                    History.push('/Programming')
                })
                // window.setTimeout(function(){ 
                //     // History.push({
                //     //     pathname:'/Home'
                //     // })
                // } ,2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    // <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="col-6" style={{ float: "left" }}>
                <h1>Login</h1>
                {/* <form name="login">
                  <input type="text" name="user" value="" />
                  <input type="password" name="password" value="" />
                  <button onClick={() => {HandleLogin()}} >Login</button>
                </form> */}
                <Form>
                    <Form.Group className="col-4">
                        <Form.Label>Username</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Name" name="name" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Form.Group className="col-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="*******" name="password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Form.Group className="col-2">
                        <Button variant="success" onClick={() => {HandleLogin()}}>Submit</Button>
                    </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    // </div>
  );
}
