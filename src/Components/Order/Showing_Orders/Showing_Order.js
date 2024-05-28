import React from 'react'


const Showing_Order = props => {
    const dataSummary = props.order.data.map(item => {
        return (
            <span style={{
                border: "3px solid grey",
                borderRadius: "3px",
                padding: "10px",
                marginRight: "15px",
            }}
            key={item.type}>{item.amount}x <span style={{textTransform:"capitalize"}}>{item.type}</span></span>
        )
    })
  
    return (
        <div style={{
            border: "10px solid grey",
            boxShadow: "2px 2px #888888",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "15px",
            '@media screen and (max-width: 654px)': {
                border: "100px solid grey",
                padding: "200px",
            }
        }}>
            <p>Order Number: {props.order.id}</p>
            <p>Delivery Address: {props.order.customerInfo.deliverAddress}</p>
            <hr />
            {dataSummary}
            <hr />
            <p>Total: {props.order.price}</p>
        </div>
    )
}

export default Showing_Order
