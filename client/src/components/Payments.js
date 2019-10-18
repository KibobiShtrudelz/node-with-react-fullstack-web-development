import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import * as actions from "../actions";

const Payments = props => (
  <StripeCheckout
    amount={500}
    name="Emaily"
    description="$5 for 5 email credits"
    token={token => props.handleToken(token)}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
  >
    <button className="btn">Add Credits</button>
  </StripeCheckout>
);

const mapDispatchToProps = dispatch => ({
  handleToken: token => dispatch(actions.handleToken(token))
});

export default connect(
  null,
  mapDispatchToProps
)(Payments);
