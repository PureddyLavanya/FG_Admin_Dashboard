import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Modal, Button } from 'react-bootstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// PrimeReact CSS
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useUser } from 'contexts/context';
import { exportDataToCSV } from 'Download/Csv';
import { exportDataToExcel } from 'Download/Excel';
import { convert } from 'Download/PDF';
import { convertDataToPDF } from 'Download/data_to_pdf';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChartWithModal = () => {
    const { option } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [dataSeries, setDataSeries] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [colors, setColors] = useState([]);

    useEffect(() => {
        if (option === 'all') {
            setLabels(['Communicated', 'Never Communicated', 'Not Communicated']);
            setDataSeries([85, 12, 8]);
            setColors(['#FF6384', '#36A2EB', '#FFCE56']);
        } else if (option === 'comu') {
            setLabels(['Communicated']);
            setDataSeries([85]);
            setColors(['#FF6384']);
        } else if (option === 'notcomu') {
            setLabels(['Not Communicated']);
            setDataSeries([8]);
            setColors(['#36A2EB']);
        } else if (option === 'nevercomu') {
            setLabels(['Never Communicated']);
            setDataSeries([12]);
            setColors(['#FFCE56']);
        }
    }, [option]);

    const handleDataClick = (dataIndex) => {
        const clickedLabel = labels[dataIndex];
        const clickedValue = dataSeries[dataIndex];

        setSelectedData([{
            label: clickedLabel,
            value: clickedValue
        }]);
    };

    const handleChartClick = (event) => {
        // Get the active elements on click
        const elements = event.chart.getElementsAtEventForMode(event.native, 'nearest', { intersect: true }, false);

        if (elements.length > 0) {
            const dataIndex = elements[0].index; // Get the index of the clicked element
            handleDataClick(dataIndex);  // Set the selected data
            setIsModalOpen(true); // Open the modal when clicking on the chart
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        handleExport(value);
        setSelectedOption(value);
        setTimeout(() => {
            setSelectedOption('');
        }, 1000);
    };

    const handleExport = (format) => {
        const title = selectedData[0]?.label; // Check for selected data
        switch (format) {
            case 'pdf':
                convertDataToPDF(selectedData, title);
                break;
            case 'csv':
                exportDataToCSV(selectedData, title);
                break;
            case 'excel':
                exportDataToExcel(selectedData, title);
                break;
            default:
                break;
        }
    };

    const chartData = {
        labels: labels,
        datasets: [{
            data: dataSeries,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            },
            datalabels: {
                color: '#fff',
                anchor: 'center',
                align: 'center',
                formatter: (value, context) => {
                    return `${value}`;
                },
                font: {
                    weight: 'bold',
                    size: 14,
                }
            }
        },
        onClick: handleChartClick, // Handle click on the chart
    };

    return (
        <div>
            <Doughnut
                data={chartData}
                options={chartOptions}
                height={270}
            />

            {/* Modal for displaying clicked data */}
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered size='xl' style={{ width: '900px', marginLeft: '280px' }}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginRight: '350px' }}>Meters</Modal.Title>
                    <select style={{ width: '70px', height: '30px', fontSize: '12px' }} onChange={handleChange} value={selectedOption}>
                        <option value='All'>Export</option>
                        <option value='pdf'>PDF</option>
                        <option value='csv'>CSV</option>
                        <option value='excel'>EXCEL</option>
                    </select>
                </Modal.Header>
                <Modal.Body>
                    {selectedData.length > 0 && (
                        <DataTable value={selectedData} sortMode="multiple" id='table'>
                            <Column field='label' header='Status' sortable></Column>
                            <Column field='value' header='Count' sortable></Column>
                        </DataTable>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DonutChartWithModal;
