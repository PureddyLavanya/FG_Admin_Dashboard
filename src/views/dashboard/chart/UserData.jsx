import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {useState,useEffect,useMemo} from 'react';

const UserData=({tdata})=>{
  const [rowData, setRowData] = useState([]);
  const defaultColDef=useMemo(()=>{
    return {
      flex:6,
      filter:true,
      floatingFilter:true,
      editable:true
    };
  });  
const [colDefs, setColDefs] = useState([
  { field: "month",
    // headerName,valueFormatter,valueGetter,cellRenderer
    cellEditor:"agSelectEditor"
    // cellEditorParams:{values:"January","Febraury","March",""}
  },
  { field: "iceCreamSales"
  }
]);
  useEffect(()=>{
    setRowData(tdata);
  },[tdata]);
  return (
    <div  className="ag-theme-quartz" style={{ height: 500 }}  >
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
    </div>
  );
};

export default UserData;