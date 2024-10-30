$(function(){
	_.btn = {
		playerStop : async () => {
			if (await _.modal.branch([
				"演奏停止",
				"演奏を停止します。\nよろしいですか？",
				"閉じる",
				"演奏停止"
			]))
				// 演奏停止時の処理
				console.log("stop");
		}
	};
});