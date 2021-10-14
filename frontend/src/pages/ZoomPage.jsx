import React, { Component } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';

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

// const options = {
//     filterType: 'checkbox',
//     onRowsDelete: (e) => {
//         console.log(this.state.zooms)
//         const idsToDelete = e.data.map(d => data[d.dataIndex].id);
//         // axios.delete(`http://localhost:4000/api/zoom${data}`)
//         //     .then(response => {
//         //         console.log(response.data)
//         //     })
//     } 
// };

export default class ZoomPage extends Component {
    constructor(props) {
        super(props);
        this.state = { zooms: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/zoom')
            .then(response => {
                var result = [];
                var json_data = response.data['data']
                json_data.map(x => {
                    var data1 = []
                    for (var i in x)
                        data1.push(x[i])
                    var id = data1.shift()
                    data1.push(id)
                    data1.shift()
                    result.push(data1);
                })

                this.setState({ zooms: result });
                this.setState({ data: response.data['data'] });

                console.log(this.state.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const columns = [
            { title: "Zoom Class", field: "classname"},
            { title: "Zoom Link", field: "zoomlink" },
            { title: "Professor Email", field: "profemail" },
            { title: "Day", field: 'day'},
            { title: "Time", field: "time"},
        ]
        return (
            <div className="App">
                <h1 align="center">React-App</h1>
                <h4 align='center'>View all zoom classes</h4>
                <MaterialTable
                    icons={tableIcons}
                    title="Zoom Classes"
                    data={this.state.data}
                    columns={columns}
                    editable={{
                        onRowAdd: (newRow) => new Promise((resolve, reject) => {
                            console.log(newRow)
                            // const updatedRows = [...this.state.data, { id: Math.floor(Math.random() * 100), ...newRow }]
                            // setTimeout(() => {
                            //     setData(updatedRows)
                            //     resolve()
                            // }, 2000)
                        }),
                    }}
                />
            </div>
        );
    }
}

