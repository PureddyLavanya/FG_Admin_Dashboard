const chartData = {
  height: 150,
  type: 'donut',
  options: {
    chart: {
      toolbar: {
        show: true,  // Enable toolbar with download options
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%'
        }
      }
    },
    labels: ['New', 'Return'],
    legend: {
      show: false
    },
    tooltip: {
      theme: 'light'
    },
    grid: {
      padding: {
        top: 20,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    // Custom color combination for the chart
    colors: ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF33A1'], // Array of colors
    fill: {
      opacity: [1, 1]
    },
    stroke: {
      width: 0
    }
  },
  series: [20, 15]  // Data for the donut chart
};

export default chartData;
