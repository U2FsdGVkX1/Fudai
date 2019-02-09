<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TiebaController extends Controller
{
    public static function fetch ($url, $postdata = NULL, $cookie = NULL, $header = array (), $returnHeader = false)
	{
		$ch = curl_init ();
		curl_setopt ($ch, CURLOPT_URL, $url);
		if (!is_null ($postdata)) {
			curl_setopt ($ch, CURLOPT_POSTFIELDS, $postdata);
		}
		if (!is_null ($cookie)) {
			curl_setopt ($ch, CURLOPT_COOKIE, $cookie);
		}
		if (!empty ($header)) {
			curl_setopt ($ch, CURLOPT_HTTPHEADER, $header);
		}
		curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt ($ch, CURLOPT_HEADER, $returnHeader);
		curl_setopt ($ch, CURLOPT_TIMEOUT, 20);
		$re = curl_exec ($ch);
		curl_close ($ch);
		return $re;
	}
	
    public static function bdusslogin ($v, &$userinfo)
	{
	    $url = 'https://passport.baidu.com/v2/api/bdusslogin?bduss=' . $v . '&u=https%3A%2F%2Fpassport.baidu.com%2F&qrcode=1&tpl=pp&apiver=v3&tt=' . time() . '0000&callback=callback';
	    $data = self::fetch($url, NULL, NULL, [], true);
	    
	    preg_match ('/BDUSS=(.+?);/', $data, $bduss);
	    preg_match ('/callback\((.*?)\)/', $data, $userinfo);
	    $userinfo = json_decode ($userinfo[1], true);
	    if (isset ($bduss[1]))
	        return $bduss[1];
	    else
	        return '';
	}
	
	public static function getyinhua ($bduss)
	{
	    $url = 'https://tieba.baidu.com/mo/q/fudaiindex?fid=1528084';
	    $cookie = 'BDUSS=' . $bduss;
	    $data = self::fetch($url, NULL, $cookie);
	    
	    preg_match ('/currentPoint: (\d+)/', $data, $yinhua);
	    if (isset ($yinhua[1]))
	        return $yinhua[1];
	    else
	        return 0;
	}
}
