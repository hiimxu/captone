import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SalonList from "./SalonList.json";

import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";

import { Modal, Box, Tooltip } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function ManageService() {
  const fakeData = SalonList.data;
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div style={root}>
        <div className="columns">
          <div className="column is-2"></div>
          <div
            className="column is-8 mt-5 mb-5"
            style={{
              padding: "0px",
              minHeight: "400px",
              background: "url('" + paperbg + "')",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <TabList
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                >
                  <Tab label="Active Salons" value="1" />
                  <Tab label="Deactive Salons" value="2" />
                  <Tab label="Pending Request" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div>
                  <div className="has-text-right mb-5">
                    <input
                      className="input w-50"
                      type="text"
                      placeholder="text here"
                    ></input>
                    <button className="ml-5 button is-info">Search</button>
                  </div>{" "}
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="SalonName">Salon's Name</p>
                        </th>
                        <th>
                          <p title="SalonAddress">Address</p>
                        </th>
                        <th>
                          <p title="DateJoin">Date join</p>
                        </th>
                        <th>
                          <p title="Rating">Rating</p>
                        </th>
                        <th className="has-text-centered">
                          <p title="Actions">Actions</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fakeData?.map((element) => (
                        <tr key={element.staffId}>
                          <th scope="row">{fakeData.indexOf(element) + 1}</th>
                          <td>{element.nameSalon}</td>
                          <td>{element.detailAddress}</td>
                          <td>{element.dateJoin}</td>
                          <td>{element.AverangeVote}</td>

                          <td className="has-text-centered">
                            <Link
                              to="/DetailSalon"
                              className="button is-rounded is-info mr-5"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </Link>{" "}
                            <button className="button is-rounded is-warning has-text-white">
                              <i class="fa-solid fa-stop"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div>
                  {" "}
                  <div className="has-text-right mb-5">
                    <input
                      className="input w-50"
                      type="text"
                      placeholder="text here"
                    ></input>
                    <button className="ml-5 button is-info">Search</button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="SalonName">Salon's Name</p>
                        </th>
                        <th>
                          <p title="SalonAddress">Address</p>
                        </th>
                        <th>
                          <p title="DateJoin">Date join</p>
                        </th>
                        <th>
                          <p title="Rating">Rating</p>
                        </th>
                        <th className="has-text-centered">
                          <p title="Actions">Actions</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fakeData?.map((element) => (
                        <tr key={element.staffId}>
                          <th scope="row">{fakeData.indexOf(element) + 1}</th>
                          <td>{element.nameSalon}</td>
                          <td>{element.detailAddress}</td>
                          <td>{element.dateJoin}</td>
                          <td>{element.AverangeVote}</td>

                          <td className="has-text-centered">
                          <Link
                              to="/DetailSalon"
                              className="button is-rounded is-info mr-5"
                            >
                              <i class="fa-solid fa-circle-info"></i>
                            </Link>{" "}
                            <button className="button is-rounded is-primary has-text-white">
                              <i class="fa-solid fa-play"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div>
                  {" "}
                  <div className="has-text-right mb-5">
                    <input
                      className="input w-50"
                      type="text"
                      placeholder="text here"
                    ></input>
                    <button className="ml-5 button is-info">Search</button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="SalonName">Salon's Name</p>
                        </th>
                        <th>
                          <p title="SalonAddress">Address</p>
                        </th>
                        <th>
                          <p title="DateJoin">Date join</p>
                        </th>
                        <th>
                          <p title="Rating">Email</p>
                        </th>
                        <th className="has-text-centered">
                          <p title="Actions">Actions</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fakeData?.map((element) => (
                        <tr key={element.staffId}>
                          <th scope="row">{fakeData.indexOf(element) + 1}</th>
                          <td>{element.nameSalon}</td>
                          <td>{element.detailAddress}</td>
                          <td>{element.dateJoin}</td>
                          <td>{element.email}</td>

                          <td className="has-text-centered">
                            <Link to="/RequestForm" className="button is-rounded is-info mr-5">
                              <i class="fa-solid fa-circle-info"></i>
                            </Link>{" "}
                            <button className="button is-rounded is-success mr-5 has-text-white">
                              <i class="fa-solid fa-check"></i>
                            </button>
                            <button className="button is-rounded is-danger has-text-white">
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </TabContext>
          </div>
          <div className="column is-2"></div>
        </div>
      </div>
    </div>
  );
}
