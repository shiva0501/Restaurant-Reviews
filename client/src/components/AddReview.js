import React, { useState } from "react";
import RestaurantDataService from '../services/restaurants';
import { Link } from 'react-router-dom';
import Restaurants from "./Restaurants";

export default function AddReview(props){
    let initialReviewState = "";
    let editing = false;

    if(props.location.state && props.location.state.currentReview) {
        editing = true;
        initialReviewState = props.location.state.currentReview.text
    }

    const [ review, setReview ] = useState(initialReviewState);
    const [ submitted, setSubmitted ] = useState(false);

    const saveReview = () => {
        var data = {
            text: review,
            name: props.user.name,
            user_id: props.user.id,
            restaurant_id: props.match.params.id
        }
        
        if(editing) {
            data.review_id = props.location.state.currentReview._id;
            RestaurantDataService.updateReview(data)
              .then(response => {
                  setSubmitted(true);
                  console.log(response.data)
              })
              .catch(e => {
                  console.log(e);
              })
        } else {
            RestaurantDataService.createReview(data)
              .then(response => {
                  setSubmitted(true);
                  console.log(response.data);
              })
              .catch( e => {
                  console.log(e);
              });
        }
    }

    return(
        <div>
            {props.user ? (
                <div className="submit-form">
                { submitted ? (
                    <div>
                        <h4>You submiited successfully!</h4>
                        <Link to={"/restaurants/"+props.match.params.id} className="btn btn-success">
                            Back to Restaurant
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="description">{ editing ? "Edit": "Create"} Review </label>
                            <input type="text" className="form-control" id="text" required value={review} onChange={(e) => setReview(e.target.value)} />
                        </div>
                        <button onClick={saveReview} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
                </div>
            ) : (
                <div>
                    Please log in.
                </div>
            )}
        </div>
    );
}