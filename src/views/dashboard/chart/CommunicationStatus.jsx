import React, { useState, useEffect,useRef } from "react";
import { AgCharts } from "ag-charts-react";
import { Form, Col, Dropdown, DropdownButton,Table,Modal,Row,Button } from 'react-bootstrap';
import { FaTable,FaChartBar } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './styles.css';
import ExcelJS from 'exceljs';
import UserData from './UserData';

const CommunicationStatus = () => {
  const chartRef=useRef(null);
  const [chartData, setChartData] = useState([
    { month: "January", iceCreamSales: 162000 },
    { month: "March", iceCreamSales: 302000 },
    { month: "May", iceCreamSales: 800000 },
    { month: "July", iceCreamSales: 125000 },
    { month: "September", iceCreamSales: 150000 },
    { month: "November", iceCreamSales: 200000 },
    { month: "December", iceCreamSales: 125000 }
  ]);
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [options, setOptions] = useState(null);  
  const [showModal,setShowModal]=useState(false);
  const [clickedData,setclickedData]=useState({});
  const [showChart,setshowChart]=useState(true);
  const [showTable,setshowTable]=useState(false);
  const [tableData,settableData]=useState();

  const handleChangeSelectedMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleBarClick = (params) => {
    const dt = params.datum;
    setclickedData(dt);
    setShowModal(true);
  };
  useEffect(() => {
    let newData;

    if (selectedMonth === 'All') {
      newData = [
        { month: "January", iceCreamSales: 162000 },
        { month: "March", iceCreamSales: 302000 },
        { month: "May", iceCreamSales: 800000 },
        { month: "July", iceCreamSales: 125000 },
        { month: "September", iceCreamSales: 150000 },
        { month: "November", iceCreamSales: 200000 },
        { month: "December", iceCreamSales: 125000 }
      ];
    } else {
      newData = chartData.filter(data => data.month === selectedMonth);
    }

    setOptions({
      title: { text: 'Monthly Ice Cream Sales Data' },
      data: newData,
      width: 920,
      height: 550,
      series: [
        {
          type: "bar",
          xKey: "month",
          yKey: "iceCreamSales",
          yName: 'IceCream Sales',
          listeners: {
            nodeClick: handleBarClick,
            },
          }
      ]
    });
    settableData(newData);
  }, [selectedMonth]);

  
  const DataModal = ({ onClose, mdata, canvasref }) => {
    const dCSV = () => {
      const csvContent = `Ice Cream Sales Chart Data for month:${mdata.month}\nMonth,Sales\n${mdata.month},${mdata.iceCreamSales}`;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${mdata.month}_sales.csv`);
    };

    const dPDF = () => {
      const chartElement = document.querySelector('.ag-charts-wrapper');
      
      const width = chartElement.offsetWidth;
      const height = chartElement.offsetHeight;
    
      html2canvas(chartElement, {
        scale: 2,
      }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF({
          orientation: width > height ? 'landscape' : 'portrait',
          unit: 'px', 
          format: [width, height], 
        });
    
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
    
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save("chart_data.pdf");
      }).catch(err => {
        console.error("Error generating PDF:", err);
      });
    };

    const dExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Ice Cream Sales Data');
    
      worksheet.addRow([`Ice Cream Sales Data for Month: ${mdata.month}`]);
    
      const header = ['Month', 'Sales'];
      const headerRow = worksheet.addRow(header);
    
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFF00' },
        };
      });
    
      worksheet.addRow([mdata.month, mdata.iceCreamSales]);
    
      worksheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength + 2;
      });
    
      worksheet.autoFilter = {
        from: 'A2', 
        to: 'B2',   
      };
    
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${mdata.month}_sales.xlsx`);
    };
    

    return (
      <Modal show={showModal} onHide={onClose} size="xl" centered className='mdl'>
        <Modal.Header closeButton>
          <Col md='10'>
            <Row>
              <Col md='8' className='d-flex'>
                <Modal.Title>
                  <p>Ice Cream Sales Data for month: {mdata.month}</p>
                </Modal.Title>
              </Col>
              <Col md='2' className="d-flex justify-content-end">
                <DropdownButton id="dropdown-basic-button" title="Export Options">
                  <Dropdown.Item onClick={dCSV}>CSV</Dropdown.Item>
                  <Dropdown.Item onClick={dPDF}>PDF</Dropdown.Item>
                  <Dropdown.Item onClick={dExcel}>Excel</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
          </Col>
        </Modal.Header>
        <Modal.Body>
          <Table bordered striped hover size='lg'>
            <thead className='text-center'>
              <tr className="border">
                <th>Month</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td>{mdata.month}</td>
                <td>{mdata.iceCreamSales}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const downloadCSV = () => {
    const csvContent = `Ice Cream Sales Chart Data\nMonth,Sales\n`
      + chartData.map(e => `${e.month},${e.iceCreamSales}`).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'chart_data.csv');
  };

  const downloadPDF = () => {
    const chartElement = document.querySelector('.ag-charts-wrapper');
    
    const width = chartElement.offsetWidth;
    const height = chartElement.offsetHeight;
  
    html2canvas(chartElement, {
      scale: 2,
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'px', 
        format: [width, height], 
      });
  
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
  
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save("chart_data.pdf");
    }).catch(err => {
      console.error("Error generating PDF:", err);
    });
  };
  
  const downloadPNG = () => {
    const chartElement = document.querySelector('.ag-charts-wrapper');
    const width = chartElement.offsetWidth;
    const height = chartElement.offsetHeight;
  
    html2canvas(chartElement, {
      scale: 2, 
    }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'chart_data.png';
      link.click();
    }).catch(err => {
      console.error("Error generating PNG:", err);
    });
  };
  

  return (
    <div className="mx-auto">
    <div className="form-container  mx-auto p-3">
      <Form as={Row} md='12' className="align-items-center mb-3">
        <Form.Group as={Col} md={6} className="d-flex">
        <Form.Label className="d-flex" >Select Month</Form.Label>
        <Form.Control as="select" value={selectedMonth} onChange={handleChangeSelectedMonth}>
          <option value="All">All</option>
          <option value="January">January</option>
          <option value="March">March</option>
          <option value="May">May</option>
          <option value="July">July</option>
          <option value="September">September</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </Form.Control>
        </Form.Group>
        <Col md={2} className="d-flex justify-content-center ">
        <DropdownButton id="dropdown-basic-button" title="Export Options" disabled={selectedMonth !== 'All'}>
              <Dropdown.Item onClick={downloadCSV}>CSV</Dropdown.Item>
              <Dropdown.Item onClick={downloadPDF}>PDF</Dropdown.Item>
              <Dropdown.Item onClick={downloadPNG}>PNG</Dropdown.Item>
        </DropdownButton>
        </Col>
        {/* <Col md={2} className="d-flex justify-content-center">
          <FaChartBar onClick={()=>setshowTable(false)}/>
        </Col> */}
        <Col md={2} className="d-flex justify-content-end">
          <FaTable  onClick={()=>setshowTable(!showTable)} />
        </Col>
      </Form>
    </div>
    { showTable ?(
        <div>
          <UserData tdata={tableData} />
        </div>
        ):
        <div ref={chartRef} className="ag-charts-wrapper">
          {options && <AgCharts options={options} />}
        </div>
    } 

    {showModal && (
      <DataModal onClose={() => setShowModal(false)} mdata={clickedData} canvasref={chartRef} />
    )}
  </div>
  );
};

export default CommunicationStatus;
