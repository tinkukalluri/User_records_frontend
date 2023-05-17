import React, { useEffect, useState } from 'react'

function App() {

  const [userItems, setUserItems] = useState(-1)
  const [editMode, setEditMode] = useState(-1)


  // on component mount
  useEffect(() => {
    const name_ele = document.getElementById('name');
    const email_ele = document.getElementById('email');
    const mobile_ele = document.getElementById('mobile');

    name_ele.addEventListener("change", (e) => {
      console.log('name getting validated')
      const name = name_ele.value;
      if (nameValidation(name)) {
        name_ele.style.border = '3px solid green'
      } else {
        name_ele.style.border = '3px solid red'
      }
    })

    email_ele.addEventListener('change', () => {
      let email = email_ele.value;
      if (emailValidation(email)) {
        email_ele.style.border = '3px solid green'
      } else {
        email_ele.style.border = '3px solid red'
      }
    })

    mobile_ele.addEventListener('change', () => {
      if (mobileValidation(mobile_ele.value)) {
        mobile_ele.style.border = '3px solid green';
      } else {
        mobile_ele.style.border = '3px solid red';
      }
    })

    fetchItemsList();
  }, [])


  function nameValidation(name, name_ele = null) {
    if (name.length < 5) {
      if (name_ele) name_ele.style.border = '3px solid red'
      return false
    } else {
      if (name_ele) name_ele.style.border = '3px solid green'
      return true
    }
  }

  function mobileValidation(mobile, mobile_ele = null) {
    var mobilePattern = /^\d{10}$/;
    if (mobilePattern.test(mobile)) {
      if (mobile_ele) mobile_ele.style.border = "3px solid green"
      return true
    } else {
      if (mobile_ele) mobile_ele.style.border = "3px solid red"
      return false
    }
  }

  function emailValidation(email, email_ele = null) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      if (email_ele) email_ele.style.border = '3px solid green';
      return true
    } else {
      if (email_ele) email_ele.style.border = '3px solid red';
      return false;
    }
  }


  function fetchItemsList() {
    sendAjax().then(res => {
      setUserItems(res)
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event)

    const name_ele = document.getElementById('name');
    const email_ele = document.getElementById('email');
    const mobile_ele = document.getElementById('mobile');

    if (!(nameValidation(name_ele.value, name_ele) && mobileValidation(mobile_ele.value, mobile_ele) && emailValidation(email_ele.value, email_ele))) {
      return
    }

    sendAjax("POST", '', {
      name: name_ele.value,
      email: email_ele.value,
      mobile: mobile_ele.value
    }).then(response => {
      fetchItemsList()
      name_ele.value = ""
      email_ele.value = ""
      mobile_ele.value = ""
      name_ele.style.border = "";
      mobile_ele.style.border = '';
      email_ele.style.border = '';
    })

  }

  function handleEdit(e, user_id) {
    console.log(user_id);
    setEditMode(user_id)
  }

  function handleDelete(e, user_id) {
    console.log(user_id);
    sendAjax("delete", user_id.toString()).then(response => {
      fetchItemsList()
    })
  }

  function handleClose(e, user_id) {
    console.log(user_id);
    setEditMode(-1)
  }

  function handleSave(e, user_id) {
    const name_ele = document.getElementById('name' + user_id.toString());
    const mobile_ele = document.getElementById('mobile' + user_id.toString());
    const email_ele = document.getElementById('email' + user_id.toString());
    const name = name_ele.value;
    const email = email_ele.value;
    const mobile = mobile_ele.value;
    console.log(name, mobile, email);
    let body = {}
    let t;

    t = nameValidation(name, name_ele) ? body["name"] = name : null;
    t = mobileValidation(mobile, mobile_ele) ? body["mobile"] = mobile : null;
    t = emailValidation(email, email_ele) ? body["email"] = email : null;



    if (!(nameValidation(name, name_ele) && mobileValidation(mobile, mobile_ele) && emailValidation(email, email_ele))) {
      return
    }

    console.log(body)
    sendAjax("Patch", user_id.toString(), body).then(res => {
      setEditMode(-1)
      fetchItemsList()
    })
  }

  function sendAjax(method = "GET", endpoint = "", body = {}) {

    return new Promise((resolve, reject) => {
      if (method.toUpperCase() == "GET") {
        console.log("get is being processed")
        // GET http://localhost:3000/item
        const requestOptions = {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        }
        const path = `/item/${endpoint}`
        fetch(path, requestOptions).then(response => response.json()).then(data => {
          console.log(data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }
      else if (method.toUpperCase() == "PATCH") {
        // PATCH http://localhost:3000/item/6463a3942ae1a70d20e6df16
        // Content - Type: application / json

        // {
        //   "name": "sintingrdgdrg"
        // }
        const requestOptions = {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
        const path = `/item/${endpoint}`
        fetch(path, requestOptions).then(response => response.json()).then(data => {
          console.log(data)
          resolve(data)
        }).catch(err => reject(err));
      }
      else if (method.toUpperCase() == "POST") {
        // POST http://localhost:3000/item/
        // Content - Type: application / json

        // {
        //   "name": "tinku kalluri kumar",
        //     "email": "tinku@gmail.com",
        //       "mobile": 9133723619
        // }
        const requestOptions = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
        const path = `/item/${endpoint}`
        fetch(path, requestOptions).then(response => response.json()).then(data => {
          console.log(data)
          resolve(data)
        }).catch(err => reject(err));
      }
      else if (method.toUpperCase() == "DELETE") {
        // DELETE  http://localhost:3000/item/6463a176ee93cf75e0739d9c
        const requestOptions = {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" },
        }
        const path = `/item/${endpoint}`
        fetch(path, requestOptions).then(response => response.json()).then(data => {
          console.log(data)
          resolve(data)
        }).catch(err => reject(err));
      }
      else {
        console.log("Invalid Method");
      }
    })


  }


  return (
    <>
      <div className="container mt-5 ">
        <div className="row ms-3">
          ENTER USER DETAILS
        </div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card p-4">
              {/* name */}
              <div className="input-group mb-4">
                <input type="text" id="name" className="form-control" placeholder="Name" aria-label="name" aria-describedby="basic-addon1" required />
              </div>

              {/* mobile */}
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">+91</span>
                <input type="number" id="mobile" className="form-control" placeholder="Mobile" aria-label="mobile" aria-describedby="basic-addon1" required />
              </div>

              {/* email */}
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">@</span>
                <input type="text" id="email" className="form-control" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" required />
              </div>

              {/* submit */}
              <div className="input-group mb-4">
                <input type="submit" className="form-control btn btn-primary" onClick={(e) => handleSubmit(e)} placeholder="submit" aria-label="submit" aria-describedby="basic-addon1" />
              </div>

            </div>
          </div>


        </div>
      </div>

      {/* items */}
      <div className="container mt-5 ">
        <div className="row ms-3">
          USER'S LIST
        </div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card p-4">

              {/* <!-- header --> */}
              <div className="row mb-5">
                <div className="col-md-12 col-sm-12 col-lg-12">
                  <div className="container">
                    <div className="row">
                      <div className="col-1"></div>
                      <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                        <b>Name</b>
                      </div>
                      <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                        <b>Mobile</b>
                      </div>
                      <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                        <b>Email</b>
                      </div>
                      <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                        <b>Edit</b>
                      </div>
                      <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                        <b>Delete</b>
                      </div>
                      <div className="col-1"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- body --> */}


              {userItems == -1 ? <div>Loading...</div> : <>
                {
                  userItems.map(element => {
                    return (
                      <div className="row mb-5">
                        <div className="col-md-12 col-sm-12 col-lg-12">
                          <div className="container">
                            <div className="row">
                              <div className="col-1"></div>
                              <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                                {editMode != element._id ? element.name : <input type="text" id={"name" + element._id.toString()} className="form-control" defaultValue={element.name} aria-label="name" aria-describedby="basic-addon1" />}
                              </div>
                              <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                                {editMode != element._id ? element.mobile : <input type="text" id={"mobile" + element._id.toString()} className="form-control" defaultValue={element.mobile} aria-label="mobile" aria-describedby="basic-addon1" />}
                              </div>
                              <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                                {editMode != element._id ? element.email : <input type="text" id={"email" + element._id.toString()} className="form-control" defaultValue={element.email} aria-label="email" aria-describedby="basic-addon1" />}
                              </div>
                              <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                                {
                                  editMode != element._id ? <input type="button" className="btn btn-primary" onClick={(e) => {
                                    handleEdit(e, element._id)
                                  }} value="edit" /> :
                                    <input type="button" className="btn btn-danger" onClick={e => {
                                      handleClose(e, element._id)
                                    }} value="cancel" />
                                }
                              </div>
                              <div className="col-md-2 col-sm-2 col-lg-2 overflow-hidden">
                                {
                                  editMode != element._id ? <input type="button" className="btn btn-danger" onClick={(e) => {
                                    handleDelete(e, element._id)
                                  }} value="delete" /> : <input type="button" className="btn btn-success" onClick={e => {
                                    handleSave(e, element._id)
                                  }} value="save" />
                                }
                              </div>
                              <div className="col-1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </>
              }





            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
