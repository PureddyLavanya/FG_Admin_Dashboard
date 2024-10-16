import { useState } from 'react';
import OfficeData from './OfficeData';
import NetworkData from './NetworkData';

const SampleDashboard = () => {
  const [showOffice, setshowOffice] = useState(true);

  return (
    <div>
      <div className='col-xl-12 bg-dark text-white p-3 ml-4 d-flex justify-content-center'>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
            checked={showOffice}
            onClick={() => setshowOffice(true)}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">OFFICE</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="option2"
            checked={!showOffice}
            onClick={() => setshowOffice(false)}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">NETWORK</label>
        </div>
      </div>
      <br />
      <div>
        {showOffice ? <OfficeData /> : <NetworkData />}
      </div>
    </div>
  );
}

export default SampleDashboard;
