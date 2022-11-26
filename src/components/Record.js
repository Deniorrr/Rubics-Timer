import React from 'react'
import RecordCSS from './style/Record.module.css'
class Record extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show_details:false
        }
    }
    render(){
        return(
        <tr className={RecordCSS.record} onClick={() =>this.props.display_details(this.props.id)}>
            <td>
                {this.props.id}
            </td>
            <td>
                {this.props.time}
            </td>
           
        </tr>
        )
    }
    
}

export default Record