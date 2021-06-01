import React, {useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';


export default function Student() {
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'id', headerName: 'Nom', width: 150 },
    { field: 'prenom', headerName: 'Prenom', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'filiere', headerName: 'Filiere', width: 150 },
    ];


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  )
}
