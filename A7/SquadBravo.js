/**
 * Created by frank on 2/13/2016.
 */

var SquadBravo = function(squadName, tankList, homeHq, enemyHq) {

    this.squadName = squadName;
    this.tankList  = tankList; // actual tank objects
    this.homeHq    = homeHq;
    this.enemyHq   = enemyHq;
    this.minDistToGoal = 10;


    this.patrolList = [ [280,80, 320,110],
        [200,120, 250,132],
                        [100,40,190,90]

                         ] ;

    this.tankPatrolAssignment = {};

    for (var idx in tankList) {
        var tid = tankList[idx].tankid;
        var searchArea = this.patrolList.pop();
        this.tankPatrolAssignment[tid] = searchArea;
    }

    // SQUAD is responsible for setting destinations and asks each tank for its move

    this.getMoves = function() {
        var tankRequestList = [];

        for (var idx in tankList) {
            var squadTank = tankList[idx];


        if (!squadTank.hasDestination() && !squadTank.holdAtDestination){
            var searchArea = this.tankPatrolAssignment[squadTank.tankid];
            squadTank.destx = randomIntFromInterval(searchArea[0], searchArea[2]);
            squadTank.desty = randomIntFromInterval(searchArea[1], searchArea[3]);
        }

        // ask tank for its move and add to request list
        var tankmove = squadTank.getMove( gGameStateDict[squadTank.tankid].getStateForAI() );
        tankRequestList.push(tankmove);

    }

    // returns a list of all squadron tank requests to be concat with game update list
    return tankRequestList;
    };

    this.receiveMsg = function(msg) {
        console.log("Squad " + this.squadName + " msg received:" + msg);
        // todo distribute to tanks
        // check if msg contains ints
        var regex = /.*?(t\d+).*?/;
        var matchList = msg.match(regex);
        if (matchList != null && matchList.length == 2) {
            for (var idx in tankList) {
                if (tankList[idx].tankid === matchList[1]) {
                    tankList[idx].receiveMsg(msg);
                }
            }
        }

    };
    
    // aux functions
    function randomIntFromInterval(min,max){
       return Math.floor(Math.random()*(max-min+1)+min);
    }

};
