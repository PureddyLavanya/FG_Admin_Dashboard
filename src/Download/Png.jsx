import html2canvas from "html2canvas";

export const convert_png = (title) => {
  const x = title;
  const input = document.getElementById("chart-block");
  
  html2canvas(input).then((canvas) => {
    const ctx = canvas.getContext("2d");
    const titles = `${x}`;
    ctx.font = "20px Arial"; // Set the font size and style
    ctx.fillStyle = "#000"; // Set the title color (black)
    ctx.textAlign = "center"; // Center the title text
    ctx.fillText(titles, canvas.width / 2, 30); // Draw the title at the top center

    // Create a link to download the image
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "chart.png";
    link.click();
  });
};
