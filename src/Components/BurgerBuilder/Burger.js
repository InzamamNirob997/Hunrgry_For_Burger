// import React, { Component } from 'react';
// import BurgerContentSlash from './Burger Content/BurgerContentSlash';
// import Control from './Controls/Control';
// import { Modal,ModalHeader,ModalFooter,ModalBody, Button } from 'reactstrap';
// import Summary from '../Summary/Summary';
// import { Navigate } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { addIngredient, removeIngredient, updatePurchaseable} from '../../Components/redux/ActionCreator'





// const mapStateToProps = state => {
//   return {
//     data: state.data,
//     totalPrice: state.totalPrice,
//     purchaseable: state.purchaseable

//   }

// }





// const mapDispatchToProps = dispatch =>{
//   return {
//     addIngredient: (ingtype) => dispatch(addIngredient(ingtype)),
//     removeIngredient: (ingtype) => dispatch(removeIngredient(ingtype)),
//     updatePurchaseable: () => dispatch(updatePurchaseable()),
//   }
// }





// class Burger extends Component {
//   state = {

//     modalOpen: false,
    
//     onClickCheckout: false,
//   };


  

//   addIngredientHandle = type => {

//     this.props.addIngredient(type)
//     this.props.updatePurchaseable()
    
//   };
  

//   removeIngredientHandle = (type) => {
  
//     this.props.removeIngredient(type)
//     this.props.updatePurchaseable()
//   };




//   toggleOpen = ()=>{
//     this.setState({
//       modalOpen: !this.state.modalOpen

//     })

//   }




//   handleClick = () => {
//    this.setState({
//     onClickCheckout: true
//    })
//   }
  




//   render() {
//     return (
//       <div>
//         <div className='d-flex flex-md-row flex-column'>
//         <BurgerContentSlash data={this.props.data}/> 
//         <Control 
//         ingredientContent={this.addIngredientHandle} 
//         removeIngredientContent={this.removeIngredientHandle}
//         price ={this.props.totalPrice}
//         toggleOpen={this.toggleOpen}
//         purchaseable={this.props.purchaseable}
        
//         />
//       </div>
//       <Modal isOpen ={this.state.modalOpen}>
//         <ModalHeader>Your order summary</ModalHeader>
//         <ModalBody>
//           <h5>Total price: {this.props.totalPrice}</h5>
//           <Summary data ={this.props.data}/>
//         </ModalBody>
//         <ModalFooter>
//           <Button  style = {{backgroundColor: "#D70564"}} onClick={this.handleClick}>Continue to CheckOut</Button>
//           <Button color='secondary' onClick={this.toggleOpen}>Order Cancel</Button>
//         </ModalFooter>
//         {this.state.onClickCheckout && <Navigate to="/Checkout" replace ={true}/>}

//       </Modal>

//       </div>
      
//     );
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Burger)



import React from 'react';
import BurgerContentSlash from './Burger Content/BurgerContentSlash';
import Control from './Controls/Control';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import Summary from '../Summary/Summary';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchaseable } from '../../Components/redux/ActionCreator';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook

const mapStateToProps = state => {
  return {
    data: state.data,
    totalPrice: state.totalPrice,
    purchaseable: state.purchaseable
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (ingtype) => dispatch(addIngredient(ingtype)),
    removeIngredient: (ingtype) => dispatch(removeIngredient(ingtype)),
    updatePurchaseable: () => dispatch(updatePurchaseable()),
  }
}

const Burger = ({ data, totalPrice, purchaseable, addIngredient, removeIngredient, updatePurchaseable }) => {
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const [modalOpen, setModalOpen] = React.useState(false);
  const [onClickCheckout, setOnClickCheckout] = React.useState(false);

  const addIngredientHandle = type => {
    addIngredient(type);
    updatePurchaseable();
  };

  const removeIngredientHandle = (type) => {
    removeIngredient(type);
    updatePurchaseable();
  };

  const toggleOpen = () => {
    setModalOpen(!modalOpen);
  }

  const handleClick = () => {
    setOnClickCheckout(true);
  }

  // Navigate to Checkout page when onClickCheckout becomes true
  React.useEffect(() => {
    if (onClickCheckout) {
      navigate('/Checkout');
    }
  }, [onClickCheckout, navigate]);

  return (
    <div>
      <div className='d-flex flex-md-row flex-column'>
        <BurgerContentSlash data={data} />
        <Control
          ingredientContent={addIngredientHandle}
          removeIngredientContent={removeIngredientHandle}
          price={totalPrice}
          toggleOpen={toggleOpen}
          purchaseable={purchaseable}
        />
      </div>
      <Modal isOpen={modalOpen}>
        <ModalHeader>Your order summary</ModalHeader>
        <ModalBody>
          <h5>Total price: {totalPrice}</h5>
          <Summary data={data} />
        </ModalBody>
        <ModalFooter>
          <Button style={{ backgroundColor: "#D70564" }} onClick={handleClick}>Continue to CheckOut</Button>
          <Button color='secondary' onClick={toggleOpen}>Order Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Burger);
