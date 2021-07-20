import React, { Component } from 'react';
class Status extends Component {
    state = {  }
    render() { 
        let _turn;
        if(this.props.turn){
            _turn = <div className = "player-name p1">Player-1</div>
        }
        else{
             _turn = <div className = "player-name p2">Player-2</div>
        }

        return (
            <div className="status">
                <div className ="info">
                    <div className = "info-type">
                        Score:
                    </div>
                    <div className = "scoreboard">
                        <div className="player-name p1"> Player-1</div>
                        <div className="score">{this.props.player_1_score +" / " + this.props.player_2_score}</div>
                        <div className="player-name p2">Player-2</div>
                    </div>


                </div>

                <div className = "info">
                    <div className = "info-type">Ongoing: </div>
                    <div className = "scoreboard">
                        <div className = "matchNumber">{"match-"+ this.props.ongoing}</div>
                    </div>
                    <div className = "info-type">Turn:</div>
                    <div className = "scoreboard">
                        {_turn}
            
                    </div>
                </div>

            </div>
          );
    }
}
 
export default Status;