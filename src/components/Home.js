import React from "react";

function Home() {
  return (
    // <div className="content-wrapper" style={{minHeight: '95vh'}}>
    <div className="content-wrapper" style={{position:'relative'}}>
        <div className="content-header" style={{position:'absolute', top: '50%', left:'50%', transform: 'translate(-50%, -50%)'}}>
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-12">
                        <h1 className="m-0">WELCOME TO ADMIN PANEL</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}

export default Home;