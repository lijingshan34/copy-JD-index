<?php
/**
 * Created by PhpStorm.
 * User: 27394
 * Date: 2017/4/17
 * Time: 16:48
 */
$r = file_get_contents("1.html");
//$regx = "/src=\"(.*?)\"/";
//preg_match_all($regx,$r,$r2);
//foreach($r2 as $k => $v){
//    if($k){
//        foreach($v as $k1 => $v1){
//            if($v1&& (strlen($v1)>5)){
//                $basename = basename($v1);
//                //$basename = preg_replace("/!q90(.*)/",'',$basename);
//                if(!fopen($basename,'r')){
//                    $temp = file_get_contents('http:'.$v1);
//                    file_put_contents($basename,$temp);
//                }
//
//            }
//        }
//
//    }
//}



//$r = preg_replace("/src=\"#\"/",'',$r);
////data-lazy-src=
//$r = preg_replace("/data-lazy-src=/",'src=',$r);


$regx = "#src=\"(.*)\/(.*?)\"#";
preg_match_all($regx,$r,$r2);
$r = preg_replace($regx,"src=\"static/images/keepbuy/$2\"",$r);
file_put_contents('2.html',$r);