import React, { useEffect } from 'react';
import { useState, useContext } from 'react';

// react-bootstrap
import { Row, Col, Card, Table, ListGroup } from 'react-bootstrap';
import axios from 'axios';

// third party
import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';

// project import
import OrderCard from '../../components/Widgets/Statistic/OrderCard';
import SocialCard from '../../components/Widgets/Statistic/SocialCard';
import meter from '../../assets/images/meter.png'
import { ImMeter2 } from "react-icons/im";

// import customerChart from './chart/analytics-cuatomer-chart';
import customerChart1 from './chart/analytics-cuatomer-chart-1';
import DonutChartWithModal from './chart/DoughnutChart';
import BarChartWithModal from './chart/Barchart';

// assets
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import imgGrid1 from '../../assets/images/gallery-grid/img-grd-gal-1.jpg';
import imgGrid2 from '../../assets/images/gallery-grid/img-grd-gal-2.jpg';
import imgGrid3 from '../../assets/images/gallery-grid/img-grd-gal-3.jpg';


//Downloads
import { convert } from 'Download/PDF';
import { convert_png } from 'Download/Png';
import { exportDataToExcel } from 'Download/Excel';
import { useUser } from 'contexts/context';

// ==============================|| DASHBOARD ANALYTICS ||============================== //

const DashAnalytics = () => {
  
  const {setOption} = useUser();
  const [selectoption, setSelectoption] = useState('All');
  const [selectedoption, setSelectedoption] = useState('');
  const data1 = parseInt(localStorage.getItem('data1')) || 0;
  const data2 = parseInt(localStorage.getItem('data2')) || 0;
  const data3 = parseInt(localStorage.getItem('data3')) || 0;
  const data4 = parseInt(localStorage.getItem('data4')) || 0;
  const [datao, setDatao] = useState(0);
  const [dataa, setDataa] = useState(0);
  const [datab, setDatab] = useState(0);
  const [datac, setDatac] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const fetchedData = response.data;
        let data1, data2, data3, data4;

        fetchedData.forEach((item) => {
          if (item.id === 1) {
            data1 = item.rating.count;
            setDatao(data1);
            console.log(data1);
            //localStorage.setItem("data1", data1);
          } else if (item.id === 2) {
            data2 = item.rating.count;
            setDataa(data2);
            //localStorage.setItem("data2", data2);
          } else if (item.id === 3) {
            data3 = item.rating.count;
            setDatab(data3);
            //localStorage.setItem("data3", data3);
          } else if (item.id === 4) {
            data4 = item.rating.count;
            setDatac(data4);
            //localStorage.setItem("data4", data4);
          }
        });

        // Notify the parent component that data is fetched
        //onDataFetch({ data1, data2, data3, data4 });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  const handleschange = (e) => {
    const value = e.target.value;
    handleexport(value);
    setSelectedoption(value);
    setTimeout(() => {
      setSelectedoption('');
    }, 1000);
  };
  const handlechange = (e) => {
    const value = e.target.value;
    setSelectoption(value);
    setOption(value);
  };

  const data = [{devices:"Communicated",value:85},{devices:"Not Communicated",value:12},{devices:"Never Communicated",value:8}];

  const handleexport = (format) => {
    const title = `${selectoption} devices`;
    switch (format) {
      case 'pdf':
        convert(title);
        break;
      case 'png':
        convert_png(title);
        break;
      case 'excel':
        exportDataToExcel(data,title);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Row>
        {/* order cards */}
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Meter Count',
              class: 'bg-c-blue',
              icon: meter,
              primaryText: `${datao}`
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Active Meters',
              class: 'bg-c-green',
              icon: meter,
              primaryText: `${dataa}`
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'De-Active Meters',
              class: 'bg-c-yellow',
              icon: meter,
              primaryText: `${datab}`
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Today Active',
              class: 'bg-c-red',
              icon: meter,
              primaryText: `${datac}`
            }}
          />
        </Col>

        <Col md={12} xl={6} className="d-flex">
          <Card className="w-100 h-80">
            <Card.Header>
              <h5>Communication Status</h5>
              <select style={{ width: '70px', height: '30px', fontSize: '12px', marginRight:'20px', marginLeft:'60px' }} onChange={handlechange} value={selectoption}>
                <option value='all'>Select</option>
                <option value='comu'>Communicated</option>
                <option value='notcomu'>Not Communicated</option>
                <option value='nevercomu'>Never Communicated</option>
              </select>
              <select style={{ width: '70px', height: '30px', fontSize: '12px' }} onChange={handleschange} value={selectedoption}>
                <option value='All'>Export</option>
                <option value='pdf'>PDF</option>
                <option value='png'>PNG</option>
                <option value='excel'>EXCEL</option>
              </select>
              
            </Card.Header>
            <div id='chart-block'>
            <Card.Body className="ps-4 pt-4 pb-0">
              <DonutChartWithModal/>
            </Card.Body>
            </div>
          </Card>
        </Col>
        <Col md={12} xl={6}>
          <Row>
            <Col sm={6} className="d-flex">
              <Card className="w-100 h-80">
                <Card.Body>
                  <BarChartWithModal/>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} className="d-flex">
              <Card className="bg-primary text-black w-100 h-80">
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Customers</span>
                    </Col>
                    <Col className="text-end">
                      <h2 className="mb-0 text-white">826</h2>
                      <span className="text-white">
                        8.2%
                        <i className="feather icon-trending-up ms-1" />
                      </span>
                    </Col>
                  </Row>
                  <Chart {...customerChart1} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        674
                      </h3>
                      <span className="ms-3">New</span>
                    </Col>
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-white" />
                        182
                      </h3>
                      <span className="ms-3">Return</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={8} md={12}>
          
        </Col>

        <Col sm={12}>
          
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashAnalytics;
