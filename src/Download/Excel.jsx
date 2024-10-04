import * as XLSX from "xlsx";

export const exportDataToExcel = (data,title) => {
  const workbook = XLSX.utils.book_new();

  const worksheetData = [
    [title], 
    [],      
    ["Devices", "Value"], 
    ...data.map(item => [item.label, item.value]),
  ];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const maxLengths = worksheetData.reduce((acc, row) => {
    row.forEach((cell, colIndex) => {
      const cellLength = cell ? cell.toString().length : 0;
      acc[colIndex] = Math.max(acc[colIndex] || 0, cellLength);
    });
    return acc;
  }, []);
  worksheet['!cols'] = maxLengths.map(length => ({
    wch: length + 2 
  }));
  XLSX.utils.book_append_sheet(workbook, worksheet, "Chart Data");
  XLSX.writeFile(workbook, 'data.xlsx');
};
