import { useState,useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const NetworkData=()=>{
  const [options, setOptions] = useState({
    title: {
      text: "Books sales data by category",
    },
    data: [
      {
        quarter:"2017",
        fantasy:40,
        history:25,
        biography:60,
        sciencefiction:100,
        artandphotography:120,
        horrorfiction:80,
        travel:70,
      },
      {
        quarter:"2018",
        fantasy:65,
        history:35,
        biography:60,
        sciencefiction:90,
        artandphotography:100,
        horrorfiction:40,
        travel:45,
      },
      {
        quarter:"2019",
        fantasy:55,
        history:30,
        biography:130,
        sciencefiction:85,
        artandphotography:95,
        horrorfiction:36,
        travel:80,
      },
      {
        quarter:"2020",
        fantasy:86,
        history:52,
        biography:78,
        sciencefiction:90,
        artandphotography:100,
        horrorfiction:82,
        travel:40,
      },
      {
        quarter:"2021",
        fantasy:45,
        history:20,
        biography:67,
        sciencefiction:80,
        artandphotography:90,
        horrorfiction:106,
        travel:54,
      },
      {
        quarter:"2022",
        fantasy:56,
        history:75,
        biography:80,
        sciencefiction:90,
        artandphotography:100,
        horrorfiction:65,
        travel:49,
      },
      {
        quarter:"2023",
        fantasy:75,
        history:80,
        biography:70,
        sciencefiction:140,
        artandphotography:60,
        horrorfiction:40,
        travel:55,
      },       
    ],
    series: [
      {
        type: "bar",
        xKey: "quarter",
        yKey: "fantasy",
        yName: "fantasy",
        stacked: true,
        normalizedTo: 100,
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "history",
        yName: "history",
        stacked: true,
        normalizedTo: 100,
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "biography",
        yName: "biography",
        stacked: true,
        normalizedTo: 100,
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "sciencefiction",
        yName: "sciencefiction",
        stacked: true,
        normalizedTo: 100,
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "artandphotography",
        yName: "artandphotography",
        stacked: true,
        normalizedTo: 100
      },
      {
        type:"bar",
        xKey:"quarter",
        yKey: "horrorfiction",
        yName: "horrorfiction",
        stacked: true,
        normalizedTo: 100,
      },
      {
        type:"bar",
        xKey: "quarter",
        yKey: "travel",
        yName: "travel",
        stacked: true,
        normalizedTo: 100,
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
  return(
    <div className="col-xl-12 h-100 m-1 mx-auto">
      <div className="p-3 bg-dark text-white d-flex flex-wrap justify-content-start">
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineselectbox">Substation:</label>
          <select id='inlineselectbox'>
            <option selected value='All'>All</option>
            <option value='option2'>option2</option>
            <option value='option3'>option3</option>
          </select>
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineselectbox">Feader:</label>
          <select id='inlineselectbox'>
            <option selected value='All'>All</option>
            <option value='option2'>option2</option>
            <option value='option3'>option3</option>
          </select>
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label" htmlFor="inlineselectbox">DTR:</label>
          <select id='inlineselectbox'>
            <option selected value='All'>All</option>
            <option value='option2'>option2</option>
            <option value='option3'>option3</option>
          </select>
        </div>
        <div className="form-date form-date-inline">
          <label className="form-date-label" htmlFor="inlineDate">Date</label>
          <DatePicker selected={userdate} onChange={savedate} dateFormat="MMM-yyyy" minDate={new Date("2020-01-01")} maxDate={new Date()} />
        </div>
      </div> <br/>
      <div className="col-xl-12 h-100 mx-auto">
        <AgCharts options={options} />
      </div>
    </div>
  );
}

export default NetworkData;