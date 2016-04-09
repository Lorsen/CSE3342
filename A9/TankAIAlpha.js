/* 
 * TankAI - replace this with YOUR code for your TankAIAlpha
 *  so that it can follow a path to a destination
 *
 */
function TankAIAlpha (team, tankid, maxspeed) {
    // each tank has unique identity 
    this.tankid = tankid;
    this.teamName = team;
    this.maxspeed = maxspeed;
    
    // destination - may be: undefined
    this.destx = undefined;
    this.desty = undefined;

    // for path to destination
    this.destStack = new Array();

    
    this.setDestination = function(x,y) {
       this.destx = x;
       this.desty = y;
    };


    this.sayHello = function() {
        return "TankAIAlpha:" + this.tankid + " sayHello(): dest=("+this.destx+
                ","+this.desty+")";
    };

    // assume incoming parm is in order of points to visit
    // store reversed list and pop.  use .length to determine if empty
    this.setPathToDestination = function (object) {
        
        this.destStack = object;
        var destination = this.destStack.pop();
        this.destx = destination[0];
        this.desty = destination[1];

    };
    
    this.receiveMsg = function (msg) {
        // e.g. t1 go 30 50, t1 stop, t1 go
        console.log("TankAIAlpha:" + this.tankid + " receiveMsg() :" + msg);
    };

    
        
    //method called by GISMO  
    this.getMove = function (tankstate) {

        var newdir;
        var newspeed;
        var distance;
        var distanceLeftToChangeCourse;

        if (this.destx === undefined) { // nowhere to go - just spin
            newdir = (tankstate.dir + 45) % 360;
            newspeed = 0; // just move slowly
        } else { // we have a destination to go to
            // use or write your own code to compute direction to destination
            newdir = Math.round(angle360(tankstate.x, tankstate.y,
                this.destx, this.desty));
            
            distance = Math.sqrt(
                ((this.destx-tankstate.x)*(this.destx-tankstate.x) + (this.desty-tankstate.y)*(this.desty-tankstate.y)) );
            
            console.log("distance: " + distance)
            
            if( distance <= 1 ){
                if(dest = this.destStack.pop()) {
                    this.destx = dest[0];
                    this.desty = dest[1];
                    return this.getMove(tankstate);}}
            else if(distance > this.maxspeed)
                newspeed = this.maxspeed;
            else
                newspeed = distance;
        }

        // setup your move for Gismo via JS object
        var moveRequest = {
            id: this.tankid,
            dir: newdir,
            speed: newspeed
        };

        // console display of your tank state and move request for debug
        console.log("TankAIAlpha: " + this.tankid +
            "@(" + Math.floor(tankstate.x) + "," + Math.floor(tankstate.y) + ')' +
            " dest=(" + this.destx + "," + this.desty + ")" +
            " getMove() =" + JSON.stringify(moveRequest));

        //  deliver request to Gismo
        return moveRequest;

    };
}