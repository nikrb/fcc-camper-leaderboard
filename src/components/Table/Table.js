import React from 'react';
import styles from './TableStyles';

export default (props) => {
  return (
    <div style={{...styles.table, ...props.style}}>
      {props.children}
    </div>
  );
};
