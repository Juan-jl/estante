var bridge = new WebOSServiceBridge();

bridge.onservicecallback = function(msg) {
    var message = JSON.parse(msg);
    if (message.state === "Active") {
        bridge.call(
            "luna://com.webos.service.tvpower/power/responseScreenSaverRequest",
            JSON.stringify({
                "clientName": "myWebApp",
                "ack": false,
                "timestamp": message.timestamp
            })
        );
    }
};

bridge.call(
    "luna://com.webos.service.tvpower/power/registerScreenSaverRequest",
    JSON.stringify({
        "subscribe": true,
        "clientName": "myWebApp"
    })
);