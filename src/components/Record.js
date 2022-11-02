import React from 'react'

class Record extends React.Component {
    render(){
        return(

            <tr>
            <td>
                {this.props.counter}
            </td>
            <td>
                {this.props.time}
            </td>
        </tr>
        )
    }
}

export default Record