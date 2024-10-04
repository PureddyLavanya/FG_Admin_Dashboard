import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const convert = () =>{
  const blo = document.getElementById("tbl");
  html2canvas(blo).then((canvas)=>{
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save("chart.pdf");
  })
};