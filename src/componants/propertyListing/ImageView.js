import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'

function ImageView({ path }) {
  console.log(path);
    return (
     <>
      
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <img alt='' src={path} style={{ width: "100%", height: "100%" }} />
      </div>
      
     </>
    );
  }
  
  export default ImageView;