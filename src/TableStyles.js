export default {
  table : {
    boxSizing: "border-box",
    paddingLeft: "15px",
    paddingRight: "15px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  table_row : {
    display: "flex",
    flexDirection: "row",
    flexGrow: "0",
    flexWrap: "wrap",
    width: "calc( 100% - 35px)",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderBottom: "2px solid #e0e0e0",
    borderCollapse: "collapse",
    paddingTop: "5px",
  },
  table_row_header : {
    background: "linear-gradient( 0deg, rgba( 64,64,192,0.8), rgba( 64,64,192,0.5))",
    fontWeight: "bold",
    paddingTop: "8px",
    paddingBottom: "8px",
    userSelect: "none"
  },
  num_small : {
    display: "flex",
    justifyContent: "flex-start",
    flexGrow: "0",
    width: "2em",
    marginRight: "20px",
  },
  textimg : {
    display: "flex", /* or align-items doesn't work */
    alignItems: "center",
    flexGrow: "2",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    paddingRight: "10px",
    width: "180px"
  },
  num : {
    textAlign: "center",
    width: "80px"
  }
};
