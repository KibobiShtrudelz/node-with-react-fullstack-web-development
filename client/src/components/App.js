import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = props => {
  useEffect(() => {
    props.fetchUser();
  }, [props]);

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />

          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
