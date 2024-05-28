import React from 'react'
import './Ingredient.css'
import BreadTop from '../../../assests/images/top1.png'
import BreadBottom from '../../../assests/images/bottom1.png'
import Chesse from '../../../assests/images/cheese1.png'
import Meat from '../../../assests/images/meat1.png'
import Salad from '../../../assests/images/salad.png'

const Ingredient = props => {
  let ingredients = null;

  switch (props.type) {
    case "Top-of-bread":
      ingredients = <div className='img1'><img src={BreadTop} alt="Top-Bread"/></div> 
      break;

      case "Bottom-of-bread":
        ingredients = <div className='img1'><img src={BreadBottom} alt="Bottom-Bread"/></div>
        break;

        case "Cheese-of-bread":
        ingredients = <div className='img1'><img src={Chesse} alt="Cheese"/></div>
        break;

        case "Meat-of-bread":
        ingredients = <div className='img1'><img src={Meat} alt="Meat"/></div>
        break;

        case "Salad-of-bread":
        ingredients = <div className='img1'><img src={Salad} alt="Salad" className='Salad'/></div>
        break;
  
    default:
      ingredients = null
  }


  return (
    <div className='Ingredient'>
      {ingredients}
      
    </div>
  )
}

export default Ingredient
