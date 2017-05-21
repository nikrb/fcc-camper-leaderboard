import React from 'react';
import styles from './TableStyles';

export default (props) => {
  return (
    <div style={{...styles.table_row, ...styles.table_row_header}} >
      {props.children}
    </div>
  );
};
