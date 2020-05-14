import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountPercentage: 0,
      compareOperator: "",
      brandName: "",
      stockAvailability: false,
      startDate: "",
      endDate: "",
    };
  }

  submitVal = (e) => {
    e.preventDefault();
    this.props.filterData(this.state);
  };

  discountHandler = (e) => {
    this.setState({ discountPercentage: e.target.value });
  };
  comparatorHandler = (e) => {
    this.setState({ compareOperator: e.target.value });
  };
  brandHandler = (e) => {
    this.setState({ brandName: e.target.value });
  };
  stockHandler = (e) => {
    this.setState({ stockAvailability: e.target.value });
  };
  startDateHandler = (e) => {
    this.setState({ startDate: e.target.value });
  };
  endDateHandler = (e) => {
    this.setState({ endDate: e.target.value });
  };

  render() {
    const {
      discountPercentage,
      compareOperator,
      brandName,
      stockAvailability,
      startDate,
      endDate,
    } = this.state;
    return (
      <div className="container card mt-5" style={{ width: "fit-content" }}>
        <div className="card-body">
          <h6 className="" style={{ textAlign: "center" }}>
            Discount
          </h6>
          <div className="row">
            <div className="col-md-6">
              <TextField
                id="standard-number"
                label="%"
                type="number"
                name="discountPercentage"
                value={discountPercentage}
                onChange={this.discountHandler}
                // InputProps={{
                //   inputProps: {
                //     max: 100,
                //     min: 0,
                //   },
                // }}
              />
            </div>
            <div className="col-md-6 mb-3">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Select</InputLabel>
                <Select
                  native
                  value={compareOperator}
                  name="compareOperator"
                  onChange={this.comparatorHandler}
                >
                  <option aria-label="None" value="" />
                  <option value="greaterThan">Greater Than</option>
                  <option value="lessThan">Less Than</option>
                  <option value="equalTo">Equal</option>
                </Select>
              </FormControl>
            </div>
          </div>
          <h6 className="" style={{ textAlign: "center" }}>
            Brand Search
          </h6>
          <div className="row mb-3">
            <div className="col-md-12">
              <TextField
                id="standard-search"
                label="Name"
                name="brandName"
                type="search"
                value={brandName}
                onChange={this.brandHandler}
                style={{ textAlign: "center" }}
              />
            </div>
          </div>
          <h6 className="" style={{ textAlign: "center" }}>
            Check Availability
          </h6>
          <div className="row mb-3">
            <div className="col-md-12 ml-4">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Available</InputLabel>
                <Select
                  native
                  value={stockAvailability}
                  name="stockAvailability"
                  onChange={this.stockHandler}
                >
                  <option aria-label="None" value="" />
                  <option value={true}>Available</option>
                  <option value={false}>Not Available</option>
                </Select>
              </FormControl>
            </div>
          </div>
          <h6 className="" style={{ textAlign: "center" }}>
            Created Between
          </h6>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="col-md-4">
                <TextField
                  id="date"
                  name="startDate"
                  value={startDate}
                  type="date"
                  onChange={this.startDateHandler}
                />
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-4">
                <TextField
                  id="date"
                  name="endDate"
                  value={endDate}
                  type="date"
                  onChange={this.endDateHandler}
                />
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
          <button
            className="btn btn-primary ml-5"
            type="submit"
            onClick={this.submitVal}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Filter;
