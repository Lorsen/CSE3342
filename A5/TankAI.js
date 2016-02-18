// Lorsen

function TankAI(tankid) {

    this.tankID = tankid;   
    this.destinationX = undefined;
    this.destinationY = undefined;
    this.speed = 0;
    this.direction = 90;

    this.setDestination = function(x, y) {        
        this.destinationX = x;
        this.destinationY = y;
    }

    this.getMove = function(stateObject) {
        
        var newX = stateObject.x;
        var newY = stateObject.y;
        //var newDir = stateObject.dir;
        //var newSpeed = stateObject.speed;
        
        if(this.destinationX != undefined && this.destinationY != undefined){

            this.speed = 10;
            this.direction = this.calcDegrees(this.destinationX, this.destinationY, newX, newY)
        }
                
        updatedState = {id:this.tankID, dir:this.direction, speed:this.speed};
        
        return updatedState;
    }
    
    this.calcDegrees = function(x1, y1, x2, y2){
        
        var angleDegrees = Math.atan2(y2-y1, x2-x2) * 180 / Math.PI;
        
        //To keep within 360 degree range
        if(angleDegrees < 0){
            angleDegrees += 360;
        }
        
        return angleDegrees;
    }

}
