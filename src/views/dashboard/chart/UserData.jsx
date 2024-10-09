import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {useState,useEffect,useMemo} from 'react';
import './styles.css';
import { Button } from "react-bootstrap";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const UserData=({tdata})=>{
  const [rowData, setRowData] = useState([]);
  const defaultColDef=useMemo(()=>{
    return {
      flex:6,
      filter:true,
      floatingFilter:true,
      filterParams:{
        debounceMs:1000,
        buttons: ['apply','reset']
      },
      editable:true
    };
  });  
  const [colDefs, setColDefs] = useState([
    { field: "month",
      // headerName,valueFormatter,valueGetter,cellRenderer,cellClassRules
      editable:true,
      cellEditor:"agSelectCellEditor",
      cellEditorParams:{values:["January","February","March","April","May","June","July","August","September","October","November","December"]},
      checkboxSelection:true
    },
    { field: "iceCreamSales"
    }
  ]);
  useEffect(()=>{
    setRowData(tdata);
  },[tdata]);
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ice Cream Sales Data');

    const header = ['Month', 'Sales'];
    const headerRow = worksheet.addRow(header);
  
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' }, 
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  
    tdata.forEach((data) => {
      worksheet.addRow([data.month, data.iceCreamSales]);
    });
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
      from: 'A1',
      to: 'B1',
    };
  
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Table_Data.xlsx');
  };

  return (
    <div className="mx-auto">
      <div className="mb-2 mt-0 text-center">
        <Button onClick={exportExcel} variant="info" size='md'>Export To Excel</Button>
      </div>
      <div  className="ag-theme-quartz-dark text-center" style={{ height: 500 }} lg='9' md='10' sm='10'>
        <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} 
        animated
        rowSelection={'multiple'}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[2,3,5,8,10,12]}
        //rowClassRules={}
        />
      </div>
    </div>
  );
};

export default UserData;