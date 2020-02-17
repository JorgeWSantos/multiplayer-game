export default function createPointPanel() {

    function setup(state, myPlayerId){

        var ul = document.getElementById("dynamic-list");
        for (const playerId in state.players) {

            const player = state.players[playerId]
            var li = document.createElement("li");
            li.setAttribute('id',player.playerId);
            if (myPlayerId == player.playerId) {
                li.style.color = "red"
            }
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

    function resetPoints(state){

        for (const playerId in state.players) {
            const player = state.players[playerId]
            var item = document.getElementById(playerId);
            item.innerHTML = `${player.playerId} : ${player.points}`;
        }
    }

    function removePlayer(player){
        var ul = document.getElementById("dynamic-list");
        var item = document.getElementById(player.playerId);
        ul.removeChild(item);
    }
    
    return{
        setup,
        addPlayer,
        updatePlayer,
        removePlayer,
        resetPoints
    }
}

