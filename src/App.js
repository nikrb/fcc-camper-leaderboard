import React from 'react';
import CamperLeaderboard from './CamperLeaderboard';

export default class App extends React.Component {
  render = () => {
    const app_header = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      background: "linear-gradient( 0deg, rgba( 64,64,192,0.8), rgba( 64,64,192,0.5))",
      padding: "20px",
      color: "white"
    };
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
      <div>
        <div style={app_header}>
          <span style={header1}>FreeCodeCamp LeaderBoard</span>
          <span style={small_italic} >
            <a href="https://hashnode.com/post/really-responsive-tables-using-css3-flexbox-cijzbxd8n00pwvm53sl4l42cx"
              target="_blank">
              really responsive tables
            </a>
          </span>
        </div>
        <CamperLeaderboard />
      </div>
    );
  };
}
