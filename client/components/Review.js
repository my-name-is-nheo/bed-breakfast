import React from "react";
import { format, parseISO } from "date-fns";
import style from "../CSS/review.css";

const Review = ({ review }) => {
  console.log(review.date);
  // var result = format(parseISO(review.date), "MMMM yyyy");
  return (
    <div className={style.reviewOuterDiv}>
      <div className={style.topOfReview}>
        {/* <img
          className={style.image}
          height="48"
          width="48"
          src={review.userProfile.imageUrl}
        /> */}
        <div className={style.nameDate}>
          {/* <p>{review.userProfile.name}</p> */}
          {/* <p className={style.date}>{result}</p> */}
          <p className={style.date}>{review.date}</p>
        </div>
      </div>
      <p className={style.reviewParagraph}>{review.body}</p>
    </div>
  );
};

export default Review;
