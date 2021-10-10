import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import MUIDataTable from "mui-datatables";

const columns = ["Zoom Class", "ZoomLink", "Professor Email", "Day", "Time"];

// async function getData() {
//     axios.get('http://localhost:4000/api/zoom')
//         .then(res => {
//             //console.log(res.data['data'])
//             var result = res.data['data']
//             var output = result.map(zoom => {
//                 var data1 = []
//                 for (var i in zoom)
//                     data1.push(zoom[i])
//                 return data1
//             });
//             var data = []
//             data = output
//             //console.log(output)
//             return output
//         });
// }

const options = {
    filterType: 'checkbox',
};


const data = axios.get('http://localhost:4000/api/zoom')
    .then(res => {
        //console.log(res.data['data'])
        var result = res.data['data']
        var output = result.map(zoom => {
            var data1 = []
            for (var i in zoom)
                data1.push(zoom[i])
            return data1
        });
        return output
        //console.log(output)
    });

console.log(data)
export default function BasicTable() {
    return (
        <MUIDataTable
            title={"Zoom"}
            data={data}
            columns={columns}
            options={options}
        />
    );
}