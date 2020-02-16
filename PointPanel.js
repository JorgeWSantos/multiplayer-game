export default function createPointPanel() {

    function setup(state){

        var ul = document.getElementById("dynamic-list");
        console.log("pointpanel")
        for (const playerId in state.players) {

            const player = state.players[playerId]
            console.log(player)
            var li = document.createElement("li");
            li.setAttribute('id',player.playerId);
            li.appendChild(document.createTextNode(`${player.playerId} : ${player.points}`));
            ul.appendChild(li);
        }
    }

    function addPlayer(command){

        var ul = document.getElementById("dynamic-list");
        var li = document.createElement("li");
        li.setAttribute('id',command.playerId);
        li.appendChild(document.createTextNode(`${command.playerId} : ${command.points}`));
        ul.appendChild(li);
    }

    function updatePlayer(player){
        console.log("update")
        console.log(player)
        var item = document.getElementById(player.playerId);
        item.innerHTML = `${player.playerId} : ${player.points}`;
    }

    function removePlayer(player){
        console.log("remove")
        var ul = document.getElementById("dynamic-list");
        var item = document.getElementById(player.playerId);
        ul.removeChild(item);
    }
    
    return{
        setup,
        addPlayer,
        updatePlayer,
        removePlayer
    }
}

