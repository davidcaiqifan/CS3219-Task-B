import React, { Component } from 'react';
import axios from 'axios';
import { forwardRef } from 'react';
import MaterialTable from 'material-table'

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

const columns = [
    { title: "Zoom Class", field: "classname" },
    { title: "Zoom Link", field: "zoomlink" },
    { title: "Professor Email", field: "profemail" },
    { title: "Day", field: 'day' },
    { title: "Time", field: "time" },
]

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

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        console.log(this.props.match.params)
        axios.get(`http://localhost:4000/api/zoom/${this.props.match.params.classname}`)
            .then(response => {
                var data1 = []
                data1.push(response.data)
                this.setState({
                    data: data1
                });
                console.log(this.state.data)
                console.log(data1)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        // return (
        //     <div style={{ height: 400, width: '100%' }}>
        //         <DataGrid
        //             rows={rows}
        //             columns={columns}
        //             pageSize={5}
        //             rowsPerPageOptions={[5]}
        //             checkboxSelection
        //         />
        //     </div>
        // );
        return (
            <div style={{ height: 400, width: '100%' }}>
                <MaterialTable
                    icons={tableIcons}
                    title="Zoom Classes"
                    data={this.state.data}
                    columns={columns}
                    options={{
                        actionsColumnIndex: -1, addRowPosition: "first"
                    }}
                />
            </div>
        );
    }
}