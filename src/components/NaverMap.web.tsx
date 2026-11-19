import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type MapMarker={id:string;latitude:number;longitude:number;label:string};
type Props={markers:MapMarker[];onSelect:(id:string)=>void};

declare global {
  interface Window {
    naver?:any;
    navermap_authFailure?:()=>void;
    __naverMapsPromise?:Promise<void>;
  }
}

const MAP_ID='naver-job-map';

function loadNaverMaps(clientId:string){
  if(window.naver?.maps)return Promise.resolve();
  if(window.__naverMapsPromise)return window.__naverMapsPromise;
  window.__naverMapsPromise=new Promise<void>((resolve,reject)=>{
    const callback=`__naverMapReady_${Date.now()}`;
    (window as any)[callback]=()=>{delete (window as any)[callback];resolve()};
    window.navermap_authFailure=()=>reject(new Error('NAVER_MAP_AUTH_FAILED'));
    const script=document.createElement('script');
    script.src=`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(clientId)}&callback=${callback}`;
    script.async=true;
    script.onerror=()=>reject(new Error('NAVER_MAP_LOAD_FAILED'));
    document.head.appendChild(script);
  });
  return window.__naverMapsPromise;
}

export default function NaverMap({markers,onSelect}:Props){
  const clientId=process.env.EXPO_PUBLIC_NAVER_MAP_CLIENT_ID;
  const [error,setError]=useState(!clientId);
  useEffect(()=>{
    if(!clientId)return;
    let disposed=false;
    loadNaverMaps(clientId).then(()=>{
      if(disposed||!window.naver?.maps)return;
      const naver=window.naver;
      const center=markers[0]??{latitude:37.5012,longitude:127.0255};
      const map=new naver.maps.Map(MAP_ID,{center:new naver.maps.LatLng(center.latitude,center.longitude),zoom:14,zoomControl:false,mapDataControl:false,scaleControl:false});
      markers.forEach((marker,index)=>{
        const pin=new naver.maps.Marker({map,position:new naver.maps.LatLng(marker.latitude,marker.longitude),title:marker.label,icon:{content:`<div style="width:34px;height:34px;border-radius:12px;background:#165DFF;color:#fff;display:flex;align-items:center;justify-content:center;font:800 12px system-ui;box-shadow:0 5px 14px rgba(22,93,255,.28);border:2px solid #fff">${index+1}</div>`,anchor:new naver.maps.Point(17,17)}});
        naver.maps.Event.addListener(pin,'click',()=>onSelect(marker.id));
      });
      setError(false);
    }).catch(()=>setError(true));
    return()=>{disposed=true};
  },[clientId,markers,onSelect]);
  if(error)return <View style={s.fallback}><Text style={s.title}>네이버 지도 연결 대기 중</Text><Text style={s.copy}>지도 Client ID를 설정하면 실제 지도가 표시돼요.</Text></View>;
  return <View nativeID={MAP_ID} style={s.map}/>;
}

const s=StyleSheet.create({map:{height:350,width:'100%'},fallback:{height:350,alignItems:'center',justifyContent:'center',backgroundColor:colors.primarySoft,padding:24},title:{fontSize:14,color:colors.ink,fontWeight:'900'},copy:{fontSize:11,color:colors.muted,marginTop:7,textAlign:'center'}});
