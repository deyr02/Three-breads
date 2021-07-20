import React, { Component } from 'react';
class PreviewMatch extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="preview-match">
                <div className = "match-info-box">
                    <header>Match Highlight </header>
                    <div className = "row">
                        <div className = "level">Match :</div>
                        <div className = "data"></div>
                    </div>
                    <div className = "row">
                        <div className = "level">Winner :</div>
                        <div className = "data"></div>
                    </div>
                    <div className = "row">
                        <div className = "level">Duration:</div>
                        <div className = "data"></div>
                    </div>
                    <div className = "row">
                        <div className = "level">Total Moves:</div>
                        <div className = "data"></div>
                    </div>


                </div>

            </div>
         );
    }
}
 
export default PreviewMatch;