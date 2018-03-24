import React, {Component} from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// const isSearched = pattern => item => 
//   item.title.toLowerCase().includes(pattern.toLowerCase());
// const Sort = ({ sortKey, onSort, children }) =>
// <Button onClick={() => onSort(sortKey)} className="button-inline">
// {children}
// </Button>

const Sort = ({
    sortKey,
    activeSortKey,
    onSort,
    children,
    isSortReverse
    }) => {
    // const sortClass = ['button-inline'];
    // if (sortKey === activeSortKey) {
    // sortClass.push('button-active');
    // }
    const sortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey }
    );
    let sortIconClass;
    if (sortKey === activeSortKey) {
        sortIconClass = (isSortReverse) ? 'arrow-down' : 'arrow-up';
    }
   
    return (
    <Button
        onClick={() => onSort(sortKey)}
        // className={sortClass.join(' ')}
        className={sortClass}
        >
    {children}
    {sortKey === activeSortKey ? <FontAwesomeIcon icon={["fas",  sortIconClass]} /> : ''}
    </Button>
    );
}

class Table extends Component {
    state = {
        sortKey: 'NONE',
    isSortReverse: false,
    }
    onSort = (sortKey) => {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({ sortKey, isSortReverse });
    }
    render() {
        const 
        { 
            list, 
            // pattern,
            onDismiss, 
        } = this.props;
        const {
            sortKey,
            isSortReverse,
        } = this.state;
        const SORTS = {
        NONE: list => list,
        TITLE: list => sortBy(list, 'title'),
        AUTHOR: list => sortBy(list, 'author'),
        COMMENTS: list => sortBy(list, 'num_comments').reverse(),
        POINTS: list => sortBy(list, 'points').reverse(),
        };
        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
        ? sortedList.reverse()
        : sortedList;
        return (
            <div>
                <div className="table">
                        <div className="table-header">
                        
                            <span style={{ width: '40%' }}>
                                <Sort
                                sortKey={'TITLE'}
                                onSort={this.onSort}
                                activeSortKey={sortKey}
                                isSortReverse={isSortReverse}
                                >
                                Title 
                                </Sort>
                            </span>
                            <span style={{ width: '30%' }}>
                                <Sort
                                sortKey={'AUTHOR'}
                                onSort={this.onSort}
                                activeSortKey={sortKey}
                                isSortReverse={isSortReverse}
                                >
                                Author 
                                </Sort>
                            </span>
                            <span style={{ width: '10%' }}>
                                <Sort
                                sortKey={'COMMENTS'}
                                onSort={this.onSort}
                                activeSortKey={sortKey}
                                isSortReverse={isSortReverse}
                                >
                                Comments
                                </Sort>
                            </span>
                            <span style={{ width: '10%' }}>
                                <Sort
                                sortKey={'POINTS'}
                                onSort={this.onSort}
                                activeSortKey={sortKey}
                                isSortReverse={isSortReverse}
                                >
                                Points
                                </Sort>
                            </span>
                            <span style={{ width: '10%' }}>
                                Archive
                            </span>
                        </div>
                    </div>
                {
                    //list.filter(isSearched(pattern)).map(item => 

                    // SORTS[sortKey](list).map(item => 
                    reverseSortedList.map(item => 
                        <div key={item.objectID} className="table-row">
                            <span style={{ width: '40%' }}>
                            <a href={item.url}>{item.title}</a>
                            </span>
                            <span style={{ width: '30%' }}>
                            {item.author}
                            </span>
                            <span style={{ width: '10%' }}>
                            {item.num_comments}
                            </span>
                            <span style={{ width: '10%' }}>
                            {item.points}
                            </span>
                            <span style={{ width: '10%' }}>
                            <Button
                                onClick={() => onDismiss(item.objectID)}
                                className="button-inline"
                            >
                                Dismiss
                            </Button>
                            </span>
                        </div>
                    )
                }
                    
                    {/* {
                        Sort[sortKey](list).map(item => 
                        <div className="left list" key={item.objectID}>
                            <span>
                            <a href={item.url}>{item.title}</a>
                            </span>
                            <span>{item.author}</span>
                            <span>{item.num_comments}</span>
                            <span>{item.points}</span>
                            <Button 
                                onClick={() => onDismiss(item.objectID)}
                            >
                                Dismiss
                            </Button>
                        </div>
                        )
                    } */}
                
            </div>
        );
    }

}
Table.propTypes = {
    list: PropTypes.arrayOf(
    PropTypes.shape({
    objectID: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string,
    num_comments: PropTypes.number,
    points: PropTypes.number,
    })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
};
export default Table;