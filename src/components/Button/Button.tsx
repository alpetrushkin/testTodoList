import React from 'react';

type ButtonType = {
   className?: string
   title: string
   callBack: () => void
}

const Button = (props: ButtonType) => {
   const onClickHandler = () => {
      props.callBack()
   }

   return (
      <button className={props.className} onClick={onClickHandler}>{props.title}</button>
   );
};

export default Button;