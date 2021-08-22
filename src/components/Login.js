import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export default function Login() {
  let History = useHistory();

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const HandleLogin = async () => {
    try {
      let Postdata = {
        user: Username,
        password: Password,
      };
      const responseData = await axios.post(
        `http://localhost:3001/api/v1/programming/login`,
        Postdata
      );
      localStorage.setItem("cachData", JSON.stringify(responseData.data.accesstoken));
      const message = responseData.data.message;
      if (message === "Login success") {
        swal({
          title: "Done!",
          text: "Login Success",
          icon: "success",
          button: false,
          timer: "2000",
        }).then(() => {
          History.push("/Programming");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="content-wrapper">
    <section className="content" style={{ backgroundColor: "#222d32" }}>
      <div className="container-fluid">
        <div className="">
          <div className="col-12">
            <div
              className="col-12"
              style={{ width: "45%", margin: "auto", marginTop: "10%" }}
            >
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Login to Admin system</h3>  
                </div>
                  <div className="box-body">
                    <Form>
                      <Form.Group className="col-12" style={{maginLeft:'-15px', marginRight:'-15px', marginBottom:'15px'}}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="Name"
                          name="name"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Form.Group>
                      <br />
                      <Form.Group className="col-12" style={{maginLeft:'-15px', marginRight:'-15px', marginBottom:'15px'}}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="*******"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <br />
                      <Form.Group className="col-2" style={{maginLeft:'-15px', marginRight:'-15px', marginBottom:'15px'}}>
                        <Button
                          variant="success"
                          onClick={() => {
                            HandleLogin();
                          }}
                        >
                          Submit
                        </Button>
                      </Form.Group>
                    </Form>
                  </div>
              </div>
                

            </div>
          </div>
        </div>
      </div>
    </section>
    // {/* </div> */}
  );
}
