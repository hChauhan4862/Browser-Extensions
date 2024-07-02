(function() {
    const originalWebSocket = window.WebSocket;
    window.WebSocket = function(url, protocols) {
        let ws;
        if (protocols) {
            ws = new originalWebSocket(url, protocols);
        } else {
            ws = new originalWebSocket(url);
        }
        console.log("URL::"+ url)

        if (url === "wss://app.bombay.live/socket/api/v1/live") {
            console.log("Intercepting WebSocket to:", url);

            const originalAddEventListener = ws.addEventListener;
            ws.addEventListener = function(type, listener, ...options) {
                if (type === "message") {
                    const modifiedListener = function(event) {
                        try {
                            let data = JSON.parse(event.data);
                            // Example: Modify the data if it matches a certain structure
                            if (data.type === "BALANCE" && data.message && data.message.type === "WALLET") {
                                console.log("Original message:", event.data);

                                // Modify the amount
                                data.message.amount = 500;

                                // Replace the event data
                                event = new MessageEvent("message", { data: JSON.stringify(data) });
                                console.log("Modified message:", event.data);
                            }
                        } catch (e) {
                            console.error("Error parsing WebSocket message:", e);
                        }

                        listener.call(this, event);
                    };
                    return originalAddEventListener.call(this, type, modifiedListener, ...options);
                } else {
                    return originalAddEventListener.call(this, type, listener, ...options);
                }
            };

            Object.defineProperty(ws, "onmessage", {
                set: function(func) {
                    this.addEventListener("message", func);
                }
            });
        }

        return ws;
    };
})();
