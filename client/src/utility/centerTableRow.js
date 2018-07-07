import React, { Component } from 'react';

class CenterRows extends Component {
  render() {
    return (

                <tr className="border border-white">
                    <td scope="row">{ this.props.i + 1 }</td>
                    <td>{this.props.centers.name}</td>
                    <td>{this.props.centers.location}</td>
                    <td>{this.props.centers.amount}</td>
                    <td>{this.props.centers.capacity}</td>
                    <td>
                        <div className="row">
                            <div className="col mb-2">
                                <button type="button" onClick = { this.props.handleCenterDetails.bind(this, this.props.centerId) } className="btn btn-primary btn-block">
                                <i className="fa fa-pencil" aria-hidden="true"> Edit</i>
                                </button>
                            </div>
                                <div className="col">
                                    <button type="button" className="btn btn-success btn-block" onClick = { this.props.handleEditCenterDetails.bind(this, this.props.centerId) }>
                                        <i className="fa fa-book" aria-hidden="true"> Update</i>
                                    </button>
                                </div>

                            </div>

                    </td>

                </tr>

    );
  }
}

export default CenterRows;
