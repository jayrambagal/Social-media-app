import { DoneAllOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const ToastMsg = (props) => {
  const mode = useSelector((state) => state.mode);

  const showToastMessage = () => {
    toast.info(props.massage, {
      position: props.position,
      autoClose: props.time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(()=>{
    if(props.visible){
        showToastMessage()
    }
  },[props.visible])
  

  return (
    <div>      
      {mode === "dark" ? (
        <ToastContainer
          icon={props.icon}
          progressStyle={{ backgroundColor: "#00D5FA" }}
          toastStyle={{ backgroundColor: "#333333" }}
        />
      ) : (
        <ToastContainer
          icon={props.icon}
          progressStyle={{ backgroundColor: "#00D5FA" }}
          toastStyle={{ backgroundColor: "#F0F0F0" , color:"#757575" }}
        />
      )}
    </div>
  );
};

ToastMsg.defaultProps = {
icon:<DoneAllOutlined/>,
position:"top-center"
}

export default ToastMsg;
