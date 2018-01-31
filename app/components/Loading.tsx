import * as React from "react";

const styles = {
  content: {
    textAlign: "center",
    fontSize: "35px"
  }
};

interface LoadingProps {
  text?: string;
}

interface LoadingState {
  text?: string;
}

class Loading extends React.Component<LoadingProps, LoadingState> {
  constructor(props: LoadingProps) {
    super(props);

    props.text
      ? (this.state = { text: props.text })
      : (this.state = { text: "Loading" });
  }

  componentDidMount() {
    const stopper = this.props.text + "...";
    this.interval = window.setInterval(() => {
      if (this.state.text == stopper) {
        this.setState({
          text: this.props.text
        });
      } else {
        this.setState(prevState => {
          return {
            text: prevState.text + "."
          };
        });
      }
    }, 300);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

// Loading.defaultProps = {
//   text: "Loading"
// };

export default Loading;
