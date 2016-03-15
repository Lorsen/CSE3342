
/* 
 * TankAI Bravo - stop the alpha
 */
function TankAIBravo (team, tankid,x,y,health,destx,desty) {
    // each tank has unique identity 

    this.tankid = tankid;
    
    // properties
    this.teamName = team;
    this.x      = x;
    this.y      = y;
    this.dir    = 0;
    this.health = health;
    // destination - may be: undefined
    this.destx = destx;
    this.desty = desty;

    // special properties for squad leader to track tank state
    this.holdAtDestination = false;
    
    this.setDestination = function(x,y) {
       this.destx = x;
       this.desty = y;
    };
    
    this.sayHello = function() {
        return "TankAI:" + this.tankid + " sayHello(): dest=("+this.destx+
                ","+this.desty+")";
    };
    
    this.receiveMsg = function (msg) {
       //console.log("TankAI:"+this.tankid + " receiveMsg() :" + msg); 
    };

    this.hasDestination = function () {
        return !(this.destx === undefined);
    };
    
        
    //method called by Squad
    this.getMove = function(tankstate) {
       this.x           = tankstate.x;
       this.y           = tankstate.y;
       this.dir         = tankstate.dir;
       this.speed       = tankstate.speed; 
       this.health      = tankstate.health;
       this.minDistToGoal = 10;  // to account for overshooting destination
       
       var newdir;
       var newspeed;
       
       if (this.hasDestination() === false ) {  // nowhere to go
            newdir = this.dir;
            newspeed = 0;   // hold position
       }
       else {  // we have a destination

           // check if we have arrived at destination
           var distToGoal = distance(this.x, this.y, this.destx, this.desty);

           if (distToGoal < this.minDistToGoal) { // we have arrived
               newdir = this.dir;
               newspeed = 0;
               this.destx = undefined;
               this.desty = undefined;
           }
           else { // keep going toward dest
             newdir = Math.round(angle360(this.x, this.y, this.destx, this.desty));
             newspeed = 10;
           }
       }
           
        var moveRequest = {id:this.tankid, dir:newdir, speed:newspeed};
        // console display for debug
        /**
        console.log("TankAIBravo: "+this.tankid+ "@("+Math.floor(this.x)+","+Math.floor(this.y)+')'+
                   " dest=("+this.destx+","+this.desty+")" +
                   " getMove() =" + JSON.stringify(moveRequest));
        //
         */
        return  moveRequest; 
 
    };
    

}

