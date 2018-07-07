import React from 'react';
import PaginationComponent from 'react-js-pagination';
import PropType from 'prop-types';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { numOfPages, totalNumOfPages } = this.props.numOfPages;
    return (
      <PaginationComponent
      activePage={this.props.currentPage}
          itemsCountPerPage={numOfPages}
          totalItemsCount={totalNumOfPages}
          pageRangeDisplayed={5}
          itemClass = "page-item"
          linkClass = "page-link"
          onChange = {this.props.handlePagination}
      />

    );
  }
}

Pagination.proptype = {
  numOfPages: PropType.number,
  totalNumOfPages: PropType.number,
  currentPage: PropType.number,
  handlePagination: PropType.func.isRequired,
};

export default Pagination;
