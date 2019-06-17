let WS = {
    socket: null,
    events: {},

    connect: (hostname, port, endpoint) => {
        try{
            let url = `ws://${hostname}:${port}${endpoint.startsWith('/') ? null : '/'}${endpoint}`;
            console.log('Attempting to open WebSocket connection to ' + url);
            WS.socket = new WebSocket(url);

            WS.socket.onopen = e => {
                console.log('WebSocket connection established. ' + JSON.parse(e));
            };

            WS.socket.onclose = e => {
                console.log('WebSocket connection closed. ' + JSON.parse(e));
            };

            WS.socket.onerror = e => {
                console.error('WebSocket Server connection experienced an error: ' + JSON.stringify(e));
            };

            WS.socket.onmessage = e => {
                let received = JSON.parse(e);
                if(WS.events[received.type]) WS.events[received.type].forEach(cb => {
                    cb.call(received.data);
                });
            };
        }
        catch(err){
            console.error('Unexpected WebSocket Error occured: ' + err);
        }
    },

    on: (eventName, callback) => {
        if(!WS.events[eventName]) WS.events[eventName] = [callback];
        WS.events[eventName].push( callback );
    },

    send: (eventName, data) => {
        // WIP
    }
};