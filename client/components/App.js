import React, { Component } from "react";
import reviewApiCall from "./api";
import style from "../CSS/app.css";
import ReviewsNav from "./ReviewsNav";
import ReviewsHeader from "./ReviewsHeader";
import Review from "./Review";
import Rating from "./Rating";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      currentPlace: 0,
      currentReviews: [],
      total: 0,
      average: 0,
      error: false,
      cleanliness: 0,
      communication: 0,
      value: 0,
      accuracy: 0,
      checkIn: 0,
      location: 0,
    };

    this.currentForward = () => {
      let current = this.state.reviews.slice(
        this.state.currentPlace + 7,
        this.state.currentPlace + 14
      );
      this.setState({
        currentPlace: this.state.currentPlace + 7,
        currentReviews: current,
      });
    };

    this.currentBackword = () => {
      let current = this.state.reviews.slice(
        this.state.currentPlace - 7,
        this.state.currentPlace
      );
      this.setState({
        currentPlace: this.state.currentPlace - 7,
        currentReviews: current,
      });
    };
  }

  componentDidMount() {
    let endPoint = window.location.href.split("=");
    console.log(window.location.href);
    console.log(endPoint);

    reviewApiCall(endPoint[1])
      .then((result) => {
        console.log("reviewapi result", result);
        this.setState(result);
      })
      .catch((e) => {
        console.log(e);
        this.setState(e);
      });
  }

  render() {
    return (
      <div className={style.app}>
        <ReviewsHeader average={this.state.average} total={this.state.total} />
        <div className={style.ratingHolderDiv}>
          <Rating
            name={{ name: "Cleanliness" }}
            score={this.state.cleanliness}
          />
          <Rating
            name={{ name: "Communication" }}
            score={this.state.communication}
          />
          <Rating name={{ name: "Value" }} score={this.state.value} />
          <Rating name={{ name: "Accuracy" }} score={this.state.accuracy} />
          <Rating name={{ name: "Check-in" }} score={this.state.checkIn} />
          <Rating name={{ name: "Location" }} score={this.state.location} />
        </div>
        {this.state.currentReviews.map((review, i) => (
          <Review review={review} key={i} />
        ))}
        {this.state.reviews.length > 0 && (
          <ReviewsNav
            currentPlace={this.state.currentPlace}
            currentForward={this.currentForward}
            currentBackword={this.currentBackword}
            reviews={this.state.reviews}
          />
        )}
      </div>
    );
  }
}

export default App;
