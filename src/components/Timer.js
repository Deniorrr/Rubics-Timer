import React from 'react'

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            time: 0.00,
            text_color: "#fff"
        }
        window.addEventListener('keydown', this.onpress.bind(this));
        window.addEventListener('keyup', this.onrelease.bind(this));
    }
    render() {
        return <div id="timer" style={{color: this.state.text_color}}>
            {this.state.time}
            </div>
    }
    
    space_hold = false;
    space_held_long_enough = false;
    timer_started = false;
    time = 0;
    time_displayed = 0 
    timer_updater = false;
    timer_interval;

    onpress() {
        if (!this.timer_started) {
            if (!this.space_hold) {
                this.change_color("red")
                this.timer_updater = setTimeout(this.wait_for_countdown.bind(this), 300);
                this.space_hold = true;
            }
        } else {
            this.stop_timer();
        }
    }
    onrelease() {
        if (!this.timer_started) this.space_hold = false;
        this.change_color("white")
        if (!this.space_held_long_enough) {
            clearTimeout(this.timer_updater);
        } else {
            this.start_timer();
            this.space_held_long_enough = false;
        }
    }
    start_timer() {
        this.timer_started = true;
        this.time = new Date().getTime();
        this.timer_interval = setInterval(this.update_clock.bind(this), 100);
    }
    stop_timer(){
        clearInterval(this.timer_interval);
            this.time = parseFloat(Math.round(Math.round(((new Date().getTime()) - this.time) / 10)) / 100).toFixed(2);;
            this.props.onEnd(this.time)
            this.setState({time : this.time});
            this.timer_started = false;
    }
    wait_for_countdown() {
        this.space_held_long_enough = true;
        this.change_color("green")
        this.setState({time:0})
    }
    update_clock() {
        this.setState({time:parseFloat(Math.round(Math.round(((new Date().getTime()) - this.time) / 100) * 10) / 100).toFixed(1)})
    }

    change_color(color){
        this.setState({text_color: this.colors[color]});
    }

    colors = {
        white:"#bbb",
        green:"#0f0",
        red:"#f00",
    }
}
    
export default Timer