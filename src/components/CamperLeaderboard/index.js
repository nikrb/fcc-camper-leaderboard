import React from 'react';
import {getData} from './FccActions';
import {Table, TableHeader, SortableColumn, TableStyles as styles, Pager} from '../Table';

export default class CamperLeaderboard extends React.Component {
  state = {
    data: [],
    recent_sort_direction: 0,
    alltime_sort_direction: 0,
    start: 0,
    count: 10
  };
  total_rows = 0;
  componentWillMount = () => {
    this.fetchData( "recent", 0, this.state.count, "", 0).then( ( res) => {
      this.setState( { data: res});
    });
  };

  fetchData = ( endpoint, start, count, sort_column, sort_direction) => {
    return getData( endpoint, start, count, sort_column, sort_direction)
    .then( (res) => {
      // FIXME: bad practice to mutate here?
      this.total_rows = res.total_rows;
      return res.data;
    });
  };
  handleSort = ( column_label, sort_direction) => {
    // ok so yes the sort_column is the same as the endpoint, but we don't always
    // want to sort me thinx
    let sort_column = "";
    if( column_label === "Recent"){
      sort_column = "recent";
      this.setState( { recent_sort_direction: sort_direction, alltime_sort_direction: 0});
    } else {
      sort_column = "alltime";
      this.setState( { recent_sort_direction:0, alltime_sort_direction: sort_direction});
    }
    // endpoint for url, same name used in data structure
    let ep = "recent";
    if( column_label === "All Time") ep = "alltime";
    this.fetchData( ep, this.state.start, this.state.count, sort_column, sort_direction)
    .then( (res) => {
      this.setState( {data: res});
    });
  };
  handlePageSelected = ( page_no) => {
    const new_start = page_no * this.state.count;
    let sort_column = "";
    let sort_direction = 0;
    // check for an active sort
    if( this.state.recent_sort_direction){
      sort_column = "recent";
      sort_direction = this.state.recent_sort_direction;
    } else if( this.state.alltime_sort_direction) {
      sort_column = "alltime";
      sort_direction = this.state.alltime_sort_direction;
    }
    let ep = "recent";
    if( this.state.alltime_sort_direction) ep = "alltime";
    this.fetchData( ep, new_start, this.state.count, sort_column, sort_direction)
    .then( (res) => {
      this.setState( {data: res, start: new_start});
    });
  };
  render = () => {
    const wrapper = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // FIXME: shouldn't this make the wrapper width 100%
      // flex: "1 0 100%"
    };
    const img = {
      maxWidth: "32px",
      marginRight: "10px"
    };
    const num_small = {
      display: "flex",
      justifyContent: "flex-start",
      flexGrow: "0",
      width: "2em",
      marginRight: "20px",
    };
    const textimg = {
      display: "flex", /* or align-items doesn't work */
      alignItems: "center",
      flexGrow: "2",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      paddingRight: "10px",
      width: "180px"
    };
    const num = {
      textAlign: "center",
      width: "80px"
    };
    const rows = this.state.data.map( ( row, ndx) => {
      return (
        <div style={styles.table_row} key={ndx}>
          <div style={num_small}>{row.id}</div>
          <div style={textimg} title={row.username}>
            <img style={img} src={row.img} alt="n/a" />
            {row.username}
          </div>
          <div style={num}>{row.recent}</div>
          <div style={num}>{row.alltime}</div>
        </div>
      );
    });
    const current_page_no = Math.floor( this.state.start/this.state.count);
    return (
      <div style={wrapper}>
        <Pager handlePageSelect={this.handlePageSelected}
          current_page_no={current_page_no}
          total_rows={this.total_rows} display_count={this.state.count} />
        <Table style={{marginTop: "10px"}} >
          <TableHeader>
            <div style={num_small}>#</div>
            <div style={textimg}>User</div>
            <SortableColumn style={num} columnLabel="Recent"
              handleSort={this.handleSort} sort_direction={this.state.recent_sort_direction} />
            <SortableColumn style={num} columnLabel="All Time"
              handleSort={this.handleSort} sort_direction={this.state.alltime_sort_direction}/>
          </TableHeader>
          {rows}
        </Table>
        <Pager handlePageSelect={this.handlePageSelected}
          current_page_no={current_page_no}
          total_rows={this.total_rows} display_count={this.state.count} />
      </div>
    );
  };
}
