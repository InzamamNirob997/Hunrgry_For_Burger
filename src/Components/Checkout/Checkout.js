



import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../Spinner/Sppiner';
import './Checkout.css';
import { resetIngredient } from '../redux/ActionCreator';

const mapStateToProps = state => {
  return {
    data: state.data,
    totalPrice: state.totalPrice,
    purchaseable: state.purchaseable,
    userId: state.userId,
    token: state.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetIngredient: () => dispatch(resetIngredient())
  }
}

const Checkout = (props) => {
  const { data, totalPrice, purchaseable } = props;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    deliverAddress: "",
    phone: "",
    Payment: "Cash On Delivery"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const inputChangeHandler = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const backToHomePage = () => {
    navigate('/');
  };

  const placeOrder = () => {
    setIsLoading(true);
    const order = {
      data: data,
      customerInfo: values,
      price: totalPrice,
      orderTime: new Date(),
      userId: props.userId,  // Corrected this line
    };
    axios.post(`https://burger-builder-43d6c-default-rtdb.firebaseio.com/orders.json?auth=${props.token}`, order)  // Corrected this line
      .then(response => {
        setIsLoading(false);
        setOrderPlaced(true);
        props.resetIngredient(); // Reset the website
        setTimeout(() => {
          setOrderPlaced(false); // Reset orderPlaced after 3 seconds
          navigate('/'); // Navigate to home page
        }, 2000);
        console.log(response);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'orange', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: "35%" }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Total Payment: {totalPrice} BDT</h2>
          {isLoading ? (
            <Spinner />
          ) : (
            <form>
              <div style={{ marginBottom: '20px' }}>
                <textarea
                  name='deliverAddress'
                  value={values.deliverAddress}
                  className='form-control'
                  placeholder='Your delivery Address'
                  onChange={(e) => inputChangeHandler(e)}
                ></textarea>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <input
                  name='phone'
                  className='form-control'
                  value={values.phone}
                  placeholder='Your phone number'
                  onChange={(e) => inputChangeHandler(e)}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <select
                  name="Payment"
                  className='form-control'
                  value={values.Payment}
                  onChange={(e) => inputChangeHandler(e)}
                >
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Bkash">Bkash</option>
                  <option value="Upay">Upay</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  style={{ backgroundColor: "#D70564", marginRight: "5px" }}
                  onClick={placeOrder} disabled={!purchaseable || isLoading}
                >
                  Place Order
                </Button>
                <Button
                  color="secondary"
                  onClick={backToHomePage}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
        {orderPlaced && (
          <div className="success-message">
            Your order has been placed successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
