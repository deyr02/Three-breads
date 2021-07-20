import React, { Component } from 'react';



class Bread extends Component {
 
    state = {  }
    render() { 
        return ( 
            <div 
            id ={this.props.ID}
            className={"bread " +this.props.player}
            draggable={this.props.isdragable}
            
            onDragStart= {this.props.onDragStarts}
            onTouchStart = {this.props.touchstarts}
            onTouchMove = {this.props.touchMoves}
            onTouchEnd = {this.props.touchEnds}
            >

            </div>
         );
    }
}
 
export default Bread;