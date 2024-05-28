// import React from 'react';
// import './Header.css'; // Ensure that Header.css is in the same directory as your component
// import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
// import Logo from '../../assests/logo.png'
// import { NavLink } from 'react-router-dom';

// const Header = () => {
//   return (
//     <div className='Navigation'>
//       <Navbar style={{
//         background: "#D70564",
//         height: "70px",
//       }}>
//         <NavbarBrand href='/'className='mr-auto ml-md-5 Brand'><img src={Logo} alt="Logo" width="80px" /></NavbarBrand>
//         <Nav className='mr-md-5'>
//           <NavItem>
//             <NavLink to='/'  className='NavLink'>Burger Create</NavLink>
           
//           </NavItem>
//           <NavItem>
//             <NavLink to='/Order' className='NavLink'>Order </NavLink>
           
//           </NavItem>
//           <NavItem>
//             <NavLink to='/login' className='NavLink'> Log In</NavLink>
           
//           </NavItem>
//         </Nav>
//       </Navbar>
//     </div>
//   );
// }

// export default Header;



import React from 'react';
import './Header.css'; // Ensure that Header.css is in the same directory as your component
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import Logo from '../../assests/logo.png'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../Components/redux/AuthActionCreatior';

const Header = (props) => {
  return (
    <div className='Navigation'>
      <Navbar style={{
        background: "#D70564",
        height: "70px",
      }}>
        <NavbarBrand href='/' className='mr-auto ml-md-5 Brand'><img src={Logo} alt="Logo" width="80px" /></NavbarBrand>
        <Nav className='mr-md-5'>
          {props.isAuthenticated ? (
            <>
              <NavItem>
                <NavLink to='/' className='NavLink'>Burger Create</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/order' className='NavLink'>Order</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/logout' className='NavLink' onClick={props.logout}>Log Out</NavLink>
              </NavItem>
            </>
          ) : (
            <NavItem>
              <NavLink to='/login' className='NavLink'>Log In</NavLink>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
