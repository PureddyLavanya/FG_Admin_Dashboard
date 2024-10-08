import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {useState,useEffect,useMemo} from 'react';
import './styles.css';

const UserData=({tdata})=>{
  const [rowData, setRowData] = useState([]);
  const defaultColDef=useMemo(()=>{
    return {
      flex:6,
      filter:true,
      // floatingFilter:true,
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
  return (
    <div  className="ag-theme-quartz-dark text-center" style={{ height: 500 }}  >
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} 
      rowSelection={'multiple'}
      pagination={true}
      paginationPageSize={10}
      paginationPageSizeSelector={[2,3,5,8,10,12]}
      //rowClassRules={}
      />
    </div>
  );
};

export default UserData;