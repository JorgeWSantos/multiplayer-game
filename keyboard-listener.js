export default function createKeybordListener(){
            
    const state = {
        observers: [],
        playerId: null
    };

    function registerPlayerId(playerId) {
        state.playerId =  playerId;
    }
    
    function unsubscribe() {
        state.observers = [];
    }

    function subscribe(observerFunction) {
        
        state.observers.push(observerFunction);
    };

    function notifyAll(command) {
        console.log(`keyboard - notifying ${state.observers.length} observers`);

        for (const observerFunction of state.observers) {
            observerFunction(command)
        };
    };

    document.addEventListener("keydown", handleKeydown);

    function handleKeydown(event) {

        const command = {
            type: 'move-player',
            playerId : state.playerId,
            keyPressed : event.key
        };

        notifyAll(command)
    };

    return { subscribe, registerPlayerId, unsubscribe };
}
