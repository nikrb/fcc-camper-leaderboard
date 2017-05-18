import React, { Component } from 'react';
import {getData} from './FccActions';
import SortableColumn from './SortableColumn';
import './App.css';

class App extends Component {
  state = {
    columns: [{label: "#", sortby: true}, {label: "Name", sortby: false},
     {label: "30", sortby: false}, {label: "All", sortby: false}],
    data: []
  };
  componentWillMount = () => {
    getData().then( ( res) => {
      this.setState( { data: res});
    });
  };
  handleSort = ( column_label, sort_direction) => {
    console.log( `sort label[${column_label}] dir[${sort_direction}]`);
  };
  render = () => {
    const img = {
      maxWidth: "32px",
      marginRight: "10px"
    };
    const rows = this.state.data.map( ( row, ndx) => {
      return (
        <div className="table-row" key={ndx}>
          <div className="num_small">{ndx+1}</div>
          <div className="text" title={row.username}>
            <img style={img} src={row.img} alt="n/a" />
            {row.username}
          </div>
          <div className="num">{row.recent}</div>
          <div className="num">{row.alltime}</div>
        </div>
      );
    });
    return (
      <div className="App">
        <div className="App-header">
          <h2>FreeCodeCamp LeaderBoard</h2>
        </div>
        <div className="container-fluid" style={{marginTop: "10px"}}>
          <div className="table-row header">
            <div className="num_small">#</div>
            <div className="text">User</div>
            <SortableColumn columnClass="num" columnLabel="Recent"
              handleSort={this.handleSort} />
            <SortableColumn columnClass="num" columnLabel="All Time"
              handleSort={this.handleSort} />
          </div>
          {rows}
        </div>
      </div>
    );
  };
}

export default App;
