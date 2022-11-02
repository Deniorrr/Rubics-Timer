import React from 'react'
import Record from './Record'

class Scoreboard extends React.Component {
    table_header = []
    table_content = [];
    counter = 0
    constructor(props){
        super(props);
        this.set_table_header();
    }
    render(){
        this.counter = 0
        this.table_content = this.props.records.map((record) => <Record counter={++this.counter} time={record[1]}/>);
        return <aside id='scoreboard'>
            <table><tbody>
                {this.table_header}
                {this.table_content}
            </tbody></table>
        </aside>
    }
    set_table_header(){
        this.table_header.push(<tr><th>ID</th><th>TIME</th></tr>)
    }
    
}

export default Scoreboard