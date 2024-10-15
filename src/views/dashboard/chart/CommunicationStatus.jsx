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
import axios from 'axios';


const CommunicationStatus = () => {
  const chartRef=useRef(null);
   const [chartData, setChartData] = useState([
  //   { month: "January", iceCreamSales: 162000 },
  //   { month: "March", iceCreamSales: 302000 },
  //   { month: "May", iceCreamSales: 800000 },
  //   { month: "July", iceCreamSales: 125000 },
  //   { month: "September", iceCreamSales: 150000 },
  //   { month: "November", iceCreamSales: 200000 },
  //   { month: "December", iceCreamSales: 125000 }
  ]);
  const [selectedPrdCategory, setSelectedProductCategory] = useState('All');
  const [options, setOptions] = useState(null);  
  const [showModal,setShowModal]=useState(false);
  const [clickedData,setclickedData]=useState({});
  const [clickedPrdCat,setclickedPrdCat]=useState();
  const [showChart,setshowChart]=useState(true);
  const [showTable,setshowTable]=useState(false);
  const [tableData,settableData]=useState([]);
  const [userproducts,setuserproducts]=useState([]);
  const [menProducts,setmenProducts]=useState();
  const [womenProducts,setwomenProducts]=useState();
  const [jewProducts,setjewProducts]=useState();
  const [electProducts,setelectProducts]=useState();
  const [menPrdCount,setmenPrdCount]=useState();
  const [womenPrdCount,setwomenPrdCount]=useState();
  const [jewPrdCount,setjewPrdCount]=useState();
  const [electPrdCount,setelectPrdCount]=useState();

  useEffect(()=>{
    const getProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;
        const p1=products.filter(p=>p.category===`men's clothing`);
        const p2=products.filter(p=>p.category===`women's clothing`);
        const p3=products.filter(p=>p.category==='jewelery');
        const p4=products.filter(p=>p.category==='electronics');
        setuserproducts(products);
        setmenProducts(p1);
        setwomenProducts(p2);
        setjewProducts(p3);
        setelectProducts(p4);
        setmenPrdCount(p1.length);
        setwomenPrdCount(p2.length);
        setjewPrdCount(p3.length);
        setelectPrdCount(p4.length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  },[]);
 
  useEffect(() => {
    if (userproducts.length > 0) {
      setOptions({
        title: { text: 'Products Categories Data' },
        data: [
          {ProductCategory:`Men's Clothing`, ProductsCount: menPrdCount},
          {ProductCategory:`Women's Clothing`, ProductsCount: womenPrdCount},
          {ProductCategory:'Jewelery', ProductsCount: jewPrdCount},
          {ProductCategory:'Electronic', ProductsCount: electPrdCount}
        ],
        width: 920,
        height: 500,
        series: [
          {
            type: "bar",
            xKey: "ProductCategory",
            yKey: "ProductsCount",
            yName: 'ProductsCount',
            listeners: {
              nodeClick: handleBarClick,
            },
          },
        ],
      });
      settableData(userproducts);
    }
  }, [userproducts, menPrdCount, womenPrdCount, jewPrdCount, electPrdCount]);
  

  const handleChangeSelectedPrdCategory = (e) => {
    setSelectedProductCategory(e.target.value);
  };

  const handleBarClick = (params) => {
    const pc = params.datum.ProductCategory;
    if(pc==`Men's Clothing`){
      setclickedData(menProducts);
    }
    else if(pc==`Women's Clothing`){
      setclickedData(womenProducts);
    }
    else if(pc=='Jewelery'){
      setclickedData(jewProducts);
    }
    else if(pc=='Electronic'){
      setclickedData(electProducts);
    }
    setclickedPrdCat(pc);
    setShowModal(true);
    console.log('modal data:',clickedData);
  };
  useEffect(() => {
    let newData;

    if (selectedPrdCategory === 'All') {
      newData = [
        {ProductCategory:`Men's Clothing`,ProductsCount:menPrdCount},
        {ProductCategory:`Women's Clothing`,ProductsCount:womenPrdCount},
        {ProductCategory:'Jewelery',ProductsCount:jewPrdCount},
        {ProductCategory:'Electronic',ProductsCount:electPrdCount}
      ];
      settableData(userproducts);
    } 
    else if(selectedPrdCategory==='Men Clothing'){
      newData=[{ProductCategory:`Men's Clothing`,ProductsCount:menPrdCount}];
      settableData(menProducts);
    }
    else if(selectedPrdCategory=='Women Clothing'){
      newData=[{ProductCategory:`Women's Clothing`,ProductsCount:womenPrdCount}];
      settableData(womenProducts);
    }
    else if(selectedPrdCategory==='Jewelery'){
      newData=[{ProductCategory:'Jewelery',ProductsCount:jewPrdCount}];
      settableData(jewProducts);
    }
    else if(selectedPrdCategory==='Electronic'){
      newData=[{ProductCategory:'Electronic',ProductsCount:electPrdCount}];
      settableData(electProducts);
    }

    setOptions({
      title: { text: 'Products Categories Data' },
      data: newData,
      width: 920,
      height: 500,
      series: [
        {
          type: "bar",
          xKey: "ProductCategory",
          yKey: "ProductsCount",
          yName: 'ProductsCount',
          listeners: {
            nodeClick: handleBarClick,
            },
          }
      ]
    });
  }, [selectedPrdCategory]);

  
  const DataModal = ({ onClose, mdata, canvasref ,prodcat}) => {
    const dCSV = () => {
      const csvContent = `Products Data for category:  ${prodcat}\nId,Title,Price,Category\n`
      + mdata.map(e => `${e.id},${e.title},${e.price},${e.category}`).join("\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${prodcat}_products_data.csv`);
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
        doc.save(`${prodcat}_products_data.pdf`);
      }).catch(err => {
        console.error("Error generating PDF:", err);
      });
    };

    const dExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Ice Cream Sales Data');
    
      worksheet.addRow([`Products Data for category: ${prodcat}`]);
    
      const header = ['Id', 'Title','Price','Category'];
      const headerRow = worksheet.addRow(header);
    
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFF00' },
        };
      });
      {
        mdata.forEach((data)=>{
          worksheet.addRow([data.id,data.title,data.price,data.category]);
        });
      }    
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
      saveAs(blob, `${prodcat}_products_data.xlsx`);
    };
    return (
      <Modal show={showModal} onHide={onClose} size="xl" centered className='mdl col-xl-7' md='5' sm='8'>
        <Modal.Header closeButton>
          <Col md='10'>
            <Row>
              <Col md='9' className='d-flex'>
                <Modal.Title>
                  <p>Products Categories Data: {prodcat}</p>
                </Modal.Title>
              </Col>
              <Col md='1' className="d-flex justify-content-end m-2">
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
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                mdata.map(p=>
                  <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
              </tr>
                )
              }
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
    const csvContent = `Products Data for category:  ${prodcat}\nId,Title,Price,Category\n`
      + userproducts.map(e => `${e.id},${e.title},${e.price},${e.category}`).join("\n");

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
        <Form.Label className="d-flex" >Select Product Category</Form.Label>
        <Form.Control as="select" value={selectedPrdCategory} onChange={handleChangeSelectedPrdCategory}>
          <option value="All">All</option>
          <option value="Men Clothing">Men Clothing</option>
          <option value="Women Clothing">Women Clothing</option>
          <option value="Jewelery">Jewelery</option>
          <option value="Electronic">Electronic</option>
        </Form.Control>
        </Form.Group>
        <Col md={4} className="d-flex justify-content-center ">
        
          { !showTable&&(
            <DropdownButton id="dropdown-basic-button" title="Export Options" disabled={selectedPrdCategory !== 'All'}>
              <Dropdown.Item onClick={downloadCSV}>CSV</Dropdown.Item>
              <Dropdown.Item onClick={downloadPDF}>PDF</Dropdown.Item>
              <Dropdown.Item onClick={downloadPNG}>PNG</Dropdown.Item>
            </DropdownButton>
            )
          }        
        </Col>
        <Col md={2} className="d-flex justify-content-end">
          <FaTable  onClick={()=>setshowTable(!showTable)} />
        </Col>
      </Form>
    </div>
    { showTable &&(
        <div>
          <UserData tdata={tableData} />
        </div>)
    }

        { chartData  && !showTable && options && (
          <div ref={chartRef} className="ag-charts-wrapper col-10 col-sm-8">
            <AgCharts options={options} />
          </div>
        )}
            
        {
          !chartData && !showTable && !options && (
            <div>Loading Chart...</div>
          )
        }

    {showModal && (
      <DataModal onClose={() => setShowModal(false)} mdata={clickedData} prodcat={clickedPrdCat} canvasref={chartRef} />
    )}
  </div>
  );
};

export default CommunicationStatus;
