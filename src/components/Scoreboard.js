import React from 'react'
import Record from './Record'
import ScoreboardCSS from './style/Scoreboard.module.css'
import x_icon from './../assets/x.svg'
class Scoreboard extends React.Component {
    table_header = []
    table_content = [];
    constructor(props){
        super(props);
        this.set_table_header();
        this.records = this.props.records
        this.current_id = 0;
    }
    state={
        show_details:false
    }
    render(){
        if(this.records.length > 0)
            this.append_ids();
        this.table_content = this.records.map((record) => <Record id={record[2]} time={record[1]} scramble={record[0]} plus2={record[3]} dnf ={record[4]} display_details={(id)=>{this.display_details(id)}}/>);
        return <aside id={ScoreboardCSS.scoreboard}>
            <table><tbody>
                {this.table_header}
                {this.table_content}
            </tbody></table>
            {this.render_details()}
        </aside>
    }
    

    render_details(){
        if(this.state.show_details){
        return(
            <div id={ScoreboardCSS.details_container}>
                <div id={ScoreboardCSS.details}>
                    <div id={ScoreboardCSS.close}>
                            <img src={x_icon} onClick={() => this.close_details()} alt="close button"></img>
                        </div>
                    <h1 id={ScoreboardCSS.name}>
                        Solve nr. {this.current_id}
                    </h1>
                    <h4>
                        Time:<br/> {this.records[this.current_id-1][1]}{this.records[this.current_id-1][3]? "+":""}{this.records[this.current_id-1][4]?" (DNF)":""}
                    </h4>
                    <h4>
                        Scramble: <br/>{this.records[this.current_id-1][0]}
                    </h4>
                    <div id={ScoreboardCSS.buttons}>
                        <button id={ScoreboardCSS.add2} onClick={()=> this.plus2()}>+2</button>
                        <button id={ScoreboardCSS.dnf} onClick={()=> this.dnf()}>DNF</button>
                        <button id={ScoreboardCSS.delete} onClick={()=> this.delete()}>Delete</button>
                    </div>
                </div>
            </div>)
        } 
    }
    display_details(id){
        this.current_id = id
        this.setState({
            show_details:true
        })
    }
    close_details(){
        this.setState({
            show_details:false
        })
    }
    plus2(){
        this.records[this.current_id-1][3] = !this.records[this.current_id-1][3]
        this.update_records();
    }
    dnf(){
        this.records[this.current_id-1][4] = !this.records[this.current_id-1][4]
        this.update_records();
    }
    delete(){
        this.records.splice(this.current_id-1, 1)
        this.close_details();
        this.update_records();
    }
    update_records(){
        localStorage.setItem("records", JSON.stringify(this.records))
        this.forceUpdate()
    }
    set_table_header(){
        this.table_header.push(<tr><th>ID</th><th>TIME</th></tr>)
    }
    append_ids(){
        let id = [1]
        this.records.forEach(element => element[2] = id++)
    }
}

export default Scoreboard