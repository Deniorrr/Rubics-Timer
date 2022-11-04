import React from 'react'

class Record extends React.Component {
    render(){
        return(
            <tr onClick={()=>this.delete_record(this.props.counter)}>
            <td>
                {this.props.counter}
            </td>
            <td>
                {this.props.time}
            </td>
        </tr>
        )
    }
    delete_record(id){
        this.props.delete_record(id);
    }
}

export default Record