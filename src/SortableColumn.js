import React from 'react';

export default class SortableColumn extends React.Component {
  state = {
    sort_direction: 0 // -1 0 +1
  };
  handleClick = (e) => {
    let nsd = 1;
    if( this.state.sort_direction === 1){
      nsd = -1;
    }
    this.setState( { sort_direction: nsd});
    this.props.handleSort( this.props.columnLabel, nsd);
  };
  render = () => {
    let dir_symbol = "";
    switch( this.state.sort_direction){
      case -1:
        dir_symbol = String.fromCharCode( "9660");
        break;
      case 1:
        dir_symbol = String.fromCharCode( "9650");
        break;
      default:
        break;
    }
    const pointer = {
      cursor: "pointer"
    };
    return (
      <div className={this.props.columnClass} style={pointer}
        onClick={this.handleClick}>
        {this.props.columnLabel}{dir_symbol}
      </div>
    );
  };
}
