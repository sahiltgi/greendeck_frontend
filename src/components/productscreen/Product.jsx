import React, { Component } from "react";
import "./Product.css";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      errorMessage: "",
      pageNumber: 1,
    };
  }

  //this.props.data
  getData() {
    console.log(this.props.data);
    const { pageNumber } = this.state;
    const body = JSON.stringify({
      discountPercentage: this.props.data.discountPercentage,
      compareOperator: this.props.data.compareOperator,
      brandName: this.props.data.brandName,
      stockAvailability: this.props.data.stockAvailability,
      startDate: this.props.data.startDate,
      endDate: this.props.data.endDate,
    });
    axios
      .post(
        `https://shoppingbackend-20.herokuapp.com/api/filter?pageNumber=${pageNumber}`,
        {
          responseType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body,
        }
      )
      .then((response) => {
        this.setState({
          result: response.data.result,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: "Error in retreiving data" });
      });
  }

  componentDidMount() {
    this.getData();
  }

  handlePageChange = (event, page) => {
    this.getData();
    this.setState({ pageNumber: page });
  };

  render() {
    const { result, errorMessage } = this.state;
    return (
      <div className="container">
        <div className="d-flex flex-row justify-content-center flex-wrap">
          {result.length ? (
            result.map((result) => (
              <div key={result._id}>
                <div className="card mt-5 mr-4 ml-2 mb-5">
                  <img
                    className="card-img-top"
                    src={result.media.standard[0].url}
                    alt="Card cap"
                  />
                  <div className="card-body">
                    <h6 className="card-title overflow-hidden">
                      {result.name}
                    </h6>
                    <p className="card-title">
                      {result.price.regular_price.value}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>{errorMessage}</div>
          )}
        </div>
        <Pagination
          count={409}
          onChange={this.handlePageChange}
          color="primary"
        />
      </div>
    );
  }
}

export default Product;
