import React, { Component } from "react";
import Filter from "../filterscreen/Filter.jsx";
import Product from "../productscreen/Product";

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: 0,
    };
  }

  filterValue = (val) => {
    this.setState({
      ...val,
      rerender: this.state.rerender + 1,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <Filter filterData={this.filterValue} />
            </div>
            <div className="col-md-9">
              <Product data={this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Display;

//value  passed in this of filter prop
