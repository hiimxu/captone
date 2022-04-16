
import React, { useEffect, useState } from "react";


export default function AddService() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [promotion, setPromotion] = useState("");
  const [time, setTime] = useState(15);

  const root = {
    textAlign: "center",
    
  };
  const btnAdd = {
    border: "none",
    borderRadius: "0.5rem",
    padding: "1%",
    marginTop: "2rem",
    width: "30%",
    height: "2.6rem",
    cursor: "pointer",
    background: "#0062cc",
    color: "#fff",
    fontSize: "1.3rem",
  };
  const card = {    
    border: "1px solid",
    borderRadius: "15px",
  };
  const btnTime = {
    width: "2rem",
    height: "2.3rem",
    textAlign: "center",
    borderRadius: "15%",
  };

  useEffect(() => {}, []);

  const addTime = () => {
    setTime(time + 15);
  };

  const minusTime = () => {
    if (time >= 30) {
      setTime(time - 15);
    } else {
      setTime(15);
    }
  };

  return (
    <div style={root}>
      <div className="container register-form ">
        <section className=" bg-image vh-100">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" style={card}>
                    <div className="card-body p-5">
                      <h2 className="text-center mb-5">
                        Add a new service for your's salon
                      </h2>
                      <form>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={name}
                            onChange={(event) => {
                              setName(event.target.value);
                            }}
                            placeholder="Service's name*"
                          />
                        </div>

                        <div className="input-group form-outline mb-4">                          
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={time}
                            onChange={(event) => {
                              setTime(event.target.value);
                            }}
                            placeholder="Service's time"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text rounded-right" id="basic-addon1">
                              Minute
                            </span>
                          </div>
                          <div className="mt-1">
                            <button
                              className="btn btn-outline-secondary bg-dark text-white mr-1 ml-1"
                              type="button"
                              style={btnTime}
                              onClick={addTime}
                            >
                              +
                            </button>
                            <button
                              className="btn btn-outline-secondary bg-dark text-white"
                              type="button"
                              style={btnTime}
                              onClick={minusTime}
                            >
                              -
                            </button>
                          </div>
                        </div>

                        <div className="input-group form-outline mb-4">                          
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={price}
                            onChange={(event) => {
                              setPrice(event.target.value);
                            }}
                            placeholder="Price*"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon1">
                              VND
                            </span>
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={content}
                            onChange={(event) => {
                              setContent(event.target.value);
                            }}
                            placeholder="Content*"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <textarea
                            rows={4}
                            cols={50}
                            type="text"
                            className="form-control form-control-lg"
                            value={description}
                            onChange={(event) => {
                              setDescription(event.target.value);
                            }}
                            placeholder="Description"
                          />
                        </div>

                        <div className="d-flex justify-content-center">
                          <button type="submit" style={btnAdd}>
                            Add Service
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
