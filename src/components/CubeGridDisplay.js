import React from 'react'

class CubeGridDisplay extends React.Component {
    constructor(props){
        super(props);
        this.colors = this.props.settings.colors;
    }
    state={
        button_classname: "fancy",
        cube_classname: "show_front"
    }
    render(){
        let cube_grid = [];
        for (let i=0; i<6; i++){//for each side
            let side = [];
            for(let j = 0; j<3; j++){//for each row
                let row = [];
                for(let k=0; k<3; k++){//for each tile
                    row.push(this.tile_styled((i*9)+(j*3)+k));
                }
                side.push(<tr>{row}</tr>);
            }
            cube_grid.push(<table><tbody>{side}</tbody></table>);
        }

        return (
        <div>
            <div className={this.state.button_classname} id="cube_container">
                <div id="cube_grid" className={this.state.cube_classname}>
                    {cube_grid}
                </div>
            </div>
            <div id="cube_buttons">
                {this.generate_button()}
                <button id="change_view" onClick={this.change_view.bind(this)}>change view</button>
            </div>
        </div>);
    }
    cube_display_3d = true
    front_side_displayed = false
    // colors = {
    //     white:"#ffffff",
    //     orange:"#ff6400",
    //     green:"#05b527",
    //     red:"#b91818",
    //     blue:"#006bee",
    //     yellow:"#fdf400"
    // }
    tile_styled(tile_number){
        return (
            <td style={{backgroundColor: this.colors[this.props.scramble[tile_number]]}}></td>
        )
    }
    change_view(){
        if(this.cube_display_3d){
            this.setState({button_classname: "simple"});
        }else{
            this.setState({button_classname: "fancy"});
        }   
        this.cube_display_3d = !this.cube_display_3d;
    }
    generate_button(){
        if(this.cube_display_3d)return <button id="turn_3d_cube" onClick={this.change_side.bind(this)}>turn cube</button>
    }
    change_side(){
        if(this.front_side_displayed){
            this.setState({cube_classname: "show_front"});
        }else{
            this.setState({cube_classname: "show_back"});
        }   
        this.front_side_displayed = !this.front_side_displayed;
    }
}

export default CubeGridDisplay