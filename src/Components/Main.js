


import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Burger from './BurgerBuilder/Burger';
import Header from './Header/Header';
import Order from './Order/Order';
import Checkout from './Checkout/Checkout';
import AuthForm from './Auth/AuthForm';
import { authCheckState } from '../Components/redux/AuthActionCreatior';

const Main = ({ onTryAutoSignup, isAuthenticated }) => {
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Routes>
      <Route path='/login' element={<AuthForm />} />
      <Route path='*' element={<Navigate to="/login" />} />
    </Routes>
  );

  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path='/' element={<Burger />} />
        <Route path='/order' element={<Order />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Navigate to="/" />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div>
      <Header />
      <div className='Burger'>
        {routes}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);




