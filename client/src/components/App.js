import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

const App = props => {
  useEffect(() => {
    props.fetchUser();
  }, [props]);

  return (
    <BrowserRouter>
      <div className="container">
        <Header />

        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route path="/surveys/new" component={SurveyNew} />
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
