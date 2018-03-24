import React, { Component } from 'react';
import axios from 'axios';
// import { sortBy } from 'lodash';
// import PropTypes from 'prop-types';

// import logo from './logo.svg';
// import { Search } from './helpers'
import './App.css';
import Button from './Button';
import Search from './Search';
import Table from './Table';


import Loading from './Loading';


const DEFAULT_QUERY = 'ES6';
const DEFAULT_HPP = '10';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


// const SORTS = {
//   NONE: list => list,
//   TITLE: list => sortBy(list, 'title'),
//   AUTHOR: list => sortBy(list, 'author'),
//   COMMENTS: list => sortBy(list, 'num_comments').reverse(),
//   POINTS: list => sortBy(list, 'points').reverse(),
// };

// const list = [
//   {
//   title: 'React',
//   url: 'https://facebook.github.io/react/',
//   author: 'Jordan Walke',
//   num_comments: 3,
//   points: 4,
//   objectID: 0,
//   },
//   {
//   title: 'Redux',
//   url: 'https://github.com/reactjs/redux',
//   author: 'Dan Abramov, Andrew Clark',
//   num_comments: 2,
//   points: 5,
//   objectID: 1,
//   },
//   {
//   title: 'Apple 6s',
//   url: 'https://facebook.github.io/react/',
//   author: 'ECMA',
//   num_comments: 3,
//   points: 4,
//   objectID: 2,
//   },
//   {
//   title: 'ES6',
//   url: 'https://github.com/reactjs/redux',
//   author: 'ECMA',
//   num_comments: 2,
//   points: 5,
//   objectID: 3,
//   },
// ];

// const Search = ({ value, onChange, children }) => 
//     <form className="form">
//         { children }
//         <input 
//             type="text"
//             value= { value }
//             onChange={ onChange }
//         />
//     </form>
// const Loading = () =>
// <div>Loading ...</div>

const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
  ? <Loading />
  : <Component { ...rest } />

const ButtonWithLoading = withLoading(Button);

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey]
  ? results[searchKey].hits
  : [];
  const updatedHits = [
  ...oldHits,
  ...hits
  ];
  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page },
    },
    isLoading: false,
  };
}

class App extends Component {
  _isMounted = false;
  state = {
    // list,
    results: null,
    searchKey: '',
    searchTerm: DEFAULT_QUERY,
    error: null,
    isLoading: false,
    // sortKey: 'NONE',
    // isSortReverse: false,
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // list,
  //     results: null,
  //     searchKey: '',
  //     searchTerm: DEFAULT_QUERY,
  //     error: null,
  //   };

  //   // this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  //   // this.setSearchTopStories = this.setSearchTopStories.bind(this);
  //   // this.onSearchSubmit = this.onSearchSubmit.bind(this);
  //   // this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  //   // this.onDismiss = this.onDismiss.bind(this);
  //   // this.onSearchChange = this.onSearchChange.bind(this);
  //   // this.onSort = this.onSort.bind(this);
      
  // }

  // onSort = (sortKey) => {
  //   const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
  //   this.setState({ sortKey, isSortReverse });
  // }
  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }
  setSearchTopStories = (result) => {
    // this.setState({result});
    // const { hits, page } = result;
    // const { searchKey, results } = this.state;
    // // const oldHits = page !== 0
    // // ? this.state.result.hits
    // // : [];
    // const oldHits = results && results[searchKey]
    // ? results[searchKey].hits
    // : [];
    // const updatedHits = [
    // ...oldHits,
    // ...hits
    // ];
    // // this.setState({
    // //   result: {hits: updatedHits, page }
    // // });
    // this.setState({
    //   results: {
    //     ...results,
    //     [searchKey]: { hits: updatedHits, page },
    //   },
    //   isLoading: false,
    // });
    // const { hits, page } = result;
    // this.setState ( prevState => {
    //   const { searchKey, results } = prevState;
    //   const oldHits = results && results[searchKey]
    //   ? results[searchKey].hits
    //   : [];
    //   const updatedHits = [
    //   ...oldHits,
    //   ...hits
    //   ];
    //   return {
    //     results: {
    //       ...results,
    //       [searchKey]: { hits: updatedHits, page },
    //     },
    //     isLoading: false,
    //   };
    // });
    const { hits, page } = result;
    this.setState ( updateSearchTopStoriesState(hits, page) );
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    // .then(response => response.json())
    // .then(result => this.setSearchTopStories(result))
    // .catch(error => this.setState({ error }));
    this.setState({ isLoading: true });
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(result => this._isMounted && this.setSearchTopStories(result.data))
    .catch(error => this._isMounted && this.setState({ error }));
  }

  onDismiss = (id) => {
    console.log(id);
    // const updateList = this.state.list.filter(item => {
    //   return item.objectID !== id;
    // });
    // this.setState({ list: updateList });
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    // const updateHits = this.state.result.hits.filter(isNotId);
    const updatedHits = hits.filter(isNotId);
    this.setState({
      // result: Object.assign({}, result, { hits: updateHits}),
      // result: {...this.state.result, hits: updateHits},
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }
 
  onSearchChange = (event) => {
    console.log('onSearchChange ' + event.target.value);
    this.setState({ searchTerm: event.target.value });
  }

  componentDidMount = () => {
    this._isMounted = true;
    const {searchTerm} = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    console.log(this.state);
    const { 
      searchTerm, 
      results,
      searchKey,
      error,
      isLoading,
      // sortKey,
      // isSortReverse,
    } = this.state;
    const page = (
      results && 
      results[searchKey] &&
      results[searchKey].page
    ) || 0;
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    //if (!result) { return null; }
    // if (error) {
    //   return <p>Something went wrong.</p>;
    // }
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            onChange={this.onSearchChange}
            value= {searchTerm}
            onSubmit={this.onSearchSubmit}
          >
          Search
          </Search>
          </div>
          {/* <Button 
          // onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
          onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
          More
          </Button> */}
            {/* {
              isLoading
              ? <Loading />
              : <Button
                onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                More
              </Button>
            } */}
            
          
          {/* { results ?
          <Table 
            // list={result.hits}
            list={list}
            // pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
          : null } */}
          { error
            ? <div className="interactions">
            <p>Something went wrong.</p>
            </div>
            : <Table
            list={list}
            onDismiss={this.onDismiss}
            // sortKey={sortKey}
            // onSort={this.onSort}
            // isSortReverse={isSortReverse}
            />
          }
          <div className="interactions">
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
              More
            </ButtonWithLoading>
          </div>
      </div>
    );
  }
}

export default App;
