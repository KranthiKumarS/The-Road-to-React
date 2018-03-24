import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Search extends Component {
  componentDidMount() {
    if(this.input) {
    this.input.focus();
    }
  }
  render() {
    const 
    { 
      value,
      onChange, 
      children,
      onSubmit
    } = this.props;
    return (
      <form className="form" onSubmit={onSubmit}>
        { children }
        <input 
          type="text"
          value= { value }
          onChange={ onChange }
          ref={(node) => { this.input = node; }}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );

  }
}

export default Search;