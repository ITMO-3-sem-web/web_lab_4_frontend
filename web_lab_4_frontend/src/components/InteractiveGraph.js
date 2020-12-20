import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    setFormData,
    sendFormData,
    showAlert
} from '../redux/actions'

import isNumeric from '../util/isNumeric'

import {
    rayLength,
    canvasWidth,
    canvasHeight,
    centerX,
    centerY,
    maxXCoord,
    stepX,
    maxYCoord,
    stepY,
    pixelStep
} from './InteractiveGraph__Config'

import Alert from "./Alert";


class InteractiveGraph extends Component {

    x
    y
    r
    points
    canvas
    ctx // context of Canvas
    xViewElem
    yViewElem


    componentDidMount() {

        this.x = this.props.formData.x
        this.y = this.props.formData.y
        this.r = this.props.formData.r

        this.points = this.props.points

        // setFormDataGlobal = this.props.setFormData
        // sendFormDataGlobal = this.props.sendFormData
        window.props = this.props; // todo Delete before prod

        console.log('--- props: ', this.props)

        this.initCanvas()

        console.log('--- props: ', this.props)

    }

    render() {
        console.log('--- x = ', this.x)
        console.log('--- y = ', this.y)
        console.log('--- r = ', this.r)

        return (
            <div>
                <h1>I am an interactive graph</h1>
                {  this.props.alert &&  <Alert alertText={this.props.alert}/>}
                <canvas
                    id='canvas'
                    ref={ (canvasDOM) => {this.canvas = canvasDOM}}
                >
                    <h1>Your browser doesn't support canvas. Can't draw interactive graph.</h1>
                </canvas>

                <div className="coordinates-view">
                    <p>
                        X : &nbsp;<span className="x" ref={ (xViewDOM) => {this.xViewElem = xViewDOM} }>?</span> {/* x берется из store */}
                        <br />
                        Y : &nbsp;<span className="y" ref={ (yViewDOM) => {this.yViewElem = yViewDOM} }>?</span> {/* y берется из store */}
                    </p>
                </div>
            </div>
        )
    }



    initCanvas() {

        let xCoord;
        let yCoord;
        let cRect;
        let canvasX;
        let canvasY;

        if (this.canvas && this.canvas.getContext) {

            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;

            this.ctx = this.canvas.getContext('2d');
            this.ctx.translate(centerX, centerY);
            this.ctx.save();

            this.drawAll(0); // todo set r = 0

            // Draws a point under the cursor on the canvas.
            this.canvas.addEventListener("mousemove", (e) => {
                cRect = this.canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
                canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas
                canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make
                xCoord = (canvasX - centerX) / pixelStep;
                yCoord = (centerY - canvasY) / pixelStep;

                xCoord = this.findClosestX(xCoord);
                yCoord = this.findClosestY(yCoord);

                this.setCoordinatesView(xCoord, Math.round( yCoord * 1000 ) / 1000 );

            });


            this.canvas.addEventListener('click', () => {
                console.log('--- click on Canvas >- sendFormData( formData )')

                if ( ! this.isValidR( this.r ) ) {
                    this.props.showAlert( "Выберете радиус `r`");
                    console.log('--- invalid r')

                } else {

                    this.props.sendFormData({ // mb sendFormDataGlobal ?
                        x: xCoord,
                        y: yCoord,
                        r: this.r
                    })
                }

            });

            // Useless method pr_obably
            // this.canvas.addEventListener('mouseout', () => {
            //     console.log('--- mouse leaves Canvas -> setFormData( formData )')
            //     setFormData({ // mb setFormDataGlobal ?
            //         x: xCoord,
            //         y: yCoord,
            //         r: this.r
            //     })
            // })

        } else {
            alert('Проблемы c канвасом')
        }
    }

     isValidX( x ) {
        return (
            isNumeric( x ) && ( x >= -5 ) && ( x <= 5)
        )
    }

     isValidY( y ) {
        return (
            isNumeric( y ) && ( y >= -5 ) && ( y <= 5)
        )
    }

     isValidR( r ) {
        return (
            isNumeric( r ) && ( r >= -5 ) && ( r <= 5)
        )
    }

     isValidFormData( x, y, r ) {
        return (
            this.isValidX( x ) && this.isValidY( y ) && this.isValidR( r )
        )
    }

    // Draws a point on thw canvas.
     drawPoint(x, y, strokeColor= "gray", fillColor = "gray", fill= false) {

         this.ctx.fillStyle = fillColor;
         this.ctx.strokeStyle = strokeColor;
         this.ctx.beginPath();
         this.ctx.arc(x * pixelStep,- y * pixelStep, 4, 0, 2 * Math.PI);
        if (fill) {
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }

         this.ctx.beginPath(); // Used to finish the path drawing

    }


    // Returns the closest valid "X" value for the specified one.
     findClosestX( x ) {

        let closestX = x;

        if (x > 2) {
            closestX = 2
        } else if (x < -2) {
            closestX = -2;
        } else {
            closestX = Math.round(x * 2) / 2;
        }

        return closestX;

    }


    // Returns the closest valid "Y" value for the specified one.
     findClosestY(y) {

        let closestY = y;

        if (y >= 3) {
            closestY = 2.999999999999;
        } else if (y <= -3) {
            closestY = -2.999999999999;
        }

        return closestY;

    }


    // Draw the area consisting of a square, triangle and semicircle on the canvas.
     drawArea( r ) {

        if (! r ) {
            return ;
        }

         this.ctx.fillStyle = "rgba(95, 158, 160, 0.5)";

        //квадрат
         this.ctx.rotate(-Math.PI/2);
         this.ctx.fillRect(0, 0, r * pixelStep, r * pixelStep);

        //треугольник
         this.ctx.beginPath();
         this.ctx.moveTo(0, 0);
         this.ctx.lineTo(- (r * pixelStep), 0);
         this.ctx.lineTo(0, r * pixelStep);
         this.ctx.fill();


        //полукруг
         this.ctx.beginPath();
         this.ctx.rotate(Math.PI/2);
         this.ctx.moveTo(0, 0);
         this.ctx.arc(0, 0, (r * pixelStep)/2, Math.PI, Math.PI/2, true);
         this.ctx.lineTo(0, 0);
         this.ctx.fill();

        // Убираем прошлые Path, чтобы они не возникли на холсте потом
         this.ctx.beginPath();

    }


    // Clears the canvas and draws coordinateSystem, area and tablePoints on it in a proper way.
     drawAll(r) {

        this.clearCanvas();
        this.drawArea(r);
        this.drawCoordinateSystem();
        this.drawTablePoints();

    }


    // Clears the canvas (removes all the graphics).
     clearCanvas() {

         this.ctx.clearRect(-canvasWidth/2, -canvasHeight/2, this.canvas.width, this.canvas.height);

    }


    // Draws the coordinate system on the canvas.
     drawCoordinateSystem() {

         this.ctx.strokeStyle = "rgba(0,0,0,1)";
         this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
         this.ctx.lineWidth = 2;

        // Ray X
         this.ctx.moveTo(-rayLength,0);
         this.ctx.lineTo(rayLength,0);
        // Arrow end
         this.ctx.lineTo(rayLength-rayLength/15, rayLength/15);
         this.ctx.moveTo(rayLength,0);
         this.ctx.lineTo(rayLength-rayLength/15, -rayLength/15);


        // Ray Y
         this.ctx.moveTo(0, rayLength);
         this.ctx.lineTo(0, -rayLength);
        // Arrow end
         this.ctx.lineTo(rayLength/15, -rayLength+rayLength/15);
         this.ctx.moveTo(0, -rayLength);
         this.ctx.lineTo(-rayLength/15, -rayLength+rayLength/15);


        let pixelXCoord = -maxXCoord * pixelStep - 4;
        for(let j=-maxXCoord; j<=maxXCoord; j += stepX) {

            if (j % 1 === 0) {
                this.ctx.fillText(j,  pixelXCoord, -4);
            } else {
                this.ctx.fillText(j,  pixelXCoord, 10);
            }
            pixelXCoord += pixelStep * stepX;

        }


        let pixelYCoord = maxYCoord * pixelStep + 4;
        for(let j=-maxYCoord; j <= maxYCoord; j += stepY) {

            if ( j !== 0 ) {
                if (j % 1 === 0) {
                    this.ctx.fillText(j,  4, pixelYCoord);
                } else {
                    this.ctx.fillText(j,  -10, pixelYCoord);
                }
            }


            pixelYCoord -= pixelStep * stepY;
        }


         this.ctx.stroke();

    }


    // Add points from tablePoints array to the canvas.
     drawTablePoints() {

         this.points.forEach( (point) => {
            if ( point.ans === 'yes' ) {
                this.drawPoint(point.x, point.y, 'green')
            } else if ( point.ans === 'no' ) {
                this.drawPoint(point.x, point.y, 'red')
            } else {
                alert('Непонятная точка в методе "drawTablePoints" : ' + point.json())
            }
        })
        console.log('--- Drawing tablePoints')
    }

     // Sets the specified coordinates to "X : " and "Y : " fields nearby canvas.
     setCoordinatesView(x, y) {
         this.xViewElem.innerHTML = x
         this.yViewElem.innerHTML = y
    }

}

function mapStateToProps( state ) {
    console.log('---', ' state = ', state)
    return {
        formData: state.mainPage.formData,
        points: state.mainPage.points,
        alert: state.app.alert
    }
}

// В этом не особо много смысла,
function mapDispatchToProps( dispatch ) {
    return {
        setFormData: ( formData ) => {
            dispatch(setFormData(formData))
        },
        sendFormData: ( formData ) => {
            dispatch(sendFormData(formData))
        },
        showAlert: ( alertText, timeLimitMS ) => {
            dispatch(showAlert( alertText, timeLimitMS ))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (InteractiveGraph)