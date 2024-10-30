$(function(){
	_.modal = {
		local : {
			types : {
				error : {
					mainType : "medium"
				},
				branch : {
					mainType : "medium"
				},
				lyric : {
					mainType : "large"
				}
			},
			open : (typeName) => {
				console.log(_.modal.local.types[typeName].mainType);
				$("modal").attr("active", "");
				$("modal-main").removeAttr("active");
				$(`modal-main[type="${_.modal.local.types[typeName].mainType}"]`).attr("active", "");
				$("modal-body").removeAttr("active");
				$(`modal-body[type="${typeName}"]`).attr("active", "");
			},
			close : () => {
				$("modal").removeAttr("active");
			},
			btnHandler : () => {
				return new Promise((resolve) => {
					$("button.modal-btn").on("click", function(){
						resolve($(this).attr("type"));
					});
				});
			},
			writeMessage : (index, message) => {
				message = message.replace(/\n/g, "<br />");
				switch(index){
					case 0:
						$("div.modal-header").find("div").html(message);
						break;
					case 1:
						$("div.modal-message").find("div").html(message);
						break;
					case 2:
						$("button.modal-btn.cancel").find("div").html(message);
						break;
					case 3:
						$("button.modal-btn.submit").find("div").html(message);
						break;
					default:
						break;
				}
			}
		},
		error : (messageObject, option = false) => {
			return new Promise(async (resolve) => {
				_.modal.local.open("error");
				for(let i=0; i<messageObject.length; i++){
					_.modal.local.writeMessage(i, messageObject[i]);
				}
				let r = await _.modal.local.btnHandler() == "submit" ? true : false;
				_.modal.local.close();
				resolve(r);
			});
		},
		branch : (messageObject, option = false) => {
			return new Promise(async (resolve) => {
				await _.sleep(150);
				_.modal.local.open("branch");
				for(let i=0; i<messageObject.length; i++){
					_.modal.local.writeMessage(i, messageObject[i]);
				}
				let r = await _.modal.local.btnHandler() == "submit" ? true : false;
				await _.sleep(100);
				_.modal.local.close();
				resolve(r);
			});
		}
	};
});