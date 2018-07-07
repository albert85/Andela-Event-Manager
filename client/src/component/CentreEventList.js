import React from 'react';
import PropType from 'prop-types';

const CentreEventList = ({ getCentreEvent }) => (
  getCentreEvent.map((centers, i) =>
        <tr id="#1" key={i} index={i} className="border border-white">
            <td scope="row">{i + 1}</td>
            <td>{centers.name}</td>
            <td>{centers.eventDate}</td>

        </tr>)
);

CentreEventList.proptype = {
  getCentreEvent: PropType.arrayOf(PropType.object),
};


export default CentreEventList;
