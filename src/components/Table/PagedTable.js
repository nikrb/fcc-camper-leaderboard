import React from 'react';
import {Pager} from '../Table';

export default class PagedTable extends React.Component {
  state = {
    current_page_no: 0
  };
  handlePageSelect = ( new_page_no) => {
    this.setState( {current_page_no: new_page_no});
    this.props.handlePageSelect( new_page_no);
  };
  render = () => {
    const container = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    };
    return (
      <div style={container}>
        <Pager handlePageSelect={this.handlePageSelect}
          total_rows={this.props.total_rows} display_count={this.props.display_count}
          current_page_no={this.state.current_page_no} />
        {this.props.children}
        <Pager handlePageSelect={this.handlePageSelect}
          total_rows={this.props.total_rows} display_count={this.props.display_count}
          current_page_no={this.state.current_page_no} />
      </div>
    );
  };
}
