// import React,{Component} from 'react'
// import { connect } from 'react-redux'
// import {fetchData} from '../redux/ActionCreator'
// import Showing_Order from './Showing_Orders/Showing_Order'
// import Spinner from '../Spinner/Sppiner'

// const mapToState = state => {
//  return{
//   orders: state.orders,
//   ordersLoading: state.ordersLoading,
//   ErrorOrder: state.ErrorOrder,
//   token: state.token,
//   userid: state.userid,
//  }
// }


// const mapToDispatch = dispatch => {
//   return{
//     fetchData: (token, userId)=> dispatch(fetchData(token, userId))
//   }
// }

// class Order extends Component {
//   componentDidMount(){
//     this.props.fetchData(this.props.token, this.props.userId)
//   }
//   componentDidUpdate(){
//     console.log(this.props)
//   }
//   render () {
//     let orders = null
//     if(this.props.ErrorOrder) {
//       orders = <p  style={{
//         border: "3px solid grey",
//         width: "100%",
//         boxShadow: "5px 5px #888888",
//         borderRadius: "3px",
//         padding: "10px",
//         marginRight: "15px",
//     }}
      
//       >Sorry Failed to load order!</p>

//     } else {
//       if(this.props.orders.length === 0){
//         <p  style={{
//           border: "3px solid grey",
//           width: "100%",
//           boxShadow: "5px 5px #888888",
//           borderRadius: "3px",
//           padding: "10px",
//           marginRight: "15px",
//       }}
        
//         >You have no orders!</p>

//       } else{
//         orders = this.props.orders.map(order => {
//           return <Showing_Order order = {order} key={order.id}/>
    
//         })

//       }
    

//     }
    
//     return (
//       <div>
//         {this.props.ordersLoading? <Spinner/> : orders}

//       </div>
//     )

//   }
// }
  

// export default connect(mapToState, mapToDispatch)(Order)






import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../redux/ActionCreator';
import Showing_Order from './Showing_Orders/Showing_Order';
import Spinner from '../Spinner/Sppiner';

const mapStateToProps = state => ({
    orders: state.orders,
    ordersLoading: state.ordersLoading,
    ErrorOrder: state.ErrorOrder,
    token: state.token,
    userId: state.userId,
});

const mapDispatchToProps = dispatch => ({
    fetchData: (token, userId) => dispatch(fetchData(token, userId))
});

class Order extends Component {
    componentDidMount() {
        this.props.fetchData(this.props.token, this.props.userId);
    }

    render() {
        let orders = null;
        if (this.props.ErrorOrder) {
            orders = (
                <p style={{
                    border: "3px solid grey",
                    width: "100%",
                    boxShadow: "5px 5px #888888",
                    borderRadius: "3px",
                    padding: "10px",
                    marginRight: "15px",
                }}>
                    Sorry, failed to load orders!
                </p>
            );
        } else if (this.props.orders.length === 0) {
            orders = (
                <p style={{
                    border: "3px solid grey",
                    width: "100%",
                    boxShadow: "5px 5px #888888",
                    borderRadius: "3px",
                    padding: "10px",
                    marginRight: "15px",
                }}>
                    You have no orders!
                </p>
            );
        } else {
            orders = this.props.orders.map(order => (
                <Showing_Order order={order} key={order.id} />
            ));
        }

        return (
            <div>
                {this.props.ordersLoading ? <Spinner /> : orders}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
