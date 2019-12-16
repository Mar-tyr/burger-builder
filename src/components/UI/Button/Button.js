import React from 'react';
import classes from './Button.module.css';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <button
      onClick={props.clicked}
      className={[classes.Button, classes[props.btnType]].join(' ')}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  clicked: PropTypes.func,
  btnType: PropTypes.string,
};

export default Button;
