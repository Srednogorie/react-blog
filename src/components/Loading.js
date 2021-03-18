import Loader from "react-loader-spinner";
import React from "react";

function Loading() {
    return (
        <Loader className="custom-loader" type="Circles" color="#fd6851" height={50} width={50} timeout={30000} />
    )
}

export default Loading;
