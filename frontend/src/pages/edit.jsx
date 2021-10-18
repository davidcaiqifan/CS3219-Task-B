import React, { Component } from 'react';
import { useState, useEffect, props } from 'react';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import axios from 'axios';
// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@material-ui/icons/Add';
// import Icon from '@mui/material/Icon';
// import SearchIcon from '@mui/icons-material/Search';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

function HomeButton() {
    const history = useHistory();

    function handleClick() {
        history.push("/home");
    }

    return (
        <button type="button" onClick={handleClick}>
            Go home
        </button>
    );
}

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


function App() {
    const history = useHistory();
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/api/zoom')
            .then(response => {
                setData(response.data['data'])
                console.log(this.state.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const columns = [
        { title: "Zoom Class", field: "classname", },
        { title: "Zoom Link", field: "zoomlink" },
        { title: "Professor Email", field: "profemail" },
        { title: "Day", field: 'day' },
        { title: "Time", field: "time" },
    ]


    return (
        <div className="App">
            <h1 align="center">React-App</h1>
            <h4 align='center'>Material Table with CRUD operation</h4>
            <MaterialTable
                icons={tableIcons}
                title="Zoom Classes"
                data={data}
                columns={columns}
                editable={{
                    onRowAdd: (newRow) => new Promise((resolve, reject) => {
                        const updatedRows = [...data, newRow]
                        // setTimeout(() => {
                        //     axios.post('http://localhost:4000/api/zoom', newRow)
                        //     resolve()
                        //     setData(updatedRows)
                        // }, 2000)
                        axios.post('http://localhost:4000/api/zoom', newRow)
                        resolve()
                        setData(updatedRows)
                        resolve()
                    }),
                    onRowDelete: selectedRow => new Promise((resolve, reject) => {
                        const index = selectedRow.tableData.id
                        console.log(selectedRow)
                        const updatedRows = [...data]
                        axios.delete(`http://localhost:4000/api/zoom/${selectedRow.classname}`)
                        resolve()
                        updatedRows.splice(index, 1)
                        // setTimeout(() => {
                        //     setData(updatedRows)
                        //     resolve()
                        // }, 2000)
                        setData(updatedRows)
                        resolve()
                    }),
                    onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                        const index = oldRow.tableData.id;
                        const updatedRows = [...data]
                        updatedRows[index] = updatedRow
                        axios.put(`http://localhost:4000/api/zoom/${oldRow.classname}`, updatedRow)
                            .then(res => {
                                console.log(res.data)
                            });
                        resolve()
                        // setTimeout(() => {
                        //     setData(updatedRows)
                        //     resolve()
                        // }, 2000)
                        setData(updatedRows)
                        resolve()

                    })

                }}
                actions={[
                    {
                        icon: Search,
                        tooltip: 'View',
                        onClick: (event, rowData) => history.push(`/details/${rowData.classname}`)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1, addRowPosition: "first"
                }}
            />
        </div>
    );
}

export default App;