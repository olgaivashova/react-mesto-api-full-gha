import React from 'react';
import Header from '../header/Header';
import Main from '../Main/Main';
import Footer from '../footer/Footer';

const ProtectedProfile = ({ profileEmail, onSignout, ...props }) => {
  return (
    <>
      <Header profileEmail={profileEmail} onSignout={onSignout} />
      <Main name="main" {...props} />
      <Footer />
    </>
  );
};

export default ProtectedProfile;
