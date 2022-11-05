import React from 'react'
import CubeGridDisplay from './CubeGridDisplay'
import ScrambleCSS from './style/Scramble.module.css'

class Scramble extends React.Component {
    scramble_visual = [];
    constructor(props){
        super(props);
        this.settings = this.props.settings
    }
    render(){
        if(this.props.set_new_scramble){
            this.generate_visualisation();
            this.set_scramble()
        }
        return (
        <header>
            <div id={ScrambleCSS.scramble}>
                <h1>{this.scramble}</h1>
            </div>
                <CubeGridDisplay scramble={this.scramble_visual} settings={this.settings}/>
        </header>
        )
    }
    moves = ['U', 'UP', 'U2', 'R', 'RP', 'R2', 'F', 'FP', 'F2', 'L', 'LP', 'L2', 'D', 'DP', 'D2', 'B', 'BP', 'B2'];
    counter = ['D', 'D', 'D', 'L', 'L', 'L', 'B', 'B', 'B', 'R', 'R', 'R', 'U', 'U', 'U', 'F', 'F', 'F']
    scramble = "";
    move_name = "";
    previous_move = "V";
    previous_move2 = "X";
    lastrand;
    set_scramble(){
        this.scramble = "";
            let move_number,
            amount_of_moves = Math.floor(Math.random() * 4) + 21;
        for (let i = 1; i <= amount_of_moves; i++) {
            do {
                move_number = Math.floor(Math.random() * 18);
                this.move_name = this.assign_move_name(move_number);
            }
            while (this.move_is_wrong());

            this.append_move_to_visualisation(move_number);
            this.append_move_to_scramble();
            this.update_previous_moves(move_number)
        }
        this.props.onEnd(this.scramble)
    }
    generate_visualisation(){
        let colors = ["white","orange","green","red","blue","yellow"];
        let tiles_per_side = 9;
        for(let i = 0; i<colors.length;i++){
            for(let j = 0; j<tiles_per_side;j++){
                this.scramble_visual.push(colors[i]);
            }
        }
    }
    assign_move_name(_move_number){
        return this.moves[_move_number]
    }
    append_move_to_scramble(){
        if (this.move_name[1] === "P") {
            this.scramble += this.move_name[0] + "' ";
        } else {
            this.scramble += this.move_name + " ";
        }
    }
    move_is_wrong(){
        if(this.move_name[0] === this.previous_move) return true;//two the same moves 
        if(this.move_name[0] === this.previous_move2 && this.move_name[0] === this.counter[this.lastrand]) return true; //three opposite moves after each other like: UP DOWN UP
        return false;
    }
    update_previous_moves(_move_number){
        this.previous_move2 = this.previous_move;
        this.lastrand = _move_number;
        this.previous_move = this.move_name[0];
    }




    swap_tiles(z, x, c, v) {
        let helper = this.scramble_visual[z];
        this.scramble_visual[z] = this.scramble_visual[x];
        this.scramble_visual[x] = this.scramble_visual[c];
        this.scramble_visual[c] = this.scramble_visual[v];
        this.scramble_visual[v] = helper;
    }
    swap_tiles_even(z, x, c, v) {
        let helper = this.scramble_visual[z];
        this.scramble_visual[z] = this.scramble_visual[x];
        this.scramble_visual[x] = helper;
        helper = this.scramble_visual[c];
        this.scramble_visual[c] = this.scramble_visual[v];
        this.scramble_visual[v] = helper;
    }

   move(z, x, c, v, b, n, m, a, s, d, f, g, h, j, k, l, q, w, e, r) {

        this.swap_tiles(z, x, c, v);
        this.swap_tiles(b, n, m, a);
        this.swap_tiles(s, d, f, g);
        this.swap_tiles(h, j, k, l);
        this.swap_tiles(q, w, e, r);
    }
    move_even(z, x, c, v, b, n, m, a, s, d, f, g, h, j, k, l, q, w, e, r) {
        this.swap_tiles_even(z, x, c, v);
        this.swap_tiles_even(b, n, m, a);
        this.swap_tiles_even(s, d, f, g);
        this.swap_tiles_even(h, j, k, l);
        this.swap_tiles_even(q, w, e, r);
    }

    tile_change_order = [ //per every move
        [6, 8, 2, 0, 3, 7, 5, 1, 9, 18, 27, 36, 10, 19, 28, 37, 11, 20, 29, 38],
        [0, 2, 8, 6, 5, 7, 3, 1, 9, 36, 27, 18, 10, 37, 28, 19, 11, 38, 29, 20],
        [0, 8, 6, 2, 1, 7, 3, 5, 9, 27, 18, 36, 10, 28, 19, 37, 11, 29, 20, 38],
        [47, 42, 2, 20, 23, 50, 39, 5, 26, 53, 36, 8, 27, 33, 35, 29, 30, 34, 32, 28],
        [20, 2, 42, 47, 5, 39, 50, 23, 8, 36, 53, 26, 29, 35, 33, 27, 28, 32, 34, 30],
        [30, 32, 28, 34, 27, 35, 29, 33, 20, 42, 26, 36, 23, 39, 5, 50, 2, 47, 8, 53],
        [21, 25, 23, 19, 24, 26, 20, 18, 17, 47, 27, 6, 46, 30, 7, 14, 11, 45, 33, 8],
        [19, 23, 25, 21, 18, 20, 26, 24, 6, 27, 47, 17, 14, 7, 30, 46, 8, 33, 45, 11],
        [19, 25, 21, 23, 18, 26, 20, 24, 6, 47, 27, 17, 14, 30, 7, 46, 8, 45, 11, 33],
        [11, 9, 15, 17, 16, 14, 10, 12, 44, 45, 18, 0, 41, 48, 21, 3, 38, 51, 24, 6],
        [17, 15, 9, 11, 12, 10, 14, 16, 0, 18, 45, 44, 3, 21, 48, 41, 6, 24, 51, 38],
        [12, 14, 10, 16, 9, 17, 15, 11, 18, 44, 0, 45, 3, 48, 21, 41, 24, 38, 6, 51],
        [46, 48, 52, 50, 47, 45, 51, 53, 42, 33, 24, 15, 43, 34, 25, 16, 44, 35, 26, 17],
        [50, 52, 48, 46, 53, 51, 45, 47, 15, 24, 33, 42, 16, 25, 34, 43, 17, 26, 35, 44],
        [46, 52, 48, 50, 25, 43, 16, 34, 45, 53, 51, 47, 15, 33, 24, 42, 17, 35, 26, 44],
        [37, 39, 43, 41, 38, 36, 42, 44, 35, 51, 9, 2, 29, 53, 15, 0, 32, 52, 12, 1],
        [41, 43, 39, 37, 44, 42, 36, 38, 2, 9, 51, 35, 0, 15, 53, 29, 1, 12, 52, 32],
        [39, 41, 37, 43, 36, 44, 38, 42, 32, 12, 52, 1, 0, 53, 15, 29, 2, 51, 9, 35]
    ]

    append_move_to_visualisation(_move_number){
        if(_move_number%3===2){ //if you turn a side two times use different function
            this.move_even.apply(this, this.tile_change_order[_move_number])
        }else{
            this.move.apply(this,this.tile_change_order[_move_number])
        }
    }

//     U = function () {
//         this.move(6, 8, 2, 0, 3, 7, 5, 1, 9, 18, 27, 36, 10, 19, 28, 37, 11, 20, 29, 38);
//     }
//     UP = function () {
//         this.move(0, 2, 8, 6, 5, 7, 3, 1, 9, 36, 27, 18, 10, 37, 28, 19, 11, 38, 29, 20);
//     }
//     U2 = function () {
//         this.move_even(0, 8, 6, 2, 1, 7, 3, 5, 9, 27, 18, 36, 10, 28, 19, 37, 11, 29, 20, 38);
//     }
//     R = function () {
//         this.move(47, 42, 2, 20, 23, 50, 39, 5, 26, 53, 36, 8, 27, 33, 35, 29, 30, 34, 32, 28);
//     }
//     RP = function () {
//         this.move(20, 2, 42, 47, 5, 39, 50, 23, 8, 36, 53, 26, 29, 35, 33, 27, 28, 32, 34, 30);
//     }
//     R2 = function () {
//         this.move_even(30, 32, 28, 34, 27, 35, 29, 33, 20, 42, 26, 36, 23, 39, 5, 50, 2, 47, 8, 53);
//     }
//     F = function () {
//         this.move(21, 25, 23, 19, 24, 26, 20, 18, 17, 47, 27, 6, 46, 30, 7, 14, 11, 45, 33, 8);
//     }
//     FP = function () {
//         this.move(19, 23, 25, 21, 18, 20, 26, 24, 6, 27, 47, 17, 14, 7, 30, 46, 8, 33, 45, 11);
//     }
//     F2 = function () {
//         this.move_even(19, 25, 21, 23, 18, 26, 20, 24, 6, 47, 27, 17, 14, 30, 7, 46, 8, 45, 11, 33);
//     }
//     L = function () {
//         this.move(11, 9, 15, 17, 16, 14, 10, 12, 44, 45, 18, 0, 41, 48, 21, 3, 38, 51, 24, 6);
//     }
//     LP = function () {
//         this.move(17, 15, 9, 11, 12, 10, 14, 16, 0, 18, 45, 44, 3, 21, 48, 41, 6, 24, 51, 38);
//     }
//     L2 = function () {
//         this.move_even(12, 14, 10, 16, 9, 17, 15, 11, 18, 44, 0, 45, 3, 48, 21, 41, 24, 38, 6, 51);
//     }
//     B = function () {
//         this.move(37, 39, 43, 41, 38, 36, 42, 44, 35, 51, 9, 2, 29, 53, 15, 0, 32, 52, 12, 1);
//     }
//     BP = function () {
//         this.move(41, 43, 39, 37, 44, 42, 36, 38, 2, 9, 51, 35, 0, 15, 53, 29, 1, 12, 52, 32);
//     }
//     B2 = function () {
//         this.move_even(39, 41, 37, 43, 36, 44, 38, 42, 32, 12, 52, 1, 0, 53, 15, 29, 2, 51, 9, 35);
//     }
//     D = function () {
//         this.move(46, 48, 52, 50, 47, 45, 51, 53, 42, 33, 24, 15, 43, 34, 25, 16, 44, 35, 26, 17);
//     }
//     DP = function () {
//         this.move(50, 52, 48, 46, 53, 51, 45, 47, 15, 24, 33, 42, 16, 25, 34, 43, 17, 26, 35, 44);
//     }
//     D2 = function () {
//         this.move_even(46, 52, 48, 50, 25, 43, 16, 34, 45, 53, 51, 47, 15, 33, 24, 42, 17, 35, 26, 44);
//     }
//     choose = function (move) {
//         switch (move) {
//             case 0:
//                 this.U();
//                 break;
//             case 1:
//                 this.UP();
//                 break;
//             case 2:
//                 this.U2();
//                 break;
//             case 3:
//                 this.R();
//                 break;
//             case 4:
//                 this.RP();
//                 break;
//             case 5:
//                 this.R2();
//                 break;
//             case 6:
//                 this.F();
//                 break;
//             case 7:
//                 this.FP();
//                 break;
//             case 8:
//                 this.F2();
//                 break;
//             case 9:
//                 this.L();
//                 break;
//             case 10:
//                 this.LP();
//                 break;
//             case 11:
//                 this.L2();
//                 break;
//             case 12:
//                 this.D();
//                 break;
//             case 13:
//                 this.DP();
//                 break;
//             case 14:
//                 this.D2();
//                 break;
//             case 15:
//                 this.B();
//                 break;
//             case 16:
//                 this.BP();
//                 break;
//             case 17:
//                 this.B2();
//                 break;
//         }
//     }
}

// class Moves {
    
// }

// const moves = new Moves

export default Scramble