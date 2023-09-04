import React from "react";
import Header from "../header/Header";
import Main from "../Main/Main";
import Footer from "../footer/Footer";

const ProtectedProfile = ({ profileEmail, onLogout, ...props }) => {
  return (
    <>
      <Header profileEmail={profileEmail} onLogout={onLogout} />
      <Main name="main" {...props} />
      <Footer />
    </>
  );
};

export default ProtectedProfile;
