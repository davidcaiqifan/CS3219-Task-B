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

// const columns = [
//     {
//         title: "Zoom Class", field: "classname",
//         // render: rowData => <Link href={`https://picsum.photos/1000?random=${rowData.id}`}
//         //     target="_blank">{rowData.id}</Link>
//     },
//     { title: "Zoom Link", field: "zoomlink" },
//     { title: "Professor Email", field: "profemail" },
//     { title: "Day", field: 'day' },
//     { title: "Time", field: "time" },
// ]
// export default class ZoomPage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: [],
//         };
//     }

//     componentDidMount() {
//         axios.get('http://localhost:4000/api/zoom')
//             .then(response => {
//                 this.setState({
//                     data: response.data['data']
//                 });
//                 console.log(this.state.data)
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//     }
//     render() {
//         return (
//             <div className="App">
//                 <h1 align="center">React-App</h1>
//                 <h4 align='center'>Material Table with CRUD operation</h4>
//                 <Router>
//                     <MaterialTable
//                         icons={tableIcons}
//                         title="Employee Data"
//                         data={this.state.data}
//                         columns={columns}
//                         editable={{
//                             onRowAdd: (newRow) => new Promise((resolve, reject) => {
//                                 const updatedRows = [...this.state.data, newRow]
//                                 setTimeout(() => {
//                                     axios.post('http://localhost:4000/api/zoom', newRow)
//                                     // .then(res => {
//                                     //     console.log(res.data)
//                                     //     this.state.data = updatedRows
//                                     // });
//                                     resolve()
//                                     this.setState({ data: updatedRows })
//                                 }, 2000)
//                             }),
//                             onRowDelete: selectedRow => new Promise((resolve, reject) => {
//                                 const index = selectedRow.tableData.id
//                                 console.log(selectedRow._id)
//                                 const updatedRows = [...this.state.data]
//                                 axios.delete(`http://localhost:4000/api/zoom/${selectedRow._id}`)
//                                 resolve()
//                                 updatedRows.splice(index, 1)
//                                 setTimeout(() => {
//                                     this.setState({ data: updatedRows })
//                                     resolve()
//                                 }, 2000)
//                             }),
//                             onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
//                                 const index = oldRow.tableData.id;
//                                 const updatedRows = [...this.state.data]
//                                 updatedRows[index] = updatedRow
//                                 axios.patch(`http://localhost:4000/api/zoom/${oldRow._id}`, updatedRow)
//                                     .then(res => {
//                                         console.log(res.data)
//                                     });
//                                 resolve()
//                                 setTimeout(() => {
//                                     this.setState({ data: updatedRows })
//                                     resolve()
//                                 }, 2000)
//                             })

//                         }}
//                         actions={[
//                             rowData => ({
//                                 icon: () => <Link to={`/product/${rowData._id}/edit`}><SearchIcon/></Link>,
//                                 tooltip: 'View',
//                                 onClick: (rowData)
//                               })
//                         ]}
//                         options={{
//                             actionsColumnIndex: -1, addRowPosition: "first"
//                         }}
//                     />
//                 </Router>

//             </div>
//         );
//     }
// }

// const zoomList = []
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
                        console.log(selectedRow._id)
                        const updatedRows = [...data]
                        axios.delete(`http://localhost:4000/api/zoom/${selectedRow._id}`)
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
                        axios.put(`http://localhost:4000/api/zoom/${oldRow._id}`, updatedRow)
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
                    // rowData => ({
                    //     icon: () => <Link to={`/product/${rowData._id}/edit`}><SearchIcon /></Link>,
                    //     tooltip: 'View',
                    //     onClick: (rowData)
                    // })
                    {
                        icon: Search,
                        tooltip: 'View',
                        onClick: (event, rowData) => history.push(`/details/${rowData._id}`)
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