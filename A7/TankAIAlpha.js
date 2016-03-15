/* Lorsen
 * TankAI - for Assignment 7
 *   Implement code for fn=receiveMsg and then modify fn=getMove
 *
 *   You will need to add some variables to keep track of your state until
 *    getMove is called by Gismo.
 */
function TankAIAlpha(team, tankid, maxspeed) {
    // each tank has unique identity 
    this.tankid = tankid;
    this.teamName = team;
    this.maxspeed = 10; // use this.maxspeed in getMove

    // destination - may be: undefined
    this.destx = undefined;
    this.desty = undefined;

    this.oldx = undefined;
    this.oldy = undefined;

    this.setDestination = function (x, y) {
        this.destinationX = x;
        this.destinationY = y;
    };


    // utility function to display tank destination
    this.sayHello = function () {
        return "TankAIAlpha:" + this.tankid + " sayHello(): dest=(" + this.destx + "," + this.desty + ")";
    };

    this.receiveMsg = function (msg) {
        // e.g. t1 go 30 50, t1 stop, t1 go
        console.log("TankAIAlpha:" + this.tankid + " receiveMsg() :" + msg);

        // todo: Write code so that when Gismo calls your getMove function
        //   your Tank responds with the appropriate dir and speed.

        console.log("msg: " + msg);

        // find commands in msg string
        var re = /(t[0-9]+).*(s|go)/;
        var matchlist = re.exec(msg);
        var command = matchlist[2];


        // Leave destinations undefined for stop, leaving tank to rotate
        if (command == "s") {

            this.destx = undefined;
            this.desty = undefined;
        } else { // Search for go command with 2 coordinates

            re = /(t\d+).*?(go).*?(\d+).*?(\d+)/;

            matchlist = re.exec(msg);
            
            // Set destinations to values in msg array
            if (re.test(msg)) {
                this.destx = matchlist[3];
                this.desty = matchlist[4];

                // Save values of current x any y coordinates to save in case of plain go command
                this.oldx = matchlist[3];
                this.oldy = matchlist[4]

                console.log("oldx: " + this.oldx + " old y: " + this.oldy);

            } else { // if Only go command, set coordinates to previous values

                this.destx = this.oldx;
                this.desty = this.oldy;
            }

        }
    };


    // This method called by GISMO
    //    tankstate has properties: x,y,speed,dir,health
    this.getMove = function (tankstate) {

        var newdir;
        var newspeed;

        if (this.destx === undefined) { // nowhere to go - just spin
            newdir = (tankstate.dir + 45) % 360;
            newspeed = 0; // just move slowly
        } else { // we have a destination to go to
            // use or write your own code to compute direction to destination
            newdir = Math.round(angle360(tankstate.x, tankstate.y,
                this.destx, this.desty));
            newspeed = 10;
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
