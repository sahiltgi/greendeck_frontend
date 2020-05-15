import React, { Component } from "react";
import "./Product.css";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      errorMessage: "",
      pageNumber: 1,
      rerender: this.props.data.rerender,
    };
  }

  //this.props.data
  getData(pageNumber) {
    let body = {};
    if (
      this.props.data.compareOperator &&
      this.props.data.compareOperator !== "" &&
      this.props.data.discountPercentage &&
      this.props.data.discountPercentage !== 0
    ) {
      body["compareOperator"] = this.props.data.compareOperator;
      body["discountPercentage"] = parseInt(this.props.data.discountPercentage);
    }
    if (this.props.data.brandName && this.props.data.brandName !== "") {
      body["brandName"] = this.props.data.brandName;
    }
    if (
      this.props.data.stockAvailability &&
      this.props.data.stockAvailability !== false
    ) {
      let stockBool =
        this.props.data.stockAvailability === "true" ? true : false;
      body["stockAvailability"] = stockBool;
    }
    if (
      this.props.data.startDate &&
      this.props.data.startDate !== "" &&
      this.props.data.endDate &&
      this.props.data.endDate !== ""
    ) {
      body["startDate"] = this.props.data.startDate;
      body["endDate"] = this.props.data.endDate;
    }
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
    this.getData(this.state.pageNumber);
  }

  refreshData = () => {
    this.setState({
      result: [],
      rerender: this.props.data.rerender,
    });
    this.getData(this.state.pageNumber);
  };

  handlePageChange = (event, page) => {
    this.setState({ pageNumber: page });
    this.getData(page);
  };

  render() {
    const { result, errorMessage } = this.state;
    if (this.state.rerender !== this.props.data.rerender) {
      this.refreshData();
    }
    return (
      <div className="container">
        <div className="d-flex flex-row justify-content-center flex-wrap">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={2000}
          />
          {result.length ? (
            result.map((result) => (
              <div key={result._id}>
                <div className="card mt-5 mr-4 ml-2 mb-3">
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
        <div className="ml-2 mb-3 positionSet">
          <Pagination
            count={409}
            onChange={this.handlePageChange}
            color="primary"
            size="large"
          />
        </div>
      </div>
    );
  }
}

export default Product;
