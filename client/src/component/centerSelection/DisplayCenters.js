import React from 'react';

class DisplayCenters extends React.Component {
  render() {
    const {
      centerArray,
    } = this.props;
    return (
            <div>
              <div class="card-deck em-align-center-items">
              {
                centerArray.map((center, index) => (
                  <div className="card em-card-width" key= {index}>
                    <img className="card-img-top adjust-card-imag" src={center.centerUrl} alt="Card image cap" />
                            <div class="card-body">
                            <strong>Center Name:</strong>
                            <p className="adjust-margin">{center.name}</p>
                            <strong>Location:</strong>
                            <p className="adjust-margin">{center.location}</p>
                            <strong>Capacity(nos):</strong>
                            <p className="adjust-margin">{center.capacity}</p>
                          <strong> Amount(#):</strong>
                            <p className="adjust-margin">{center.amount}</p>

                            </div>
                            <a className="btn btn-large bg-primary text-white" id={center.id} onClick={this.props.handleSelectCenter} key={index} data-dismiss="modal">SELECT</a>
                            {/* <div class="card-footer bg-primary">

                    </div> */}
                  </div>))

                }
            </div>
            </div>
    );
  }
}

export default DisplayCenters;
