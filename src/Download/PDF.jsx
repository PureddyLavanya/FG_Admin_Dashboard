import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const convert = (title) => {
  const blo = document.getElementById("chart-block");
  html2canvas(blo).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();

    // Add the title
    pdf.setFontSize(16); // Set the font size of the title
    pdf.text(`${title} Meters`, 10, 20); // Add title at position (x: 10, y: 20)

    // Add the image
    pdf.addImage(imgData, 'PNG', 10, 30, 200, 150); // Adjust y position to fit below the title

    // Save the PDF
    pdf.save("chart.pdf");
  });
};
