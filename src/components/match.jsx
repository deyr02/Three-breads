import React, { Component } from 'react';
class Match extends Component {
    state = {  }
    render() { 
      return (
            <tr
                key={"match-details" + this.props.matchID}
            >
                <td>{"Match-"+ this.props.matchID}</td>
                <td>{this.props.duration}</td>
                <td><button onClick={()=>this.props.preview()}>Preview</button></td>
            </tr>
        );
        
       
    }
}
 
export default Match;