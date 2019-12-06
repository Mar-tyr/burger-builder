import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.module.css'

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map((ingredient) => {
    return [...Array(props.ingredients[ingredient])].map((_, i) => {
      return <BurgerIngredient type={ingredient} key={ingredient + "_" + i}/>
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  )
};

export default burger;
