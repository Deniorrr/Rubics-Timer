import React from 'react'
import question_icon from './../assets/question-solid.svg'
import HelpCSS from './style/Help.module.css'

class Settings extends React.Component {
    render(){
        return(
            // <div> id="settings_button" title="Settings" onClick={() => this.switch_form()}>
            <div id={HelpCSS.help_button}>
                <img src={question_icon} alt="Help button" id={HelpCSS.question_mark} title='Help'/>
            </div>
        )
    }
}

export default Settings