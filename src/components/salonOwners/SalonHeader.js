import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/creators/auth";


export default function SalonHeader() {

    const salonHeader ={
        backgroundColor:"#8f634f"
    }

    const dispatch=useDispatch();
    const handleLogout = () => {
        dispatch(logout("token"));
      };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style={salonHeader}>
        <span class="navbar-brand" href="#">
          House of Gentlemen
        </span> 

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto"></ul>
          <form class="form-inline my-2 my-lg-0">
            <Link className="text-reset" to="/">
              <button className="border-0 rounded" onClick={handleLogout}>
                Logout
              </button>
            </Link>
          </form>
        </div>
      </nav>
    </div>
  );
}
