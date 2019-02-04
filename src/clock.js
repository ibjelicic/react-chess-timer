import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Settings, Pause, Reset, Play } from "./icons.js";


const ClockWrapper = styled.div`
    display: grid;
    height: 100%;
    align-content: start;
    grid-template-columns: 1;
    grid-template-rows: 2;
`;

const WhiteField = styled.div`
    color: ${props => props.fieldColor === 'black'? 'white' : 'black'}; 
    background-color: ${props => props.fieldColor === 'black'? 'red' : 'white'};
    height: 44vh;
    & > div {
        transform: rotate(180deg);
    }
`;
const BlackField = styled.div`
    color: white;
    background-color: ${props => props.fieldColor === 'white' ? 'red' : 'black'};
    height: 44vh;
`;

const ControlContainer = styled.div`
    display:flex;
    color: white;
    background-color: #2196f3;
    height: 12vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 5vh;
    justify-content:space-around;
`;

const TimeContainer = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height:100%;
    width:100%;
    user-select: none;
    font-size:10vh;
`
const SettingsButton = styled.div`
    visibility: ${props => props.visible === true ? 'hidden' : 'visible'}; 
    color: white;
    
`
const StartStopButton = styled.div`
    color: white;
`
const ResetButton = styled.div`
    visibility: ${props => props.visible === true ? 'hidden' : 'visible'}; 
    color: white;
`

const SettingsWindow= styled.div`

    color: white;
    position: fixed;
    background:  ${props => props.settingsVisibility ? '#2196f3' : 'none'}; 
    top: 0;
    left: 0;
    width: 100%;
    height: ${props => props.settingsVisibility ? '100%' : '0%'}; 
    transition: height .65s;
    overflow: hidden;
    z-index: 1000;
`

const SettingsBtn= styled.button`

    color: white;
    font-size: 5vh;
    margin: 5%;
    background-color:transparent;
    height: 10vh;
    width: 35vw;
    border: 1px solid white;
    border-radius: 30%;
`
const SettingsNumberInput= styled.input`

    height: 8vh;
    width: 11vw;
    font-size: 5vh;
    text-align: center;
    color: white;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 30%;
`

const SettingsFieldSet = styled.fieldset`
font-size: 5vh;
color: white;
border: 2px solid white;
margin: 3%;
text-align: center;
`
const SettingsLegend = styled.legend`
text-align: center;
`

class Clock extends Component {

    constructor(props) {
        super(props);

        this.whiteHourInput = React.createRef();
        this.whiteMinInput = React.createRef();
        this.whiteSecInput = React.createRef();
        this.addWhiteInput = React.createRef();

        this.blackHourInput = React.createRef();
        this.blackMinInput = React.createRef();
        this.blackSecInput = React.createRef();
        this.addBlackInput = React.createRef();
      }
    
  
    state = {
        whiteHour: 0,
        whiteMin: 5,
        whiteSec: 0,
        blackHour: 0,
        blackMin: 5,
        blackSec: 0,
        nextPlayer: "white",
        playing: false,
        addWhite: 5,
        addBlack: 5,
        settingsVisibility: false,
        winner: '',
        defaultSettings: {
            whiteHour: 0,
            whiteMin: 5,
            whiteSec: 0,
            blackHour: 0,
            blackMin: 5,
            blackSec: 0,
            nextPlayer: "white",
            playing: false,
            addWhite: 5,
            addBlack: 5,
            settingsVisibility: false,
            winner: '',
        }
    };



        
        countdownTimeStart = (h,m,s) => {
            
            // Calculating distance from input parameters
            let distance = (h * 60 * 60) + (m * 60) + s;
            --distance;
            //Setting interval 
            this.timer = setInterval(() => {
        
            // Time calculations for hours, minutes and seconds from distance
            let hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
            let minutes = Math.floor((distance % (60 * 60)) / 60);
            let seconds = distance % 60;
    
            //set state white remaining time
            if(this.state.nextPlayer === "white"&&this.state.playing ===true) {
                this.setState({
                    whiteHour: hours,
                    whiteMin: minutes,
                    whiteSec: seconds
                });
            }
            //set state black remaining time
            if(this.state.nextPlayer === "black" &&this.state.playing ===true) {
                this.setState({
                    blackHour: hours,
                    blackMin: minutes,
                    blackSec: seconds
                });
            }
    
            //Update the distance down every 1 second
            if (distance === 0)
            {
                if(this.state.nextPlayer==="black")
                this.setState({
                    winner: "white",
                    playing: false
                });
                if(this.state.nextPlayer==="white")
                this.setState({
                    winner: "black",
                    playing: false
                });

                return false;
            }
            --distance;      
            
            }, 1000);
        }
    
        handleWhiteClick = () =>{
            if(this.state.nextPlayer === "white" && this.state.winner === "")
            {
                this.setState({
                    playing: true,
                    whiteSec: this.state.whiteSec + this.state.addWhite

                });
                clearInterval(this.timer);
                this.countdownTimeStart(this.state.blackHour,this.state.blackMin,this.state.blackSec);
                this.setState({
                    nextPlayer : "black",
                    
                });
            }
            return false;
        }

        handleBlackClick = () =>{

            if(this.state.nextPlayer === "black" && this.state.winner === "")
            {
                this.setState({
                    playing: true,
                    blackSec: this.state.blackSec + this.state.addBlack
                });
                clearInterval(this.timer);
                this.countdownTimeStart(this.state.whiteHour,this.state.whiteMin,this.state.whiteSec);
                this.setState({
                    nextPlayer : "white"
                });
            }
            return false;
        }
        formatOutput = (h, m, s) => {

            let distance = (h * 60 * 60) + (m * 60) + s;

            // Time calculations for hours, minutes and seconds from distance
            let hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
            let minutes = Math.floor((distance % (60 * 60)) / 60);
            let seconds = distance % 60;

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            return hours + ":" + minutes + ":" + seconds;
        }

        handleResetGame = () =>{
                clearInterval(this.timer);
                this.setState({
                    whiteHour: this.state.defaultSettings.whiteHour,
                    whiteMin: this.state.defaultSettings.whiteMin,
                    whiteSec: this.state.defaultSettings.whiteSec,
                    blackHour: this.state.defaultSettings.blackHour,
                    blackMin: this.state.defaultSettings.blackMin,
                    blackSec: this.state.defaultSettings.blackSec,
                    nextPlayer: this.state.defaultSettings.nextPlayer,
                    playing: this.state.defaultSettings.playing,
                    addWhite: this.state.defaultSettings.addWhite,
                    addBlack: this.state.defaultSettings.addBlack,
                    settingsVisibility: this.state.defaultSettings.settingsVisibility,
                    winner: this.state.defaultSettings.winner
                });
        }

        handlePlayPauseGame = () => {

            //pause the game if it is playing
            if(this.state.playing === true){

                clearInterval(this.timer);
                this.setState({
                    playing: false
                });
            }

            // continue the game if next player is white
            else if (this.state.playing === false && this.state.nextPlayer === "white" && this.state.winner === "" &&
            
            //check if this is not the first move in the game
            (
                this.state.whiteHour !== this.state.defaultSettings.whiteHour ||
                this.state.whiteMin !== this.state.defaultSettings.whiteMin ||
                this.state.whiteSec !== this.state.defaultSettings.whiteSec 
                
            )
            ) {

                this.countdownTimeStart(this.state.whiteHour,this.state.whiteMin,this.state.whiteSec);
                    this.setState({
                        nextPlayer : "white",playing: true
                    });
            }
            // continue the game if next player is black
            else if(this.state.playing === false && this.state.nextPlayer ==="black" && this.state.winner === "" ){

                 this.countdownTimeStart(this.state.blackHour,this.state.blackMin,this.state.blackSec);
                     this.setState({
                        nextPlayer : "black",playing: true
                    });
            }
            
               else {return false;}
                
            
        }   
    


    

        handleSettingsButton = () =>{
            clearInterval(this.timer);
            this.setState({
                settingsVisibility: true
            });
    }

        handleSettingsCancelButton = () =>{
            this.setState({
                settingsVisibility: false
            });
    }
    
            handleSettingsSaveButton = (e) =>{
            this.setState({

                defaultSettings:{
                    whiteHour: parseInt(this.whiteHourInput.current.value),
                    whiteMin: parseInt(this.whiteMinInput.current.value),
                    whiteSec: parseInt(this.whiteSecInput.current.value),
                    blackHour: parseInt(this.blackHourInput.current.value),
                    blackMin: parseInt(this.blackMinInput.current.value),
                    blackSec: parseInt(this.blackSecInput.current.value),
                    nextPlayer: "white",
                    playing: false,
                    addWhite: parseInt(this.addWhiteInput.current.value),
                    addBlack: parseInt(this.addBlackInput.current.value),
                    settingsVisibility: false,
                    winner: ''
                },
                settingsVisibility: false
            });
    }

    // handleSettingsFieldChange = (e) =>{

    //     throw new console.error('not implemented');
        
    // }

    render() {
        return (

            <ClockWrapper>
                <SettingsWindow settingsVisibility={this.state.settingsVisibility}>

            <SettingsFieldSet>
                <SettingsLegend>White time settings</SettingsLegend>
                <SettingsNumberInput type="number" min="0" max="23" ref={this.whiteHourInput} defaultValue={this.state.defaultSettings.whiteHour} onChange={this.handleSettingsFieldChange}/>:
                <SettingsNumberInput type="number" min="0" max="59" ref={this.whiteMinInput} defaultValue={this.state.defaultSettings.whiteMin}/>:
                <SettingsNumberInput type="number" min="0" max="59" ref={this.whiteSecInput} defaultValue={this.state.defaultSettings.whiteSec}/> <br/>add time
                <SettingsNumberInput type="number" min="0" max="59" ref={this.addWhiteInput} defaultValue={this.state.defaultSettings.addWhite}/>sec 
            </SettingsFieldSet>
            <SettingsFieldSet>
                <SettingsLegend>Black time settings</SettingsLegend>
                <SettingsNumberInput type="number" min="0" max="23" ref={this.blackHourInput} defaultValue={this.state.defaultSettings.blackHour}/>:
                <SettingsNumberInput type="number" min="0" max="59" ref={this.blackMinInput} defaultValue={this.state.defaultSettings.blackMin}/>:
                <SettingsNumberInput type="number" min="0" max="59" ref={this.blackSecInput} defaultValue={this.state.defaultSettings.blackSec}/> <br/>add time
                <SettingsNumberInput type="number" min="0" max="59" ref={this.addBlackInput} defaultValue={this.state.defaultSettings.addBlack}/>sec
            </SettingsFieldSet>

                <SettingsBtn onClick={this.handleSettingsSaveButton}>Save</SettingsBtn>
                <SettingsBtn onClick={this.handleSettingsCancelButton}>Cancel</SettingsBtn>
                </SettingsWindow>
                <WhiteField onClick={this.handleWhiteClick} fieldColor={this.state.winner}>
                    <TimeContainer>
                        {this.formatOutput(this.state.whiteHour,this.state.whiteMin,this.state.whiteSec)}
                    </TimeContainer>
                </WhiteField>
                <ControlContainer>
                    <SettingsButton visible={this.state.playing} onClick={this.handleSettingsButton}><Settings/></SettingsButton>
                    <StartStopButton onClick={this.handlePlayPauseGame}>{this.state.playing === false ? <Play/> : <Pause/>}</StartStopButton>
                    <ResetButton visible={this.state.playing} onClick={this.handleResetGame}><Reset/></ResetButton>
                </ControlContainer>
                <BlackField onClick={this.handleBlackClick} fieldColor={this.state.winner}>
                    <TimeContainer>
                    {this.formatOutput(this.state.blackHour,this.state.blackMin,this.state.blackSec)}
                    </TimeContainer>
                </BlackField>
            </ClockWrapper>
        );
    }
}

export default Clock;
  