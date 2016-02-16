function localDecode(){

    var encodedCommand = document.getElementById("encodedCommand").value;
    var re = /(t[0-9]+).*(s|go)/;
    var matchlist = re.exec(encodedCommand);
    var output;
    var tank = matchlist[1];
    var command = matchlist[2];

    //matching go command
    if (command == "s") {

        out = tank + " " + command;

    } else {

        re = /(t\d+).*?(go).*?(\d+).*?(\d+)/;

        matchlist = re.exec(encodedCommand);
        var c1 = matchlist[3];
        var c2 = matchlist[4];
        out = tank + " " + command + " " + c1 + " " + c2;
    }

    document.getElementById("decodedCode").innerHTML = out;
};

function serverDecode() {
    var encodedCommand = document.getElementById("encodedCommand").value;
 var data = $.getJSON(
        "A2server.py", {
            msg : encodedCommand
        },
        function (data) {            
            command = data["command"];
            document.getElementById("decodedCode").innerHTML = command;
        }
        )};
