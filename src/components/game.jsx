import React, { Component } from 'react';
import Board from './board';
import Player from './player';
import PreviewMatch from './previewmatch';
import Status from "./status";




function slidePlayerDeatails(playerNum){
    let _player = document.getElementsByClassName("player")[playerNum];
   // _player.classList.toggle("player-popup");
    
    let _playerDetails = document.getElementsByClassName("player-details")[playerNum];
    let _slidingIcon = document.getElementsByClassName("sliding-button")[playerNum];
    console.log(_slidingIcon);
    if(_playerDetails.style.display === "block"){
        _playerDetails.style.display = "none";
        _player.classList.remove("player-popup");
        _slidingIcon.classList.remove("rotate-icon");

        
    }
    else{
        _player.classList.add("player-popup");
        _playerDetails.style.display = "block";
        _slidingIcon.classList.add("rotate-icon");
        
    }
}

function displayMessage(messageType, textMessage){
  let _message =  document.getElementsByClassName("message")
    document.getElementsByClassName("warning-message")[0].style.display = "none";
    document.getElementsByClassName("wining-message")[0].style.display = "none";


  if(messageType === "warning"){
      document.getElementsByClassName("message-heading")[0].style.backgroundColor = "red";
      document.getElementsByClassName("warning-message")[0].style.display = "flex";
        document.getElementsByClassName("text-message")[0].innerHTML = textMessage;

  }
  else{
        document.getElementsByClassName("message-heading")[0].style.backgroundColor = "green";
        document.getElementsByClassName("message-heading")[0].style.color = "white";
        let fullMessage = "Congratulation! <br>" + textMessage + "<br>Would you like to reset the Board?";
        document.getElementsByClassName("text-message")[0].innerHTML = fullMessage;

      document.getElementsByClassName("wining-message")[0].style.display = "flex";

  }
  document.getElementById("heading-info").innerHTML = messageType;

  _message[0].style.display = "block";
  
  console.log(_message);
}

function closeMessage(){
      let _message =  document.getElementsByClassName("message")
    _message[0].style.display = "none";
}


function isEven(num){
    return num%2 === 0;
}


function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function calculateWinner(gamedata) {
  const winningLines = [
 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [0, 4, 8],
    [2, 4, 6],
  ];

  if(gamedata[0] && gamedata[1] && gamedata[2] ){
    if( gamedata[0].name === "player-2" && gamedata[0].name === gamedata[1].name && gamedata[0].name === gamedata[2].name ){
        return gamedata[0].name;
    }
  }


  if(gamedata[6] && gamedata[7] && gamedata[8] ){
    if(gamedata[6].name === "player-1" && gamedata[6].name === gamedata[7].name && gamedata[6].name === gamedata[8].name ){
        return gamedata[6].name;
    }
  }

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

     if(gamedata[a] && gamedata[b]&& gamedata[c]){
 
        if (gamedata[a] && gamedata[a].name === gamedata[b].name && gamedata[a].name === gamedata[c].name) {
   
        return gamedata[a].name;
        }
     }
    
  }
  return  null;
}







class Game extends Component {
    constructor(props){
        super(props);
        
        this.state ={
            matchList: [
                {
                    match:{
                        winner: null,
                        matchID:1,
                        duration: 0,
                        startTime: new Date(),
                        finishTime: null,
                        movesList:[
                            {
                                gameData:[
                                    {id:"p1-1", name:"player-1", isdragable:true},
                                    {id:"p1-2", name:"player-1", isdragable:true},
                                    {id:"p1-3", name:"player-1", isdragable:true},
                                    null,
                                    null,
                                    null,
                                    {id:"p2-1", name:"player-2", isdragable:false},
                                    {id:"p2-2", name:"player-2", isdragable:false},
                                    {id:"p2-3", name:"player-2", isdragable:false},
                                ],
                                 p1IsNext:true,
                            }
                        ]
                    }
                }
            ]

        }
   
      
    }
    state = {  }

    resetBoard(){
        let _matchList = this.state.matchList.slice();
        let _lastMatchID = _matchList[_matchList.length -1].match.matchID;
        let _duration = Math.abs( new Date(_matchList[_matchList.length -1].match.finishTime) - new Date(_matchList[_matchList.length -1].match.startTime));
            
            console.log(_duration);
         _matchList[_matchList.length -1].match.winner = calculateWinner(this.getLastMove().gameData)
         _matchList[_matchList.length -1].match.duration = millisToMinutesAndSeconds(_duration);

         let turn = isEven(_matchList.length);
         let newMatch =  {
                    match:{
                        winner: null,
                        matchID: _lastMatchID +1,
                        duration: 0,
                        startTime: new Date(),
                        finishTime: null,
                        movesList:[
                            {
                                gameData:[
                                    {id:"p1-1", name:"player-1", isdragable:true},
                                    {id:"p1-2", name:"player-1", isdragable:true},
                                    {id:"p1-3", name:"player-1", isdragable:true},
                                    null,
                                    null,
                                    null,
                                    {id:"p2-1", name:"player-2", isdragable:false},
                                    {id:"p2-2", name:"player-2", isdragable:false},
                                    {id:"p2-3", name:"player-2", isdragable:false},
                                ],
                                 p1IsNext:turn,
                            }
                        ]
                    }
                }

                _matchList.push(newMatch);

                this.setState({
                    matchList: _matchList,
                });

                console.log(this.state.matchList);
                console.log(this.getListOfMatch("player-1"));

                closeMessage();
    }

    getListOfMatch(player){
        let arr = [];
        for(let i =0; i< this.state.matchList.length; i++){
            if(this.state.matchList[i].match.winner === player){
                arr.push(this.state.matchList[i]);
                console.log("found");
            }
        }
        return arr;
    }



    legalMove(pre, cur){
        let _gamedata = this.getLastMove().gameData.slice();
        console.log(_gamedata);
        let temp = _gamedata[pre];
        _gamedata[cur] = temp;
         _gamedata[pre] = null;


            let newMove = {gameData:_gamedata, p1IsNext: !this.getLastMove().p1IsNext}

            let _matchList = this.state.matchList.slice();
            _matchList[_matchList.length -1].match.movesList.push(newMove);
            _matchList[_matchList.length - 1].match.finishTime = new Date();


        this.setState({
          
           matchList: _matchList,
        }); 
        
         setTimeout(() => {
                this.winner();
        },500);
        
    }
    validatingMove(pre, cur){
        let x = pre%3 ;
        let y =  parseInt( pre / 3);    
        
        let max_x = x+1 > 2 ? x: x+1;
        let max_y = y+1 > 2 ? y : y+1;

        let min_x = x-1 < 0 ? x : x-1;
        let min_y = y-1 < 0 ? y : y-1;

        let target_x = cur%3 ;
        let target_y =  parseInt(cur / 3);

        if(target_x<=max_x && target_y <= max_y && target_x >= min_x && target_y >= min_y){
            if(!isEven(pre) &&  !isEven(cur)){
                return false;
            }
            return true;
        }

    }

    eleID;
    targetedFrom;
    lastTouchX;
    lastTouchY;

    ondragStart(ev ){
         ev.dataTransfer.setData("text", ev.target.id);
         let hid = document.getElementById(ev.target.id).parentNode.id;
         ev.dataTransfer.setData("HID", hid);
       // document.getElementById("testing").innerHTML = "drag started";
      
     
    }

     allowDrop(ev) {
         ev.preventDefault();
    }
    handleTouchStart(e) {
         this.eleID = e.target.id;
         this.targetedFrom = document.getElementById(e.target.id).parentNode.id;

        
    }

     handleTouchMove(e) {
        var touchLocation = e.targetTouches[0];
        this.lastTouchX = touchLocation.pageX ;
        this.lastTouchY = touchLocation.pageY ;
    }

    handleTouchEnd(ev){
         ev.preventDefault();
        let _holes = document.getElementsByClassName("hole");
        let targetedTo = null;
        for(let i = 0; i< _holes.length; i++){
            let _rect = _holes[i].getBoundingClientRect();
            if(this.lastTouchX >= _rect.left && this.lastTouchX <= _rect.right &&
                this.lastTouchY >= _rect.top && this.lastTouchY <= _rect.bottom){
                  targetedTo = _holes[i].getAttribute("id");
                  
                }
        }
        if(this.eleID && this.targetedFrom && targetedTo){
             let data = this.eleID
             let tergetTo = parseInt(targetedTo);
             let tergetFrom = parseInt(this.targetedFrom);
             if(data.toString().trim().length ===0){
                 return;
             }

             if(calculateWinner(this.getLastMove().gameData)){
                 return displayMessage("Match Result", calculateWinner(this.getLastMove().gameData) + " already won the Match!")
             }
             if(this.getLastMove().gameData[tergetTo] === null &&
                this.validatingMove(tergetFrom, tergetTo)){
                    
                  let turn =  this.getLastMove().p1IsNext ? "player-1" : "player-2";
                  if(this.getLastMove().gameData[tergetFrom].name === turn){
                    this.legalMove(tergetFrom, tergetTo);

                  }
                  else{
             
                        displayMessage("warning", "It is " +turn + "'s turn.");
                  }
      
                           
            }
            else
            {
                displayMessage("warning", "Wrong Move.");

            }
             
            
        }

         
    }

    drop(ev){

        ev.preventDefault();
            let data = ev.dataTransfer.getData("text");
            let tergetTo = parseInt(ev.target.id);
            let tergetFrom = parseInt(ev.dataTransfer.getData("HID"));
            if(data.toString().trim().length ===0){
                return;
            }

            if(calculateWinner(this.getLastMove().gameData)){
                return displayMessage("Match Result", calculateWinner(this.getLastMove().gameData) + " already won the Match!")
            }

            if(this.getLastMove().gameData[tergetTo] === null &&
            this.validatingMove(tergetFrom, tergetTo)){
                
                let turn =  this.getLastMove().p1IsNext ? "player-1" : "player-2";
                if(this.getLastMove().gameData[tergetFrom].name === turn){
                // ev.target.appendChild(document.getElementById(data));
                this.legalMove(tergetFrom, tergetTo);

                }
                else{
                    // alert("it is " + turn + "'s turn");
                    displayMessage("warning", "It is " +turn + "'s turn.");
                }
                        
        }
        else
        {
            displayMessage("warning", "Wrong Move.");

        }
    }













    getLastMove(){
        let currentMatch = this.state.matchList[this.state.matchList.length -1];
     
        return currentMatch.match.movesList[currentMatch.match.movesList.length -1];
    }
    setNewMove(gameData){
         let currentMatch = this.state.matchList[this.state.matchList.length -1].match.movesList.slice();
        return currentMatch.push(gameData);
    }


    winner(){
      if(calculateWinner(this.getLastMove().gameData)){
        
         displayMessage("Match Result",  calculateWinner(this.getLastMove().gameData) +" won the match");
         
        }
    }
    getMatch(ID){
        return this.state.matchList[ID-1];
    }

    previewMatch(id){
         window.localStorage.setItem("gameData", JSON.stringify(this.state.matchList));
     
            // console.log(_matchLists);

         const _selectedMatch = this.getMatch(id);
   
        this.matchPreviewing(_selectedMatch);
        let reviewMatchlist = this.state.matchList.slice(0, id);
            console.log(reviewMatchlist[reviewMatchlist.length -1].match.movesList.length);
           
      
           
             this.setState({
                matchList: reviewMatchlist,
            })

           //alert(_selectedMatch.match.movesList.length)
            for(let i =0; i< _selectedMatch.match.movesList.length; i++){
              

            setTimeout(() => {
               // alert(i);
               reviewMatchlist[reviewMatchlist.length -1].match.movesList.push(
                _selectedMatch.match.movesList[i]);

               this.setState({
                   matchList: reviewMatchlist,
               });
               console.log("reviewing");


            }, i* 2000);

            if( i === 0){
                    console.log("final stage");

                setTimeout(() => {
                    let _gamedata = JSON.parse(window.localStorage.getItem("gameData"));
                    this.setState({
                        matchList: _gamedata,
                    });
                    this. closeMatchPreviewong();
                    }, _selectedMatch.match.movesList.length * 2000);

                }
            }
        

    }

    matchPreviewing(_matchData){
      
        document.getElementsByClassName("preview-match")[0].style.display = "block";
        
        document.getElementsByClassName("player")[0].style.display = "none";
        document.getElementsByClassName("player")[1].style.display = "none";

         document.getElementsByClassName("status")[0].style.display = "none";
         document.getElementsByClassName("status")[1].style.display = "none";

        document.getElementsByClassName("data")[0].innerHTML = "Match-" + _matchData.match.matchID;
        document.getElementsByClassName("data")[1].innerHTML = _matchData.match.winner;
        document.getElementsByClassName("data")[2].innerHTML = _matchData.match.duration + " (mm:ss)";
        document.getElementsByClassName("data")[3].innerHTML = _matchData.match.movesList.length;
    }

    closeMatchPreviewong(){

        document.getElementsByClassName("preview-match")[0].style.display = "none";
        
        document.getElementsByClassName("player")[0].style.display = "flex";
        document.getElementsByClassName("player")[1].style.display = "flex";

         document.getElementsByClassName("status")[0].style.display = "block";
         document.getElementsByClassName("status")[1].style.display = "block"; 
    }



    render() { 
      
        return (
            <div className="three-breads">
              
                <div className="main-container">
                    <Player
                        key="player-1-board"    
                        playerName ={"Player-1"}
                        winningMatchList = {this.getListOfMatch("player-1")}
                        previewMatch = {(id)=>this.previewMatch(id) }
                        sliding = {()=> slidePlayerDeatails(0)}
                    ></Player>
                    <div className="game">
                       <Status
                            ongoing = {this.state.matchList[this.state.matchList.length -1].match.matchID}
                            player_1_score = {this.getListOfMatch("player-1").length}
                            player_2_score = {this.getListOfMatch("player-2").length}
                            turn= {this.getLastMove().p1IsNext}
                        ></Status>
                        <Board
                            onDragOver = {(event)=> this.allowDrop(event)}
                            onDrop = {(event)=>this.drop(event)}

                            onDragStart = {(event)=> this.ondragStart(event)}

                            touchstart = {(event) => this.handleTouchStart(event)}
                            touchMove = {(event)=> this.handleTouchMove(event)}
                            touchEnd = {(event) => this.handleTouchEnd(event)}


                            winningPlayer = {this.winner}
                            currentStep = {this.getLastMove()}
                            >
                        </Board>
                        <Status
                            ongoing = {this.state.matchList[this.state.matchList.length -1].match.matchID}
                            player_1_score = {this.getListOfMatch("player-1").length}
                            player_2_score = {this.getListOfMatch("player-2").length}
                            turn= {this.getLastMove().p1IsNext}
                        ></Status>
                    </div>
                    <Player
                        key="player-2-board"    
                        playerName = {"Player-2"}
                        winningMatchList = {this.getListOfMatch("player-2")}
                        previewMatch = {(id)=>this.previewMatch(id) }
                         sliding = {()=> slidePlayerDeatails(1)}
                    ></Player>

                
                </div>
                <div className="message">
                    <div className="message-box">
                        <div className="message-heading">
                            <div id="heading-info" className="heading-text">Warring</div>
                            <div className="close-message">
                                <i onClick={()=>closeMessage()} className="fa fa-window-close"></i>
                            </div>
                        </div>
                         <div className= "text-message"> 
                          It is player-1's turn;
                         </div>
                         <div className="message-confirmation warning-message">
                             <button onClick = {()=> closeMessage()}> OK</button>
                         </div>

                         <div className="message-confirmation wining-message">
                             <button onClick = {()=> this.resetBoard()}> OK</button> <button onClick = {()=> closeMessage()}>Cancel</button>
                         </div>
                    </div>               
                </div>
                <PreviewMatch></PreviewMatch>

            </div>
           
           

          );
    }
}
 
export default Game;