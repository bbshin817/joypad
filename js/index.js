$(function(){
	let local = {
		remote : {
			open : () => {
				$("parts.home-footer").attr("active", "");
			},
			close : () => {
				$("parts.home-footer").removeAttr("active");
			}
		}
	};

	$("button").on("click", function(){
		let d = $(this);
		d.addClass("hover");
		setTimeout(() => {
			d.removeClass("hover");
		}, 75);
	});

	$("button.home-header-tab-btn").on("click", async function(){
		$("button.home-header-tab-btn").removeAttr("active");
		$(this).attr("active", "");
		switch($(this).attr("tabName")){
			case "top":
				$("main-frame").removeAttr("active");
				$("main-frame[name=\"top\"]").attr("active", "");
				break;
			default:
				await _.sleep(200);
				$("main-frame").removeAttr("active");
				$("main-frame[name=\"empty\"]").attr("active", "");
				await _.sleep(50);
				await _.modal.error([
					"エラー",
					"この機能はSwitchモードでは\nご利用いただけません。",
					"閉じる"
				]);
				await _.sleep(10);
				$("button.home-header-tab-btn").removeAttr("active");
				$("button.home-header-tab-btn[tabName=\"top\"]").attr("active", "");
				$("main-frame").removeAttr("active");
				$("main-frame[name=\"top\"]").attr("active", "");
				break;
		}
	});

	$("button.home-footer-toggle-btn").on("click", function(){
		if($("parts.home-footer").attr("active") != undefined){
			local.remote.close();
		}else{
			local.remote.open();
		}
	});

	let f = (level) => {
		d = (l) => {
			$("signal").attr("level", l);
		};
		return new Promise(async (resolve) => {
			let nl = Number($("signal").attr("level"));
			if (nl < level){
				for(let i=nl+1; i<level; i++){
					d(i);
					await _.sleep(Math.random() * 5000 + 1000);
				}
			} else if (nl > level) {
				for(let i=nl; level<=i; i--){
					d(i);
					await _.sleep(Math.random() * 5000 + 1000);
				}
			} else {
				d(level);
			}
			resolve();
		});
	};

	(async() => {
		while (true){
			await f(Math.floor(Math.random() * 6 + 0));
			await _.sleep(Math.random() * 10000 + 1000);
		}
	})();
});