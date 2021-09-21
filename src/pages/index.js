import React, { Component } from "react";
import Form from "../components/Form";

import Loader from "../components/common/Loader";
class Landing extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    if (this.state.loading) return <Loader />;

    return (
      <div className="container">
        <Form />
      </div>
    );
  }
}

export default Landing;
