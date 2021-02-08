import React, { useEffect } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { deleteFlashMessage } from "../../actions/flash";

function FlashMessage(props) {
    console.log(props)
  const {  type, text } = props.message;

useEffect(() => {
    
     const token = setInterval(() => {
      props.deleteFlashMessage();
    }, 3000);


    return () => clearInterval(token);

  },[]);

  return (
    <div>
      <div
        className={classnames("alert", "text-center", {
          "alert-success": type === "success",
          "alert-danger": type === "error",
        })}
      >
        {text}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      message: state.flash
    };
  };

export default connect(mapStateToProps, {
  deleteFlashMessage: deleteFlashMessage,
})(FlashMessage);