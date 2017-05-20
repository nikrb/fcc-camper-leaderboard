import React from 'react';

export default class SortableColumn extends React.Component {
  sort_direction = 0
  handleClick = (e) => {
    let nsd = 1;
    if( this.sort_direction === 1){
      nsd = -1;
    }
    this.sort_direction = nsd;
    this.props.handleSort( this.props.columnLabel, nsd);
  };
  render = () => {
    const pointer = {
      cursor: "pointer"
    };
    this.sort_direction = this.props.sort_direction;
    let dir_symbol = "";
    if( this.sort_direction === 1) dir_symbol = String.fromCharCode( "9660");
    if( this.sort_direction === -1) dir_symbol = String.fromCharCode( "9650");
    return (
      <div className={this.props.columnClass} style={pointer}
        onClick={this.handleClick}>
        {this.props.columnLabel}{dir_symbol}
      </div>
    );
  };
}
