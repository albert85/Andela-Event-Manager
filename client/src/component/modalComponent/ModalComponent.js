import React from 'react';
import PropType from 'prop-types';

import PaginationComponent from 'react-js-pagination';
import DisplayCenters from '../centerSelection/DisplayCenters';

class ModalComponent extends React.Component {
  render() {
    const {
      id,
      currentPage,
      numOfPages,
      centerArray,
    } = this.props;

    return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="selectModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header bg-primary">
        <h5 className="modal-title text-white" id="selectModalLabel">Please Select a Center</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" className="text-white">&times;</span>
        </button>
      </div>
      <div className="modal-body container">
        <DisplayCenters
        centerArray = {centerArray}
        handleSelectCenter = {this.props.handleSelectCenter}
        />

        <PaginationComponent
          activePage={currentPage}
          itemsCountPerPage={2}
          totalItemsCount={numOfPages.totalNumOfPages}
          pageRangeDisplayed={5}
          itemClass = "page-item"
          linkClass = "page-link"
          onChange = {this.props.handleCenterPagination}
      />
        {/* <Paginations
        numOfPages={numOfPages}
        handlePagination = {this.props.handleCenterPagination}
        currentPage = {currentPage}
        /> */}
      </div>
      {/* <div className="modal-footer"> */}
        {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
      {/* </div> */}
    </div>
  </div>
</div>
    );
  }
}

ModalComponent.propType = {
  id: PropType.string,
  currentPage: PropType.number,
  numOfPages: PropType.object,
  centerArray: PropType.arrayOf(PropType.object),
};

export default ModalComponent;

