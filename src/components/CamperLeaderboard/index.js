import React from 'react';
import {getData} from './FccActions';
import {Table, TableHeader, SortableColumn, TableStyles as styles} from '../Table';

export default class CamperLeaderboard extends React.Component {
  state = {
    data: [],
    recent_sort_direction: 0,
    alltime_sort_direction: 0
  };
  componentWillMount = () => {
    getData( "recent").then( ( res) => {
      this.setState( { data: this.addIds( res)});
    });
  };

  // add an id rather than use the loop index, or id nos stay 1..n after sort
  // TODO: because we have some recent values that are the same, the id's come out
  // scrambled for recent (but not alltime). we could sort by the id's?
  addIds = ( data) => {
    return data.map( (item, ndx) => {
      return {...item, id: ndx+1};
    });
  };
  handleSort = ( column_label, sort_direction) => {
    if( column_label === "Recent"){
      this.setState( { recent_sort_direction: sort_direction, alltime_sort_direction: 0});
    } else {
      this.setState( { recent_sort_direction:0, alltime_sort_direction: sort_direction});
    }
    // endpoint for url, same name used in data structure
    let ep = "recent";
    if( column_label === "All Time") ep = "alltime";
    getData( ep)
    .then( (res) => {
      let ret = this.addIds( res);
      if( sort_direction === -1){
        ret.sort( ( a, b) => {
          if( a[ep] < b[ep]) return -1;
          if( a[ep] > b[ep]) return 1;
          return 0;
        });
      }
      return ret;
    })
    .then( (res) => {
      this.setState( {data: res});
    });
  };
  render = () => {
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
    return (
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
    );
  };
}
