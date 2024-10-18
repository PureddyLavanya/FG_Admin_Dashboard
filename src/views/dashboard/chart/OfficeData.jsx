import { useState,useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const OfficeData=()=>{
  const [options, setOptions] = useState({
    title: {
      text: "Apple's Revenue by Product Category",
    },
    subtitle: {
      text: "In Billion U.S. Dollars",
    },
    data: [
      {
        quarter: "Q1'18",
        iphone: 140,
        mac: 16,
        ipad: 14,
        wearables: 12,
        services: 20,
      },
      {
        quarter: "Q2'18",
        iphone: 124,
        mac: 20,
        ipad: 14,
        wearables: 12,
        services: 30,
      },
      {
        quarter: "Q3'18",
        iphone: 112,
        mac: 20,
        ipad: 18,
        wearables: 14,
        services: 36,
      },
      {
        quarter: "Q4'18",
        iphone: 118,
        mac: 24,
        ipad: 14,
        wearables: 14,
        services: 36,
      },
      {
        quarter: "Q1'19",
        iphone: 124,
        mac: 18,
        ipad: 16,
        wearables: 18,
        services: 26,
      },
      {
        quarter: "Q2'19",
        iphone: 108,
        mac: 20,
        ipad: 16,
        wearables: 18,
        services: 40,
      },
      {
        quarter: "Q3'19",
        iphone: 96,
        mac: 22,
        ipad: 18,
        wearables: 24,
        services: 42,
      },
      {
        quarter: "Q4'19",
        iphone: 104,
        mac: 22,
        ipad: 14,
        wearables: 20,
        services: 40,
      },
    ],
    series: [
      {
        type: "bar",
        xKey: "quarter",
        yKey: "iphone",
        yName: "iPhone",
        stacked: true,
        normalizedTo: 100,
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "mac",
        yName: "Mac",
        stacked: true,
        normalizedTo: 100,
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "ipad",
        yName: "iPad",
        stacked: true,
        normalizedTo: 100,
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "wearables",
        yName: "Wearables",
        stacked: true,
        normalizedTo: 100,
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "services",
        yName: "Services",
        stacked: true,
        normalizedTo: 100
      },
    ],
  });
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dt = new Date();
  const [userdate, setuserdate] = useState(formatDate(dt));
  const [currentMonth, setcurrentMonth] = useState('');
  const [prevMonth, setprevMonth] = useState('');

  function formatDate(date) {
    const day = String(date.getDate()).slice(0,2);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  const savedate = (date) => {
    const uinput = date;
    const cdt = uinput.getDate();
    const cmonth = uinput.getMonth();
    const cyear = uinput.getFullYear();
    const pmonth = cmonth === 0 ? 11 : cmonth - 1;
    const pyear = cmonth === 0 ? cyear - 1 : cyear;
    const cmonthnm = months[cmonth];
    const pmonthnm = months[pmonth];
    setcurrentMonth(cmonthnm);
    setprevMonth(pmonthnm);
    setuserdate(date);
    console.log(`Current Month:${cmonthnm}-${cyear}`);
    console.log(`Previous Month:${pmonthnm}-${pyear}`);
  };
  return (
    <div className="col-xl-12 h-100 m-1 mx-auto ml-4 mx-auto">
      <div className="bg-dark text-white p-3 d-flex flex-wrap justify-content-start">
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineselectbox">Zones:</label>
          <select id='inlineselectbox' className="ml-1" defaultValue="All">
            <option  value='All'>All</option>
            <option value='option2'>option2</option>
            <option value='option3'>option3</option>
          </select>
        </div>
        <div className="form-number form-number-inline ml-2">
          <label className="form-number-label" htmlFor="inlineNumber">Threshold(%):</label>
          <input className="form-number-input ml-1" type="number" name="inlineNumberOption" id="inlineNumber" placeholder="30" />
        </div>
        <div className="form-date form-date-inline ml-2">
          <label className="form-date-label" htmlFor="inlineDate">Date</label>
          <DatePicker selected={userdate} onChange={savedate} dateFormat="MMM-yyyy" minDate={new Date("2020-01-01")} maxDate={new Date()} />
        </div>
      </div> <br/>
      <div className='col-xl-12 h-100 mx-auto'>
        <AgCharts options={options}/>
      </div>
    </div>
  )
}

export default OfficeData;