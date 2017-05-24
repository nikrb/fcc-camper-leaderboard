import React from 'react';
import {getData} from './FccActions';
import {SortableColumn} from '../Table';

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
    const rows = this.state.data.map( ( row, ndx) => {
      return (
        <div className="table_row" key={ndx}>
          <div className="num_small">{row.id}</div>
          <div className="textimg" title={row.username}>
            <img className="img" src={row.img} alt="n/a" />
            {row.username}
          </div>
          <div className="num">{row.recent}</div>
          <div className="num">{row.alltime}</div>
        </div>
      );
    });
    // <div columnLabel="Recent"
    //   handleSort={this.handleSort} sort_direction={this.state.recent_sort_direction} />
    // <div columnLabel="All Time"
    //   handleSort={this.handleSort} sort_direction={this.state.alltime_sort_direction}/>
    return (
      <div className="wrapper">
        <div className="table_row table_row_header">
          <div className="num_small">#</div>
          <div className="textimg">User</div>
          <div className="num">somenumber</div>
          <div className="num">somenumber</div>
        </div>
        <div className="table_scroll">
          {rows}
        </div>
      </div>
    );
  };
}
