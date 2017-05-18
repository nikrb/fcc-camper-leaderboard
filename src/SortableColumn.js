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
    const pointer = {
      cursor: "pointer"
    };
    return (
      <div className={this.props.columnClass} style={pointer}
        onClick={this.handleClick}>
        {this.props.columnLabel}{this.props.dirSymbol}
      </div>
    );
  };
}
