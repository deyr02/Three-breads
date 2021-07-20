import React, { Component } from 'react';
import './styleSheet.css';
class Hole extends Component {
    state = {  }
    render() { 
        return ( 
            <div 
                id={this.props.ID}
                className = "hole"
                onDrop={this.props.onDrop}
                onDragOver ={this.props.onDragOver}
               
            >
                {this.props.children}
            </div>
         );
    }
}
 
export default Hole;