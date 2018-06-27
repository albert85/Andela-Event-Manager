import React, { Component } from 'react';
import _ from 'lodash';
import PaginationComponent from 'react-js-pagination';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    // this.handlePagination = this.handlePagination.bind(this);
  }


  // handlePagination(pageNumber) {
  //   this.props.handlePagination(pageNumber);
  //   return true;
  // }

  render() {
    const { numOfPages, totalNumOfPages } = this.props.numOfPages;
    // window.console.log("*******currentPage******", currentPage);
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

    //         <nav aria-label="Page navigation example">
    //         <ul class="pagination mt-2 pag-position-center">
    //             <li class="page-item" ><a class="page-link" href="#">Previous</a></li>
    //             {
    //                 //  create pages of events
    //                 _.times(this.props.numOfPages, i =>
    //                     <li class="page-item" key={i}
    //                     id={i + 1}
    //                     onClick = { this.handlePagination.bind(this, i + 1)}
    //                     >
    //                     <a class="page-link" >{i + 1}</a>
    //                     </li>)
    //             }
    //             <li class="page-item"><a class="page-link" href="#">Next</a></li>
    //         </ul>
    // </nav>


    );
  }
}

export default Pagination;
