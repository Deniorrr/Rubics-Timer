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
                {this.render_time()}
            </td>
           
        </tr>
        )
    }
    render_time(){
        if(this.props.dnf)return("DNF")
        return(String(this.props.time) + (this.props.plus2? "+":""))
    }
}

export default Record