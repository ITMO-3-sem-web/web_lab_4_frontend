import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchPointsTable,
    sendFormData,
    setFormData,
    showAlert
} from "../redux/actions";

class PointsTable extends Component {

    componentDidMount() {
        this.props.fetchPointsTable()
    }

    render() {

        return (
            <div>
                <table className="table table-hover table-info table-striped">
                    <thead className="table-primary">
                    <tr>
                        <th scope="col">X</th>
                        <th scope="col">Y</th>
                        <th scope="col">R</th>
                        <th scope="col">Результат</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.points.map( ( elem, index ) =>
                        <tr key={index}>
                            <th>{elem.x}</th>
                            <td>{elem.y}</td>
                            <td>{elem.r}</td>
                            <td>{elem.result}</td>
                        </tr>
                    )}
                    {console.log(this.props.points)}

                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        points: state.mainPage.points,
    }
}

// В этом не особо много смысла,
function mapDispatchToProps( dispatch ) {
    return {
        showAlert: ( alertText, timeLimitMS ) => {
            dispatch(showAlert( alertText, timeLimitMS ))
        },
        fetchPointsTable: () => {
            dispatch(fetchPointsTable())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (PointsTable)