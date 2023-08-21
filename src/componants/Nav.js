import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import "../styles/nav.css"

const Nav = () => {
  const name = localStorage.getItem("name").toUpperCase();
  const userId = localStorage.getItem("userId");
  return (
    <>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', fontWeight: "400px", fontSize: "20px", color: "#bcbcbc", padding: "0 2.8rem", marginTop: "20px" }}>
        <a href='/home'
          className='align-middle'>
          <p style={{ color: "#bcbcbc" }}
            className='mb-sm-auto mb-0 details '
            id='menu'>
            USER ID: {userId}
          </p>
          </a>
        <div className='nav-item'>
          <span
            className="nav-link align-middle px-0"
            style={{ display: "flex", marginRight: "8%", }}
          >
            <i className='fs-4 bi-house' >
              <div className='dropdown'>
                
                
                <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <FaUserAlt />{name}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" onClick={() => localStorage.clear()} href="/" style={{fontWeight:"500px",backgroundColor:"grey",color:"wheat"}}>Logout</a></li>
  </ul>
</div>
              </div>
            </i>

          </span>
        </div>
      </div>
      <hr style={{ backgroundColor: "#e1f9f4", borderTop: "3px solid rgb(225, 249, 244)", marginBottom: "30px" }} />
    </>
  )
}

export default Nav
