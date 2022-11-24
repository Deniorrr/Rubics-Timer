import React from 'react'
import RecordCSS from './style/Record.module.css'
import x_icon from './../assets/x.svg'
class Record extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show_details:false
        }
    }
    render(){
        return(
        <tr className={RecordCSS.record} onClick={() =>this.display_details()}>
            <td>
                {this.props.counter}
            </td>
            <td>
                {this.props.time}
            </td>
            {this.render_details()}
        </tr>
        )
    }
    display_details(){
        console.log("pokaz")
        this.setState({
            show_details:true
        })
    }
    close_details(){
        console.log("schowaj")
        this.setState({
            show_details:false
        })
    }
    render_details(){
        if(this.state.show_details){
        return(
            <div id={RecordCSS.details_container}>
                <div id={RecordCSS.details}>
                    <div id={RecordCSS.close}>
                            <img src={x_icon} onClick={() => this.close_details()} alt="close button"></img>
                        </div>
                    <h1 id={RecordCSS.name}>
                        Solve nr. {this.props.counter}
                    </h1>
                    <h4>
                        Time:<br/> {this.props.time}
                    </h4>
                    <h4>
                        Scramble: <br/>{this.props.scramble}
                    </h4>
                    <div id={RecordCSS.buttons}>
                        
                        <button id={RecordCSS.add2} onClick={()=> this.add_seconds()}>+2</button>
                        <button id={RecordCSS.dnf} onClick={()=> this.dnf()}>DNF</button>
                        <button id={RecordCSS.delete} onClick={()=> this.delete()}>Delete</button>
                    </div>
                </div>
            </div>)
        } 
    }
    dnf(){
        //nie można this.props.time = 10;
        console.log("switch bool dnf")
    }
    add_seconds(){
        //nie można this.props.time = 10;
        console.log("switch bool +2")
    }
    delete(id){
        this.props.delete_record(id);
        this.close_details()
    }
}

export default Record