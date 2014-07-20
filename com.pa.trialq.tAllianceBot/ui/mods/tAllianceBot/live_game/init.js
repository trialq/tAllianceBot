
//allow communication between players panel and chat panel
var abLive = (function () {
    var abLive = {};

    abLive.chat_id = -1;
    abLive.players_id = -1;
    var prev_spec = true;

    function spectator_check() {
        if(model.isSpectator()!=prev_spec && abLive.players_id!=-1) {
            prev_spec = model.isSpectator();
            api.Panel.message(abLive.players_id, 'abReceiveSpectatorUpdate', model.isSpectator());
        }
    }

    //check for spectator updates periodically
    setInterval(spectator_check, 8000);

    return abLive;
})();

handlers.abReceiveChatPanelID = function(payload) {
    abLive.chat_id = payload;
    if(abLive.players_id!=-1) {
        api.Panel.message(abLive.players_id, 'abReceiveChatPanelID', abLive.chat_id);
    }
};

handlers.abReceivePlayersPanelID = function(payload) {
    abLive.players_id = payload;
    if(abLive.chat_id!=-1) {
        api.Panel.message(abLive.players_id, 'abReceiveChatPanelID', abLive.chat_id);
    }
};
