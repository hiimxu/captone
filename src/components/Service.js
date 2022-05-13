import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServiceList,
  resetServiceList,
  updateSelectedService,
} from "../redux/actions/creators/booking";
import {
  currencyFormatter,
  convertISOStringToLocaleDateString,
} from "../utils";

import bgImg from "../assets/barbershopbg.jpg";
import paperbg from "../assets/paperbg.jpg";
import imageUnavailable from "../assets/image-unavailable.png";
import fakeReviews from "../components/mockUp/review.json";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import {
  addReview,
  getListReviewForCustomer,
  resetReviewListForCustomer,
} from "../redux/actions/creators/review";

// CSS
const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
  minHeight: "40rem",
};
// -- MODAL CSS --
const modalcss = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};

export default function Service() {
  // FAKE DATA
  // const fakeServiceList = serviceLists;
  const fakeReview = fakeReviews;

  //TOKEN
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );

  // API DATA
  const [type, setType] = useState("Services");
  console.log(type);
  const { serviceList } = useSelector((state) => state.service);
  const { salonId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServiceList(salonId));
    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch, salonId]);

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //FILL BY RATING
  const [rate, setRate] = useState(0);

  //CALL API REVIEW
  useEffect(() => {
    dispatch(getListReviewForCustomer({ salonId: salonId, star: rate }));
    return () => {
      dispatch(resetReviewListForCustomer());
    };
  }, [dispatch, salonId, rate]);

  //CALL LIST REVIEW FROM REDUX
  const { listReview } = useSelector((state) => state.listReviewForCustomer);

  // -- MODAL REVIEW --
  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = () => {
    setOpenReview(true);
    setErrEmpty(null);
  };
  const handleCloseReview = () => setOpenReview(false);

  //STATE ADD NEW REVIEW
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [errEmpty, setErrEmpty] = useState(null);

  //CALL MESSAGE ADD NEW REVIEW FROM REDUX
  const { successMessage, errMess } = useSelector(
    (state) => state.addReviewForCustomer
  );

  //ADD NEW REVIEW
  const handleAddNewReview = (e) => {
    e.preventDefault();
    if (!reviewRating) {
      setErrEmpty("Please choose a rating star!");
      return;
    }
    if (!reviewContent) {
      setErrEmpty("Please write review for salon!");
      return;
    }
    setErrEmpty(null);
    const callback = () => {
      dispatch(resetReviewListForCustomer());
      setErrEmpty(null);
      setReviewContent("");
      setReviewRating(0);
      setOpenReview(false);
      dispatch(getListReviewForCustomer({ salonId: salonId, star: rate }));
    };
    dispatch(
      addReview(
        token,
        { salonId: salonId, rate: reviewRating * 2, content: reviewContent },
        callback
      )
    );
  };

  return (
    <div style={root}>
      {/* -- VERTICAL STYLE -- */}

      <div className="columns">
        <div className="column is-3"></div>
        <div
          className="column is-6 mt-3 mb-5 p-0"
          style={{
            boxShadow: "1px 1px 20px black",
          }}
        >
          <div
            className="p-0"
            style={{ backgroundImage: "url(" + paperbg + ")" }}
          >
            <div>
              {serviceList?.dataSalon?.map((salon) => (
                <div
                  className=""
                  // style={{ background: "url(" + patterbg + ")" }}
                  key={salon.salonId}
                >
                  <div className="columns mt-0 pt-0">
                    <div className="column is-6" style={{ paddingTop: "0px" }}>
                      <img
                        style={{ height: "100%", width: "auto" }}
                        src={salon.image}
                        alt="..."
                      />
                    </div>
                    <div className="column is-6 pt-5">
                      <div className="pb-2 mb-3">
                        <h2
                          style={{ color: "#134068" }}
                          className="is-size-1 has-text-weight-semibold"
                        >
                          {salon.nameSalon}
                        </h2>
                        <p className="is-size-5 font-weight-bold">
                          Open:{" "}
                          <span className="text-danger">
                            Mon-Sun {salon.timeOpen} - {salon.timeClose}
                          </span>
                        </p>
                        <p>
                          <span className="is-size-5 font-weight-bold">
                            Phone number:{" "}
                          </span>
                          <span
                            className="is-size-5 is-underlined"
                            style={{ color: "#134068" }}
                          >
                            {salon.phone}
                          </span>
                        </p>
                        <p>
                          <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                          <span
                            className="is-size-5 font-weight-bold"
                            style={{ color: "#134068" }}
                          >
                            {salon.detailAddress}
                          </span>
                        </p>
                        <p>{salon.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundImage: "url(" + paperbg + ")",
                minHeight: "35rem",
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
                    <Tab
                      className="font-weight-bold"
                      label="Services"
                      value="1"
                    />
                    <Tab
                      className="font-weight-bold"
                      label="Review"
                      value="2"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div style={{ overflowY: "scroll", height: "700px" }}>
                    {serviceList?.data?.map((service) => (
                      <div
                        className="card mb-3"
                        style={{
                          width: "98%",
                          background: "url(" + paperbg + ")",
                          height: "12rem",
                          borderRadius: "25px",
                        }}
                        key={service.serviceId}
                      >
                        <div className="columns">
                          <div className="column is-3">
                            <img
                              src={
                                service.image ? service.image : imageUnavailable
                              }
                              alt="..."
                              style={{
                                height: "100%",
                                width: "100%  ",
                                maxHeight: "12rem",
                                borderRadius: "25px",
                              }}
                            />
                          </div>
                          <div className="column is-7 mt-2 has-text-left">
                            <div>
                              <h4 className="has-text-info-dark is-size-4 has-text-weight-bold">
                                {service.name} -{" "}
                                <span className="has-text-link-dark is-size-5">
                                  {service.content}
                                </span>
                              </h4>

                              <p className="is-size-5 has-text-dark">
                                {service.service_time} minutes
                              </p>
                              {service.promotion === 0 && (
                                <p className="has-text-danger has-text-weight-semibold">
                                  {" "}
                                  {currencyFormatter.format(service.price)}{" "}
                                </p>
                              )}

                              {service.promotion !== 0 && (
                                <p className="has-text-grey-light has-text-weight-semibold">
                                  <del>
                                    {" "}
                                    {currencyFormatter.format(
                                      service.price
                                    )}{" "}
                                  </del>

                                  <span className="has-text-danger-dark has-text-weight-semibold">
                                    {" "}
                                    {"-> "}
                                    {currencyFormatter.format(
                                      service.price -
                                        (service.price / 100) *
                                          service.promotion
                                    )}{" "}
                                  </span>
                                  <span className="tag is-danger has-text-weight-semibold">
                                    {" "}
                                    {service.promotion} %
                                  </span>
                                </p>
                              )}
                              <p className="">{service.description}</p>
                            </div>
                          </div>
                          <div className="column is-2 mt-3 has-text-right">
                            <Link
                              to={`/staff/${service.salonId}`}
                              style={{ width: "100px" }}
                              className="button mr-3 is-info is-rounded font-weight-bold"
                              onClick={() =>
                                dispatch(updateSelectedService(service))
                              }
                            >
                              Book
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="has-text-right w-100 pr-5 mb-5">
                    <button
                      className="button is-info is-rounded"
                      onClick={handleOpenReview}
                    >
                      Write review
                    </button>
                  </div>
                  <div className="row pt-5 ">
                    <div className="col-8">
                      {serviceList?.dataSalon?.map((data) => (
                        <div className="row">
                          <div className="pl-4 pb-4 col-4 text-center">
                            <div
                              className="font-weight-bold"
                              style={{ fontSize: "1.5rem" }}
                            >
                              <label>{data.AverangeVote}/5</label>
                            </div>
                            <div>
                              <Rating
                                name="simple-controlled"
                                value={data.AverangeVote}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                            <div>
                              <p>
                                <span className="font-weight-bold">145 </span>
                                rating {"&"} review
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-1 font-weight-bold pr-0 pl-5">
                      <label>Rating:</label>
                    </div>
                    <div className="col-3 pl-2">
                      <Rating
                        name="simple-controlled"
                        value={rate}
                        onChange={(event, newValue) => {
                          setRate(newValue);
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      overflowY: "scroll",
                      height: "700px",
                      backgroundColor: "white",
                    }}
                    className="rounded"
                  >
                    {listReview ? (
                      listReview.map((review) => (
                        <div
                          className="m-4 pl-3 pr-3 pt-5 pb-5 mb-5 "
                          style={{
                            backgroundColor: "white",
                            height: "12rem",
                            borderRadius: "25px",
                          }}
                        >
                          <div className="row pt-3 pb-3">
                            <div className="col-6">
                              <h2 className="is-size-5 row">
                                <div
                                  className="is-size-5 ml-4 mt-5 mr-2 has-text-weight-semibold rounded p-2 text-center"
                                  style={{
                                    backgroundColor: "#dddddd",
                                    width: "35px",
                                    height: "35px",
                                  }}
                                >
                                  {review.nameCustomer.charAt(0)}
                                </div>
                                <span className="is-size-5 p-2 mt-5 has-text-weight-semibold">
                                  {review.nameCustomer}
                                </span>
                              </h2>
                            </div>
                            <div className="col-6 has-text-right mt-5 pt-2">
                              <p className=" font-weight-bold">
                                <span>
                                  <i className="fa-regular fa-clock mr-1"></i>
                                </span>
                                {convertISOStringToLocaleDateString(
                                  review.dateCreate
                                )}
                              </p>
                            </div>
                          </div>
                          <div
                            className="rounded p-4"
                            style={{ backgroundColor: "#f3f4f6" }}
                          >
                            <div>
                              <Rating
                                name="half-rating-read"
                                value={review.rate / 2}
                                precision={0.5}
                                readOnly
                              />
                            </div>

                            <div className="pl-1">
                              <p>
                                <span className="font-weight-bold">
                                  Review:{" "}
                                </span>{" "}
                                {review.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        className="text-center pt-5 font-weight-bold"
                        style={{ fontSize: "1.5rem" }}
                      >
                        There are no reviews!
                      </div>
                    )}
                  </div>
                  {/* Modal review */}
                  <Modal
                    open={openReview}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={modalcss}>
                      <div>
                        <form action="" method="post" className="writeReview">
                          <fieldset>
                            <div style={{ marginRight: "100px" }}>
                              <div className="row pt-5">
                                <div className="col-6 has-text-right font-weight-bold">
                                  How do you feel?
                                </div>
                                <div className="col-6">
                                  <Rating
                                    name="simple-controlled"
                                    value={reviewRating}
                                    onChange={(event, newValue) => {
                                      setReviewRating(newValue);
                                    }}
                                  />{" "}
                                </div>
                              </div>
                              <div className="row pt-5">
                                <div className="col-6 has-text-right font-weight-bold">
                                  Share your feelings about the salon:
                                </div>
                                <div className="col-6">
                                  <textarea
                                    id="content"
                                    style={{ resize: "none", width: "100%" }}
                                    className="p-2 border border-dark"
                                    rows="6"
                                    maxLength={200}
                                    value={reviewContent}
                                    onChange={(e) => {
                                      setReviewContent(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>{" "}
                            <div className="text-center">
                              {successMessage && (
                                <p className="text-success">{successMessage}</p>
                              )}
                              {errMess && (
                                <p className="text-danger">{errMess}</p>
                              )}
                              {errEmpty && (
                                <p className="text-danger">{errEmpty}</p>
                              )}
                            </div>
                            <div className="has-text-right">
                              <button
                                className="button is-rounded is-info"
                                onClick={handleCloseReview}
                              >
                                {" "}
                                Close
                              </button>
                              <button
                                className="button is-rounded is-success ml-5"
                                onClick={handleAddNewReview}
                              >
                                Add
                              </button>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </Box>
                  </Modal>
                </TabPanel>
              </TabContext>
            </div>
          </div>
        </div>
        <div className="column is-3"></div>
      </div>
    </div>
  );
}
