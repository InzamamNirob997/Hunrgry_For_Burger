import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import './Burger1.css';

const BurgerContentSlash = props => {
  // Create a new array containing JSX elements
  let ingredientArray = props.data.map(item =>{
    let amountArray = [...Array(item.amount).keys()]
     return amountArray.map(_ =>{
      return <Ingredient type = {item.type} key ={Math.random()}/>

     })
  })
  .reduce((arr, element)=> {
    return arr.concat(element)
  }, [])
  
  if(ingredientArray.length === 0){
    ingredientArray = <p>Add something on your burger</p>
  }

  

  
 

  return (
    <div className='Burger'>
      <Ingredient type ='Top-of-bread'/>
      {ingredientArray}
      <Ingredient type ='Bottom-of-bread'/>
    </div>
  );
}


export default BurgerContentSlash;
