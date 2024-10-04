import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Modal, Button } from 'react-bootstrap';

const BarChartWithModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Sample data for the bar chart
  const chartData = {
    series: [
      {
        name: 'Task Count',
        data: [10, 20, 30, 40, 50]  // Sample data
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
            show: true 
          },
        events: {
          // Function triggered when a bar is clicked
          dataPointSelection: (event, chartContext, config) => {
            const { dataPointIndex } = config;
            const value = chartData.series[0].data[dataPointIndex];
            setSelectedData({ label: `Bar ${dataPointIndex + 1}`, value: value });
            setShowModal(true);
          }
        }
      },
      xaxis: {
        categories: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']  // Categories for the bars
      },
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    }
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />

      {/* Modal for showing the detailed data */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size='xl' style={{width:'900px', marginLeft:'280px'}}>
        <Modal.Header closeButton>
          <Modal.Title>Details for {selectedData?.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Value:</strong> {selectedData?.value}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BarChartWithModal;