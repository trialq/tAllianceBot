(function () {
	api.Panel.message(api.Panel.parentId, 'abReceiveChatPanelID', api.Panel.pageId);
})();

handlers.abWriteMessage = function(msg_string) {
	//check message hasn't already been sent
	//if multiple players have alliance bot, we don't want duplicate posts
	var curr_time = new Date().getTime();
	for(var v=0; v<model.chatLog().length; ++v) {
		if(model.chatLog()[v].message === msg_string /*&& model.chatLog()[v].player_name === "AllianceBot"*/ && Math.abs(curr_time - model.chatLog()[v].time_stamp)<10000 ) {
			console.log("return");
			return;
		}
	}

	model.send_message("chat_message", {"message":msg_string});
};
