import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

type MapMarker={id:string;latitude:number;longitude:number;label:string};
type Props={markers:MapMarker[];onSelect:(id:string)=>void};

export default function NaverMap({markers,onSelect}:Props){
  const clientId=process.env.EXPO_PUBLIC_NAVER_MAP_CLIENT_ID??'';
  const html=useMemo(()=>{
    const center=markers[0]??{latitude:37.5012,longitude:127.0255};
    const data=JSON.stringify(markers).replace(/</g,'\\u003c');
    return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><style>html,body,#map{width:100%;height:100%;margin:0;overflow:hidden}#empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#EAF1FF;font-family:system-ui;color:#0D0F14}#empty small{color:#858B97;margin-top:7px}</style></head><body>${clientId?'<div id="map"></div>':'<div id="empty"><b>네이버 지도 연결 대기 중</b><small>지도 Client ID를 설정하면 실제 지도가 표시돼요.</small></div>'}${clientId?`<script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(clientId)}"></script><script>var map=new naver.maps.Map('map',{center:new naver.maps.LatLng(${center.latitude},${center.longitude}),zoom:14,zoomControl:false,mapDataControl:false,scaleControl:false});${data}.forEach(function(m,i){var marker=new naver.maps.Marker({map:map,position:new naver.maps.LatLng(m.latitude,m.longitude),title:m.label,icon:{content:'<div style="width:34px;height:34px;border-radius:12px;background:#165DFF;color:#fff;display:flex;align-items:center;justify-content:center;font:800 12px system-ui;box-shadow:0 5px 14px rgba(22,93,255,.28);border:2px solid #fff">'+(i+1)+'</div>',anchor:new naver.maps.Point(17,17)}});naver.maps.Event.addListener(marker,'click',function(){window.ReactNativeWebView.postMessage(m.id)})});</script>`:''}</body></html>`;
  },[clientId,markers]);
  return <WebView source={{html,baseUrl:'https://localhost'}} originWhitelist={['*']} javaScriptEnabled scrollEnabled={false} style={s.map} onMessage={event=>onSelect(event.nativeEvent.data)}/>;
}

const s=StyleSheet.create({map:{height:350,width:'100%',backgroundColor:'#EAF1FF'}});
