import React from 'react';
import PropTypes from 'prop-types';

export default class Pager extends React.Component {
  state = {
    current_page_no: 0
  };
  static propTypes = {
    total_rows: PropTypes.number,
    display_count: PropTypes.number,
    handlePageSelect: PropTypes.func
  };
  total_pages = 0;
  handleClick = ( e) => {
    let new_page_no = this.state.current_page_no;
    switch( e.target.value){
      case 'first_page':
        new_page_no = 0;
        break;
      case 'prev_page':
        new_page_no -= 1;
        break;
      case 'next_page':
        new_page_no += 1;
        break;
      case 'last_page':
        new_page_no = this.total_pages-1;
        break;
      default:
        new_page_no = parseInt( e.target.value, 10);
        break;
    }
    this.setState( {current_page_no: new_page_no}, () => {
      console.log( "set current_page_no:", this.state.current_page_no);
      this.props.handlePageSelect( new_page_no);
    });
  };
  render = () => {
    const wrapper = {
      display: "flex",
      flexDirection: "row",
      margin: "10px 0"
    };
    const btn = {
      backgroundColor: "rgba( 64,64,192,0.5)",
      borderRadius: "10px"
    };
    const { total_rows, display_count} = this.props;
    console.log( `pager current_page_no [${this.state.current_page_no}]`);
    // FIXME: check edges
    this.total_pages = total_rows / display_count;

    const numbered_page_buttons = Array.from({length: this.total_pages}, (v, i) => {
      return (
        <button key={i} type="button" style={btn} onClick={this.handleClick}
          disabled={this.state.current_page_no === i}  value={i} >
          {i+1}
        </button>
      );
    });
    const left_arrow = String.fromCharCode( 9664);
    const right_arrow = String.fromCharCode( 9654);
    return (
      <div style={wrapper}>
        <button type="button" style={btn} onClick={this.handleClick}
          value='first_page' disabled={this.state.current_page_no === 0} >
            {left_arrow+left_arrow}
        </button>
        <button type="button" style={btn} onClick={this.handleClick}
          value='prev_page' disabled={this.state.current_page_no === 0} >
            {left_arrow}
        </button>
        {numbered_page_buttons}
        <button type="button" style={btn} onClick={this.handleClick}
          value='next_page' disabled={this.state.current_page_no === this.total_pages} >
            {right_arrow}
        </button>
        <button type="button" style={btn} onClick={this.handleClick}
          value='last_page' disabled={this.state.current_page_no === this.total_pages} >
            {right_arrow}{right_arrow}
        </button>
      </div>
    );
  };
}
