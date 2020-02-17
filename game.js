function createGame() {
    
    const state = { 

        players: {},
        fruits: {},
        screen: {
            width: 30,
            height: 30
        }
    }

    const observers = [];
    var interval = null;

    function setState(newState) {
        Object.assign(state, newState)
    }

    function startAddFruit(frequency) {

        interval = setInterval(addFruit, frequency);
    }

    function stopAddFruit() {
        clearInterval(interval)
    }

    function resetPoints() {

        for (const playerId in state.players) {
            const player = state.players[playerId]
            player.points = 0
        }

        notifyAll({
            type: 'resetPoints',
        })
    }

    function subscribe(observerFunction) {
        
        observers.push(observerFunction);
    };

    function notifyAll(command) {
        console.log(`game - notifying ${observers.length} observers`);

        for (const observerFunction of observers) {
            observerFunction(command)
        };
    };

    function addPlayer(command) {

        const playerId = command.playerId;
        const playerX = "playerX" in command ? command.playerX : Math.floor(Math.random() * 30);
        const playerY = "playerY" in command ? command.playerY : Math.floor(Math.random() * 30);
        
        state.players[playerId] = {
            playerId: playerId,
            x: playerX,
            y: playerY,
            points: 0
        };

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
            points: 0
        })
    }

    function removePlayer(command) {

        const playerId = command.playerId;

        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId: playerId,
        })
    }

    function addFruit(command) {
        
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 1000);
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * 30);
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * 30);
        
        
        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        };

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY,
        })
    }

    function removeFruit(command) {

        const fruitId = command.fruitId;

        delete state.fruits[fruitId];

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
            playerId: command.playerId,
        })
    }

    function removeAllFruits(command) {
        console.log("remove all")
        state.fruits = command.fruits;

        notifyAll({
            type: 'removeAllFruits',
            fruits: state.fruits,
        })
    }

    function playerAddPoint(command){
        const player = state.players[command.playerId]
        player.points += 1;
        console.log(player)
    }

    function checkForFruitCollision(player){

        for (const fruitId in state.fruits){

            const fruit = state.fruits[fruitId]

            if (fruit.x == player.x && fruit.y == player.y) {
                console.log("colision")
                removeFruit({fruitId, playerId:player.playerId})
                playerAddPoint(player)
            }
        }
    }

    function movePlayer(command){

        notifyAll(command)

        const acceptedMoves = {

            ArrowDown(player){

                if (player.y + 1 < state.screen.height) {
                    
                    player.y = player.y + 1
                }
                else{
                    player.y = 0
                }
            },
    
            ArrowUp(player){

                if (player.y > 0) {
                    player.y = player.y - 1
                }
                else{
                    player.y = state.screen.height -1
                }
            },
    
            ArrowRight(player){

                if (player.x + 1 < state.screen.width) {
                    
                    player.x = player.x + 1
                }else{
                    player.x = 0
                }
            },
    
            ArrowLeft(player){

                if (player.x > 0) {
                    
                    player.x = player.x - 1
                }
                else{
                    
                    player.x = state.screen.width - 1
                }
            }
        }

        var move = acceptedMoves[command.keyPressed];
        var player = state.players[command.playerId];
        if(player && move){
            move(player);
            checkForFruitCollision(player);
        }
    }
    
    return { 
        movePlayer, 
        state,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        setState,
        subscribe,
        startAddFruit,
        stopAddFruit,
        playerAddPoint,
        resetPoints,
        removeAllFruits
    }
}

export {createGame};