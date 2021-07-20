import React, { Component } from 'react';
import Match from "./match";




class Player extends Component {
    state = {  }
    render() { 
        const _winningMatchList = this.props.winningMatchList;
        let _winningMatches;
        if(_winningMatchList.length > 0){
        _winningMatches =  _winningMatchList.map((step, match)=>{
            return(
                <Match 
                    key={"match-" + _winningMatchList[match].match.matchID}
                    matchID ={_winningMatchList[match].match.matchID}
                    duration = {_winningMatchList[match].match.duration}
                    preview = {()=>this.props.previewMatch(_winningMatchList[match].match.matchID)}
                ></Match>
            );
        });

        }
        else{

         _winningMatches = 
            <tr>
                <td className="match-row-warning" colSpan={3}>{"Not win yet."}</td>
            </tr>;

        }

        
          


        return (
            <div className="player">
                <div className="player-details">
                    <div className="player-info">
                        <div className="player-name">{this.props.playerName}</div>
                        <div className= "player-color"></div>
                    </div>
                    <div className="match-details">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={3} >Winning Matches</th>
                                </tr> 
                                 <tr>
                                    <td>Match ID</td>
                                    <td>Duration</td>
                                    <td></td>
                                </tr>

                            </thead>
                            <tbody>
                                
                                {_winningMatches}

                            </tbody>
                         
                          
                       

                       








                        </table>
                        
                    </div>
                </div>
                <div className ="sliding"
                    onClick={this.props.sliding}
                >
                    <div className ="sliding-button"> <i className="fa fa-angle-double-right"></i> </div>
                </div>
            </div>
            
         );
    }
}
 
export default Player;