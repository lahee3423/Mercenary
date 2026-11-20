import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

const KNIGHTS_PER_ROW=5;

function KnightRow({direction}:{direction:'top'|'bottom'}) {
  const [reveals]=useState(()=>Array.from({length:KNIGHTS_PER_ROW},()=>new Animated.Value(0)));

  useEffect(()=>{
    const sequence=Animated.stagger(90,reveals.map(value=>Animated.spring(value,{toValue:1,damping:13,stiffness:150,mass:.7,useNativeDriver:true})));
    sequence.start();
    return ()=>sequence.stop();
  },[reveals]);

  return <View style={s.knightRow}>{reveals.map((value,index)=><Animated.View key={`${direction}-${index}`} style={[s.knightIconWrap,{opacity:value,transform:[{translateY:value.interpolate({inputRange:[0,1],outputRange:[direction==='top'?18:-18,0]})},{scale:value.interpolate({inputRange:[0,1],outputRange:[.72,1]})}]}]}><Image source={require('../../assets/knight-coffee.webp')} style={s.knightIcon} resizeMode="contain"/></Animated.View>)}</View>;
}

export default function WelcomeScreen() {
  return <SafeAreaView style={s.screen}>
    <View style={s.hero}>
      <KnightRow direction="top"/>
      <Text style={s.logoText}>용⚔️병</Text>
      <Text style={s.tagline}>갑자기 생긴 빈자리, 믿을 수 있는 용병으로</Text>
      <KnightRow direction="bottom"/>
    </View>
    <View style={s.footer}>
      <Pressable style={s.button} onPress={() => router.push('/onboarding')}><Text style={s.buttonText}>시작하기</Text></Pressable>
    </View>
  </SafeAreaView>;
}

const s = StyleSheet.create({
  screen:{flex:1,width:'100%',maxWidth:430,alignSelf:'center',backgroundColor:colors.background,paddingHorizontal:24},hero:{flex:1,justifyContent:'center',alignItems:'center'},
  knightRow:{width:'100%',flexDirection:'row',justifyContent:'center',gap:10,marginVertical:26},knightIconWrap:{width:44,height:60},knightIcon:{width:'100%',height:'100%'},
  logoText:{color:colors.ink,fontSize:54,fontWeight:'800',letterSpacing:-1.8},tagline:{color:colors.muted,fontSize:13,lineHeight:20,textAlign:'center',marginTop:14},
  footer:{paddingBottom:16},button:{backgroundColor:colors.primary,height:58,borderRadius:18,alignItems:'center',justifyContent:'center'},buttonText:{color:'#fff',fontSize:17,fontWeight:'900'},
});
