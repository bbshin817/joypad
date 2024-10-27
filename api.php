<?php

class joypad {
	protected $g;

	public function __construct() {
		$this->g = [
			"uuid" => uniqid()
		];
	}
	public function fetch(
		$body,
		$url = "https://stable.baat.hac.srv.phonex.co.jp/stable/Navi/RequestCommand"
	)
	{
		$headers = [
			"Content-Type: application/x-www-form-urlencoded",
			"User-Agent: kyokunavi/5.0.4.1 CFNetwork/1568.100.1.2.1 Darwin/24.0.0",
			"Accept-Language: ja"
		];
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($body));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$result = curl_exec($ch);
		curl_close($ch);
		$result = mb_convert_encoding($result, "UTF8", "ASCII, JIS, UTF-8, EUC-JP, SJIS-WIN");
		return json_decode($result, true);
	}

	public function getRoomId($oneTimePass)
	{
		return $this->fetch([
			"api_ver" => "1",
			"onetime_pass" => $oneTimePass,
			"uuid" => $this->g["uuid"]
		], "https://stable.baat.hac.srv.phonex.co.jp/stable/Navi/Pairing");
	}

	public function getUserList($roomId)
	{
		return $this->fetch([
			"api_ver" => "1",
			"cmd" => "GetUserList",
			"room_id" => $roomId,
			"uuid" => $this->g["uuid"]
		]);
	}

	public function getValidPackList($roomId)
	{
		return $this->fetch([
			"api_ver" => "1",
			"cmd" => "ValidPackList",
			"room_id" => $roomId,
			"uuid" => $this->g["uuid"]
		]);
	}

	public function requestKey($roomId)
	{
		return $this->fetch([
			"api_ver" => "1",
			"code" => "",
			"cmd" => "requestKey",
			"room_id" => $roomId,
			"uuid" => $this->g["uuid"]
		]);
	}

	/*
	$data = [
		"slc" => int[6]
	];
	*/
	public function orderSong($slc, $bgv, $score, $piano_roll, $key)
	{

	}
}

$API = new joypad();

echo var_dump($API->getUserList("17290912988564b1046ac-bc7d-4bac-8aff-28a3f774cdc2"));

?>