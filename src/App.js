import React, { Component } from 'react';
import {getData} from './FccActions';
import SortableColumn from './SortableColumn';
import './App.css';

class App extends Component {
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
        <div className="table-row" key={ndx}>
          <div className="num_small">{row.id}</div>
          <div className="text" title={row.username}>
            <img style={img} src={row.img} alt="n/a" />
            {row.username}
          </div>
          <div className="num">{row.recent}</div>
          <div className="num">{row.alltime}</div>
        </div>
      );
    });
    const small_italic = {
      fontSize: "0.5em",
      fontStyle: "italic",
      marginLeft: "1em"
    };
    const header1 = {
      fontSize:"1.5em",
      fontWeight:"bold"
    };
    return (
      <div className="App">
        <div className="App-header">
          <span style={header1}>FreeCodeCamp LeaderBoard</span>
          <span style={small_italic} >
            <a href="https://hashnode.com/post/really-responsive-tables-using-css3-flexbox-cijzbxd8n00pwvm53sl4l42cx" target="_blank">
              really responsive tables
            </a>
          </span>
        </div>
        <div className="container-fluid" style={{marginTop: "10px"}}>
          <div className="table-row header">
            <div className="num_small">#</div>
            <div className="text">User</div>
            <SortableColumn columnClass="num" columnLabel="Recent"
              handleSort={this.handleSort} sort_direction={this.state.recent_sort_direction} />
            <SortableColumn columnClass="num" columnLabel="All Time"
              handleSort={this.handleSort} sort_direction={this.state.alltime_sort_direction}/>
          </div>
          {rows}
        </div>
      </div>
    );
  };
}

export default App;
