import React from 'react';
import {getData} from './FccActions';
import SortableColumn from './SortableColumn';
import styles from './TableStyles';

export default class CamperLeaderboard extends React.Component {
  state = {
    columns: [{label: "#", sortby: true}, {label: "Name", sortby: false},
     {label: "30", sortby: false}, {label: "All", sortby: false}],
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
    console.log( `sort label[${column_label}] dir[${sort_direction}]`);
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
    const rows = this.state.data.map( ( row, ndx) => {
      return (
        <div style={styles.table_row} key={ndx}>
          <div style={styles.num_small}>{row.id}</div>
          <div style={styles.textimg} title={row.username}>
            <img style={img} src={row.img} alt="n/a" />
            {row.username}
          </div>
          <div style={styles.num}>{row.recent}</div>
          <div style={styles.num}>{row.alltime}</div>
        </div>
      );
    });
    return (
      <div style={{...styles.table, marginTop: "10px"}}>
        <div style={{...styles.table_row, ...styles.table_row_header}}>
          <div style={styles.num_small}>#</div>
          <div style={styles.textimg}>User</div>
          <SortableColumn style={styles.num} columnLabel="Recent"
            handleSort={this.handleSort} sort_direction={this.state.recent_sort_direction} />
          <SortableColumn style={styles.num} columnLabel="All Time"
            handleSort={this.handleSort} sort_direction={this.state.alltime_sort_direction}/>
        </div>
        {rows}
      </div>
    );
  };
}
