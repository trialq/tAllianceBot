var abPlayers = (function () {
	var abPlayer = {};

	api.Panel.message(api.Panel.parentId, 'abReceivePlayersPanelID', api.Panel.pageId);

	var chat_id=-1;
	var currentAlliances = "";
	var spectator=true;

	//return current state of alliances as a string
	abPlayer.get_alliances = function() {

		var output;
		var tmp = [];
		var tmp2 = [];

		//create alliance pairings
		if(model.players() !== undefined) {
			for(var v = 0; v<model.players().length; ++v) {
				if(model.players()[v].allies !== undefined) {//presence indicates 
					for(var q = 0;q < model.players()[v].allies.length; ++q) {
						tmp[tmp.length] = (model.players()[v].allies[q].name<model.players()[v].name?"["+model.players()[v].allies[q].name+", "+model.players()[v].name+"]":"["+model.players()[v].name+", "+model.players()[v].allies[q].name+"]");
					}
				} else {
					return "";
				}
			}
		}
		
		tmp.sort();

		//remove duplicates (there should be two of every pairing, a->b and b<-a)
		if(tmp.length>0) {
			tmp2[0] = tmp[0];
			for(var q=1; q<tmp.length; ++q) {
				if(tmp[q]!==tmp[q-1]) {
					tmp2[tmp2.length] = tmp[q];
				}
			}
		}

		output="";
		if(tmp2.length>0) {
			output="Alliances: "+tmp2[0];
			for(var k=1; k<tmp2.length; ++k) {
				output = output+", "+tmp2[k];
			}
			return output;
		} else {
			return "Alliances: None";
		}
		
	};

	function check_alliances() {
		//spectator escape
		if(!spectator) {
			var newAlliances = abPlayer.get_alliances();
			//if different
			if(currentAlliances!=newAlliances && chat_id!=-1) {
				currentAlliances=newAlliances;
				//split by newline and send to chat panel
				var split_str = currentAlliances.split("\n");
				for(var w=0; w<split_str.length; ++w) {
					api.Panel.message(chat_id, 'abWriteMessage', split_str[w]);
				}
			}
		}
	}

	handlers.abReceiveChatPanelID = function(payload) {
        chat_id = payload;
    };
    handlers.abReceiveSpectatorUpdate = function(payload) {
        spectator = payload;
    };

    //check for alliance updates periodically
    setInterval(check_alliances, 8000);

    return abPlayer;

})();


