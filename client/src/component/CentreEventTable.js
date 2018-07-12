import React from 'react';
import CentreEventList from './CentreEventList';

const CentreEventTable = ({ checkRecordIfExist, getCentreEvent }) => {
  let checkNoEvent = true;
  if (getCentreEvent.length !== 0) {
    checkNoEvent = false;
  }
  return (
      <div>
        {
            (checkNoEvent || !checkRecordIfExist) && (<p className="text-center text-white">No Record Exists</p>)
        }
        {
                !checkNoEvent && checkRecordIfExist && (<table className="table text-center table-hover mx-auto bg-white table-responsive-sm table-striped">
                <thead className="text-center text-white bg-info border border-white" >
                    <tr className="p-3">
                        <th scope="col" className="border border-white"> S/N</th>
                        <th scope="col" className="border border-white">Event </th>
                        <th scope="col" className="border border-white">Event Date (YYYY-MM-DD)</th>

                    </tr>
                </thead>
                <tbody>
                    {
                    (<CentreEventList getCentreEvent={getCentreEvent} />)
                    }
                </tbody>
            </table>)

        }

      </div>
  );
};

export default CentreEventTable;
