import React, { Component } from 'react';
import Bread from './bread';
import Hole from './hole'
import "./styleSheet.css";


window.addEventListener("load", (event) =>{
   console.log(document.getElementsByClassName("hole")[4].offsetLeft);
   boardBarAngleSetup();
});



window.addEventListener("resize", (event) =>{
   console.log(document.getElementsByClassName("hole")[4].offsetLeft);
   boardBarAngleSetup();
});


function boardBarAngleSetup(){
    let _svgBox = document.getElementById("svgBox");
    let _svgboxWidth = _svgBox.clientWidth;
    let _svgBoxHeight = _svgBox.clientHeight;
    let _line_1 = document.getElementById("line-1");
    let _line_2 = document.getElementById("line-2");


    _line_1.setAttribute("x1", 0);
    _line_1.setAttribute("y1",  _svgBoxHeight);
    _line_1.setAttribute("x2",  _svgboxWidth);
    _line_1.setAttribute("y2", 0);
    
    _line_2.setAttribute("x1", 0);
    _line_2.setAttribute("y1", 0);
    _line_2.setAttribute("x2",  _svgboxWidth);
    _line_2.setAttribute("y2", _svgBoxHeight);

}

class Board extends Component {


    state = {  }

    renderBread(bread){
        if(bread){
             return(
                <Bread 
                ID={bread.id}
                isdragable = {bread.isdragable}
                player = {bread.name}
               winningPlayer = {this.props.winningPlayer}
                onDragStarts = {this.props.onDragStart }
                touchstarts = {this.props.touchstart}
                touchMoves = { this.props.touchMove}
                 touchEnds = {this.props.touchEnd}
                ></Bread>
            );
        }
       
    }

    renderHole(ID){
        return(
            <Hole
                ID = {ID}
                onDragOver = {this.props.onDragOver}
                onDrop = {this.props.onDrop}
                  
            >
                {this.renderBread(this.props.currentStep.gameData[ID])}
            </Hole>
        );
    }

    render() { 

         const linestyle={
             stroke:'rgb(255,0,0)',
            strokeWidth: "4vw"    
            }
  
        return ( 
            <div className="board">
                <div className="board-inner">
                    <div className="bar bar-1"></div>
                    <div className="bar bar-2"></div>
                    <svg id="svgBox" className={"svgStyle"}>
                        <line id="line-1" x1={"0"} y1={"0"} x2={"0"} y2={"0"} className = {"bar-3"}  />
                        <line id="line-2" x1={"0"} y1={"0"} x2={"0"} y2={"0"} className = {"bar-3"}  />  
                    </svg>
        
                </div>
                 <div className="bread-holes">
                  
                    {this.renderHole(0)}
                    {this.renderHole(1)}
                    {this.renderHole(2)}
                    {this.renderHole(3)}
                    {this.renderHole(4)}
                    {this.renderHole(5)}
                    {this.renderHole(6)}
                    {this.renderHole(7)}
                    {this.renderHole(8)} 
                 </div>
                


            </div>
         );
    }
}
 
export default Board;