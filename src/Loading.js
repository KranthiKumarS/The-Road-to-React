import React, { Component } from  'react';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
// import brands from '@fortawesome/fontawesome-free-brands';
// import { faCoffee, faCog, faSpinner, faQuoteLeft, faSquare, faCheckSquare } from '@fortawesome/fontawesome-free-solid';
import { faCog } from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// fontawesome.library.add(brands, faCoffee, faCog, faSpinner, faQuoteLeft, faSquare, faCheckSquare);
fontawesome.library.add(faCog);

class Loading extends Component {

    render() {
      const 
      {
        className,
      } = this.props;
      return (
        <div className={className}>
          <FontAwesomeIcon icon={["fas", "cog"]} spin fixedWidth={false} />
        </div>
      );
    };

}
Loading.propTypes = {
  className: PropTypes.string,
};
Loading.defaultProps = {
  className: '',
  };
export default Loading;