import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineClear } from "react-icons/md";
import axios from 'axios';
import PropertyList from '../componants/propertyListing/PropertyList';
import PropertySearch from '../componants/propertyListing/PropertySearch';
import Sidebar from '../componants/Sidebar';
import Nav from "../componants/Nav";
import { PropertyContext } from '../componants/Add_property/ContextProvider';



const HomePage = () => {

const {SetIsEdit,SetBasicDetail,SetPropertyDetail,SetGeneral_info,SetLocation_info,SetPageNav} = useContext(PropertyContext);
useEffect(()=>{

  SetBasicDetail(
    {
      property_type: "",
      price: "",
      negotiable: "",
      ownerShip: "",
      property_age: "",
      property_approved: "",
      property_description: "",
      bank_loan: ""
    }
  );
                SetGeneral_info({
                  owner_name: "",
                  mobile: "",
                  postedby: "",
                  saletype: "",
                  featured: "",
                  ppdpackage: ""
                });
                SetLocation_info({
                  email: "",
        city: "",
        addressarea: "",
        pincode: "",
        address: "",
        landmark: "",
        longitude: "",
        latitude: ""
                });
                SetPropertyDetail({
                  length: "",
                  breath: "",
                  area: "",
                  area_unit: "",
                  bhk: "",
                  floor: "",
                  attached: "",
                  western: "",
                  furnished: "",
                  parking: "",
                  lift: "",
                  electricity: "",
                  facing: ""
                });
                // SetAddProperty({

                // });
                SetPageNav("Basic")
},[])
  function clearData() {
    setSearchFlag(false);
    setValues({
      property: "",
      length: 0,
      breadth: 0,
      area: 0,
      imageUrl: "",
      _id: "",
      mobile: "",
      negotiable: "",
      price: "",
      ownership: "",
      propertyAge: "",
      propApproved: "",
      propDescription: "",
      bankLoan: "",
      areaUnit: "",
      bhk: "",
      floorNum: "",
      attached: "",
      westToilet: "",
      furnished: "",
      parking: "",
      lift: "",
      electricity: "",
      facing: "",
      name: "",
      postedBy: "",
      saleType: "",
      package: "",
      ppdPackage: "",
      email: "",
      city: "",
      addArea: "",
      pincode: "",
      address: "",
      landmark: "",
      latitude: "",
      longitude: "",

    });
    
  }
  
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  const [values, setValues] = useState([]);
  const [change, setChange] = useState(true);
  useEffect(() => {
  
  }, [values]);

  function searchingById() {
    let token = localStorage.getItem("token");
    const headers = {
      Authorization: token
    };

    setSearchFlag(true);
    let url = `http://localhost:8080/prop/v1/getproperty/${searchId}`;
    axios
      .get(url,{headers})
      .then((res) => {
        console.log(res.data);
        setValues([res.data.data]);
        setSearchId("");
      })
      .catch((e) => {
        setSearchId("");
        console.log(e);
      });
  }

  function update(details) {
    let data = { status: "Sold" };
    let token = localStorage.getItem("token");
    axios
        .patch(
            `http://localhost:8080/prop/v1/sold/${details._id}`,
            data,
            {
                headers: {
                    'Authorization' : token
                },
            }
        )
        .then((res) => {
            setChange(false);
            setValues([res.data.data])
        })
        .catch((error) => alert("Unable to sell"));
}
  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <Sidebar/>
        <div className='col container' style={{ maxWidth: "80%" }}>
          <Nav/>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "40px",
              width: "95%",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
              }}
            >
              <div className='input-group mb-3'>
                <input
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    borderTopLeftRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    marginLeft:"15%",
                    height: "41px"
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Search by Id"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div
                  className='input-group-append'
                  onClick={() => searchingById()}
                >
                  <span
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 19px",
                      cursor: "pointer",
                      borderTopRightRadius: "25px",
                      borderBottomRightRadius: "25px",
                      padding: "20px",
                      height: "18px"
                    }}
                    className="input-group-text"
                    id="basic-addon2"
                  >
                    <AiOutlineSearch />
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                navigate("/addproperty/basic_detail")
                SetIsEdit(false)
              }}
              // className="btn btn-info"
              style={{
                fontSize: "18px",
                display: "flex",
                backgroundColor:"#6AB4F8",
                alignItems: "center",
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.13)",
                justifyContent: "center",
                borderRadius: "35px",
                border:"none",
                paddingLeft:"60px",
                paddingRight:"60px"
              }}
             
            >+ Add Property
            </button>
          </div>
          {searchFlag ? (
            <>
              <div
                className='row'
                style={{
                  display: "flex",
                  margin:"3%",marginLeft:"3.5%",width:"92%",
                  justifyContent: "flex-end",
                  
                  
                }}
              >
                <button
                  type='button'
                  onClick={()=>clearData()}
                  className="btn btn-info"
                  style={{
                    width:"100%",
                    fontSize: "larger",
                    display: "flex",
                    color: "white",
                    alignItems: "center",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    justifyContent: "center",
                    borderRadius: "35px",
                    backgroundColor:"#6AB4F8",
                    border:"none",
                  }}
                >
                  <MdOutlineClear />
                  <span className="ms-1 d-none d-sm-inline">Clear</span>
                </button>
              </div>
              <PropertySearch values={values} update={update} change={change} />
            </>
          ) : (
            <>
              <PropertyList values={values} update={update} change={change} />
            </>
          )}
          </div>
      </div>
    </div>
  );
}

export default HomePage;