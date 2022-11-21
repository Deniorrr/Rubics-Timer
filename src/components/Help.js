import React from 'react'
import question_icon from './../assets/question-solid.svg'
import arrow_right from './../assets/arrow.svg'
import x_icon from './../assets/x.svg'
import HelpCSS from './style/Help.module.css'

class Settings extends React.Component {
    state = {
        show_help:false,
        advice_number:0
    }
    advices = [
        "1. This is an app called 'Rubiks timer. It's designed for speedcubers - people that can solve worlds most popular puzzle, the Rubiks Cube.",
        "2. This application will help you scramble your cube, record your solving time and track your progress.",
        "3. To use the app properly, grab your solved cube, face it with white color on top and green in front. Then scramble it according to moves randomly generated in the top part of the app.",
"4. How to read the notation? Each side has a letter assigned. F for front, L - left, R - right, D - down, B - back, U - up. A single letter by itself refers to a clockwise rotation in 90 degrees. Apostrophe a counterclockwise move. The number 2 marks a double turn. ",
"5. You can check the scramble with the visualisation displayed in bottom right corner. ",
"6. To start the timer hold SPACEBAR until the time in the middle will turn green. Releasing it will start counting time. Now it's time to solve your cube. To stop time press SPACEBAR again.",
"7. Your time will be added to the scoreboard on the left. Press the time to delete it.",
"8. You can also change a few settings to adapt the app to your needs."
    ]
    render(){
        console.log(this.state.advice_number)
        return(
            // <div> id="settings_button" title="Settings" onClick={() => this.switch_form()}>
            <div id="settings">
                <div id={HelpCSS.help_button}>
                    <img src={question_icon} alt="Help button" id={HelpCSS.question_mark} title='Help' onClick={() => this.switch_help()}/>
                </div>
                <div className={this.state.show_help ? HelpCSS.show_help : HelpCSS.hide_help} id={HelpCSS.help_container}>
                    <div id={HelpCSS.help}>
                        <div id={HelpCSS.close}>
                        <img src={x_icon} onClick={() => this.switch_help()}></img>
                        </div>
                        <p id={HelpCSS.prompt}>
                            {this.advices[this.state.advice_number]}
                        </p>
                        <div id={HelpCSS.buttons}>
                            <div id={HelpCSS.arrow}>
                                <img src={arrow_right} alt="previous" id={HelpCSS.arrow_left} title='previous' onClick={() => this.previous_advice()}/>
                            </div>
                            <div id={HelpCSS.arrow}>
                                <img src={arrow_right} alt="next" id={HelpCSS.arrow_right} title='next' onClick={() => this.next_advice()}/>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        )
    }
    next_advice(){
        this.setState({advice_number: (this.state.advice_number+1)%this.advices.length})
    }
    previous_advice(){
        if(this.state.advice_number === 0){
            this.setState({advice_number:this.advices.length-1})
        }else{
            this.setState({advice_number: (this.state.advice_number-1)%this.advices.length})
        }
    }
    switch_help(){
        if(this.state.show_help){
            this.setState({show_help: false})
        }else{
            this.setState({show_help: true})
        }
    }
}

export default Settings
//1. This is an app called "Rubiks timer. It's designed for speedcubers - people that can solve worlds most popular puzzle, the Rubiks Cube.
//2. This application will help you scramble your cube, record your solving time and track your progress.
//3. To use the app properly, grab your solved cube, face it with white color on top and green in front. Then scramble it according to moves randomly generated in the top part of the app.
//4. How to read the notation? Each side has a letter assigned. F for front, L - left, R - right, D - down, B - back, U - up. A single letter by itself refers to a clockwise rotation in 90 degrees. Apostrophe a counterclockwise move.
// The number 2 marks a double turn. 
//5. You can check the scramble with the visualisation displayed in bottom right corner. 
//6. To start the timer hold SPACEBAR until the time in the middle will turn green. Releasing it will start counting time. Now it's time to solve your cube. To stop time press SPACEBAR again.
//7. Your time will be added to the scoreboard on the left. Press the time to delete it.
//8. You can also change a few settings to adapt the app to your needs.