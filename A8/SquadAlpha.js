/**
 *
 * Alpha Squad holds a reference to all its Tanks in:  this.tankList.
 * It's Responsibility is to:
 *      a) pass the state of each Tank to each tank calling the Tank's getMove function
 *      b) collect all the Squad's moves and returning all moves as tankRequestList
 *   ( Note: for this assignment, your Squad only manages ONE tank: t1 )
 *   Prior to calling each Tank's getMove function, the Squad gets the current state of a tank via:
 *
 *    var currentTankState = gGameStateDict[squadTank.tankid].getStateForAI();
 *
 *    the fields passed to the tank in an object are:
 *                       x,y,speed,dir,health
 *
 *    When a command is entered in the browser command entry field,
 *     the command is delivered to ALL squads who examine the tank id and if
 *     it's one the Squad's tanks, pass the command to the TankAIAlpha.
 *
 *    This is a problem when the enemy Squad sees the command and sends one of its Tanks
 *     to collide with your tank. Your task is to counteract the enemy strategy by:
 *      a. coming up with an encoded message,
 *      b. send the msg to a server program to decode, and
 *      c. get the real command back and pass it on to your Tank
 *
 */

var SquadAlpha = function(squadName, tankList, homeHq, enemyHq) {

    this.squadName = squadName;
    this.tankList  = tankList; // actual tank objects

    // for future use...
    this.homeHq    = homeHq;
    this.enemyHq   = enemyHq;



    // METHOD: getMoves ---------------------------------------------------------------
    // SQUAD is responsible for setting destinations and obtaining move from each tank
    // RETURNs : A List of move objects, one per tank in squad
    this.getMoves = function() {
        var tankRequestList = [];

        for (var idx in tankList) {
            var squadTank = tankList[idx];  // one of the squads tank objects

            // ask the game for the current state of this tank
            var currentTankState = gGameStateDict[squadTank.tankid].getStateForAI();

           // ask tank for its move - passing in its current state (x,y,dir,speed, hea;th)
            var tankmove = squadTank.getMove( currentTankState );

            // add move to squad moveList
            tankRequestList.push(tankmove);
    }

    return tankRequestList; // return list to Gismo - all squadron tank requests
    };

    // END  getMoves ---------

    // METHOD: receiveMsg ----------------------------------------------------------------
    // note: content of command data entry delivered to all Squads
    this.receiveMsg = function(msg){
        console.log("Squad " + this.squadName + " msg received:" + msg);

        // Use regex to determine if there is a tank command -
        // .. look for t1, t2, t3, etc.
        var regex = /.*?(t\d+).*?/;
        var matchList = msg.match(regex);

        if (matchList != null && matchList.length == 2) {
            // search for a matching tankid in the Squad's tankList
            //  .. in this version there is only one tankid = t1
            for (var idx in tankList) {
                if (tankList[idx].tankid === matchList[1]) {
                    // found that the command is to our tank
                    // todo: send command to your server and get the msg
                    
                     var data = $.ajax({
                        type: "GET",
                        url: 'http://lyle.smu.edu/~oroa/cse3342/A8/A8serverdecode.py',
                        dataType:'json',
                        data:{cmd:msg},
                        async: false,
                        success: function(data) {
                            command = data["command"];
                        }
                    });


                    //   then deliver actual msg to your tank

                    console.log("JQuery returns this JSON object:" + JSON.stringify(data));
                    console.log(data.responseText);
                    var cmd = JSON.parse(data.responseText);
                    console.log(cmd.command);
                    tankList[idx].receiveMsg(cmd.command);
                }
            }
        }

    };
    // END receiveMsg ------------
    


};
