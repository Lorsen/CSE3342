/* 
 * TankAI - knows where to go
 */
function TankAI (tankid,x,y,health,destx,desty) {
    // each tank has unique identity 
    this.tankid = tankid;
    
    // properties 
    this.x      = x;
    this.y      = y;
    this.dir    = 0;
    this.health = health;
    // destination - may be: undefined
    this.destx = destx;
    this.desty = desty;
    
    this.setDestination = function(x,y) {
       this.destinationX = x;
       this.destinationY = y;
    };
    
    this.sayHello = function() {
        return "TankAI:" + this.tankid + " sayHello(): dest=("+this.destx+
                ","+this.desty+")";
    };
    
    this.receiveMsg = function (msg) {
       console.log("TankAI:"+this.tankid + " receiveMsg() :" + msg); 
    };
    
        
    //methods  gamestate={ 'tankstate'={x,y,s,d,h}, visible=[ {tank,x,y} ..]
    this.getMove = function(tankstate) {
        this.x           = tankstate.x;
        this.y           = tankstate.y;
        this.dir         = tankstate.dir;
        this.speed       = tankstate.speed;
        this.health      = tankstate.health;
 
        var newdir;
        var newspeed;
        console.log(JSON.stringify(tankstate));
 
        if (this.destx === undefined) {  // nowhere to go
            newdir = this.dir;
            newspeed = 2;   // just move slowly  
        }
        else{  // we have a destination
            var newdirCalculation = Math.atan2(this.desty - this.x,
                                       this.destx - this.y);
            var newdir = newdirCalculation * 180 / Math.PI;
            if(newdir < 0){             
                newdir += 90;
            }
            if(newdir > 0){
                newdir -= 30;
            }
            console.log(newdir);

            var newspeed = 10;
        }
 
        var moveRequest = {id:this.tankid, dir:newdir, speed:newspeed};
       
        console.log("TankAI: "+this.tankid+
                    " getMove() =" + JSON.stringify(moveRequest));
    
        return  moveRequest;
 
    };
    

};