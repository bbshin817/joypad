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

	$("button.home-header-tab-btn").on("click", function(){
		$("button.home-header-tab-btn").removeAttr("active");
		$(this).attr("active", "");
	});

	$("button.home-footer-toggle-btn").on("click", function(){
		if($("parts.home-footer").attr("active") != undefined){
			local.remote.close();
		}else{
			local.remote.open();
		}
	});

	let s = (s) => {
		return new Promise(async (resolve) => {
			setTimeout(resolve, s);
		});
	};
	let f = (level) => {
		d = (l) => {
			$("signal").attr("level", l);
		};
		return new Promise(async (resolve) => {
			let nl = Number($("signal").attr("level"));
			if (nl < level){
				for(let i=nl+1; i<level; i++){
					d(i);
					await s(Math.random() * 5000 + 50);
				}
			} else if (nl > level) {
				for(let i=nl; level<=i; i--){
					d(i);
					await s(Math.random() * 500 + 50);
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
			await s(Math.random() * 10000 + 50);
		}
	})();

	setInterval(() => {
	}, 1000);
});