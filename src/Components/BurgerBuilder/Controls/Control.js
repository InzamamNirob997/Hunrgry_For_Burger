import React from "react";

import {Card, CardBody, CardFooter, CardHeader, Button} from 'reactstrap'

const Controls = [
    { label: "Salad",  type: "Salad-of-bread" },
    { label: "Cheese", type: "Cheese-of-bread" },
    { label: "Meat",   type: "Meat-of-bread" },
]


const BuildControl = props => {
    return (
    
       <div className="d-flex justify-content-between">
        <div className="mr-auto ml-5" style={{fontWeight:"bold", fontSize:"1.2rem"}}>{props.label}</div>
        <div>
        <button className="btn btn-danger btn-sm m-1"  onClick={props.removed}>Less</button>
        <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
        </div>
       </div>
 
    
    );
}



const Control = props => {
    return (
      <div className="container ml-md-5" style={{textAlign: "center"}}>
        <Card style={{
            marginTop: "30px",
            marginBottom:"30px",
            textAlign: "center",
        }}>
          <CardHeader style={{backgroundColor: "#D70564", color: "white"}}><h2> Add Ingredients </h2></CardHeader>
          <CardBody>
            {Controls.map(item => {
              return (
                <BuildControl
                  label={item.label}
                  type = {item.type}
                  key={Math.random()} // Use a unique identifier instead of Math.random()
                  added={() => props.ingredientContent(item.type)}
                  removed={() => props.removeIngredientContent(item.type)}
                />
              );
            })}
          </CardBody>
          <CardFooter><h5>Price: <strong>{props.price}</strong> BDT</h5></CardFooter>
          <Button style = {{backgroundColor: "#D70564"}} disabled = {!props.purchaseable} onClick={props.toggleOpen}>Order Now</Button>
        </Card>
      </div>
    );
  };
  

export default Control
