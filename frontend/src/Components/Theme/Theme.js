import React, { useState }  from "react";
import Preview from "../Preview/Preview";
import './Theme.css'
import MyForm from "./Themeform";
function Theme(){
    const [popup,setPop]=useState(false)
    const [themeData, setThemeData] = useState({}); // Define your theme data here
    const handleClickOpen=()=>{
        setPop(!popup)
    }
    const closePopup=()=>{
        setPop(false)
    }
  
    return(
        <>
            <button className="theme-btn" onClick={handleClickOpen}>Theme Setting</button>
            <div>
                {
                    popup&& (
                    <div className="main">
                        <div className="popup">
                            <div className="popup-header">
                                <h3>Theme Setting</h3>
                                <h3 className="cursor-pointer" onClick={closePopup}><b style={{"color":"red"}}>x</b></h3>
                            </div>
                            <MyForm closePopup={closePopup}  setThemeData={setThemeData} />
                        </div>
                        </div>
        ) }
       
      {/* Render Preview only when popup is false */}
      {!popup || !<Preview themeData={themeData} />}
      </div>
    
    </>
  );
}
export default Theme;


