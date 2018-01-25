const React = require("react");
const PropTypes = require("prop-types");


/* STATELESS FUNCTIONAL COMPONENT */
function SelectLanguage(props) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];    
  
  return (
    <ul className="languages">
      {languages.map(elem => {
        return (
          <li 
            style={elem === props.selectedLanguage ? {color: "#d0021b"}: null}
            key={elem}
            onClick={props.onSelect.bind(null, elem)}
          >
            {elem}
          </li>
        );
      })}
    </ul>
  )
}


SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}


class Popular extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All"
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang
    });
  }

  render() {

    return (
      <div>
        <SelectLanguage 
          onSelect={this.updateLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />
      </div>  
    );
  }
}

module.exports = Popular;