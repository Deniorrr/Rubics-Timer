import React from 'react'
import Record from './Record'
import ScoreboardCSS from './style/Scoreboard.module.css'

class Scoreboard extends React.Component {
    table_header = []
    table_content = [];
    constructor(props){
        super(props);
        this.set_table_header();
        this.records = this.props.records
    }
    render(){
        if(this.records.length > 0)
            this.append_ids();
        this.table_content = this.records.map((record) => <Record counter={record[2]} time={record[1]} delete_record={(id)=>{this.delete_record(id)}}/>);
        return <aside id={ScoreboardCSS.scoreboard}>
            <table><tbody>
                {this.table_header}
                {this.table_content}
            </tbody></table>
        </aside>
    }
    set_table_header(){
        this.table_header.push(<tr><th>ID</th><th>TIME</th></tr>)
    }
    append_ids(){
        let id = [1]
        this.records.forEach(element => element[2] = id++)
    }
    delete_record(id){
         this.records.splice(id-1, 1)
         this.forceUpdate()
    }
}

export default Scoreboard