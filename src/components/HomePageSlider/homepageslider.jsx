<<<<<<< HEAD
import React from "react";
import "./homepageslider.css";
import { Link } from "react-router-dom";
const Homepageslider = () => {
  return (
    
    <div className="sellcontainer">
      <div className="left-content">
        <h3>Ready to Sell Your Car Today?</h3>
        <p>
          Join thousands of successful sellers and get the best deal for your
          car in just a few clicks!
        </p>
        <Link to="/sellcar">
        <button>Start Selling Now <strong>→</strong></button>
        </Link>
      </div>

      <div className="right-content">
        <img
          src="https://s3-alpha-sig.figma.com/img/452a/ec23/9a0fe53d8b65ea54238738035e27648e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RG383RiVdNt3n9JZdpgoZdFMydqjgqATT5cOw2dG2T0Vuduy71Ci25bokBpxbgCgQ5-bBT9jxTiIcbbO1jJVCNJtmTH48SUyG7Gguvt2q-bOijxVL6Wc8BWO2vJK2GXfRqQi-CM8OVmC4wiqNFdpaoFULweOf38yy~-iLPIg0YoV6MHUJ42q5TnoyH0uEwIB1t9HchOgqZHVpuIv3PhjIqfDnrmYZqxcOdJX5YgSo~QNh~K5kc1lFeeP2I4Wber0YmW4EowmBK7IwNR0Y7OljQuYVFW15NRG1OKggFfgwRmK-~qblhpb0AYSTHeDZEm8tZhYZcNxTqrnfJjeBaH3Zw__"
          alt="Description of image"
        />
      </div>

    </div>
  );
};

export default Homepageslider;
=======
import React from 'react'
import './homepageslider.css';
const Homepageslider = () => {
  return (
    <div className='slider'>
     <div className='content'>
         <h3>Ready to Sell Your Car Today?</h3>
     </div>
    </div>
  )
}

export default Homepageslider
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
