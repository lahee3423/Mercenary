import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function WelcomeScreen() {
  return <SafeAreaView style={s.screen}>
    <View style={s.hero}>
      <View style={s.logo}><Text style={s.logoText}>용⚔️병</Text></View>
      <Text style={s.eyebrow}>프랜차이즈 카페 긴급 인력 매칭</Text>
      <Text style={s.title}>갑자기 생긴 빈자리,{`\n`}경력 있는 용병으로.</Text>
      <Text style={s.description}>일해본 커피 브랜드의 근로자와 지금 필요한 카페 매장을 빠르고 믿을 수 있게 연결해요.</Text>
      <View style={s.preview}>
        <View style={s.previewTop}><Text style={s.previewLabel}>오늘의 긴급 공고</Text><Text style={s.live}>● LIVE</Text></View>
        <Text style={s.store}>메가MGC커피 강남역점</Text>
        <Text style={s.shift}>오늘 18:00–22:00 · 시급 15,000원</Text>
        <View style={s.chip}><Text style={s.chipText}>경력 인증자 우선 매칭</Text></View>
      </View>
    </View>
    <View style={s.footer}>
      <Pressable style={s.button} onPress={() => router.push('/onboarding')}><Text style={s.buttonText}>시작하기</Text></Pressable>
      <Text style={s.caption}>계속하면 이용약관 및 개인정보처리방침에 동의하게 됩니다.</Text>
    </View>
  </SafeAreaView>;
}

const s = StyleSheet.create({
  screen:{flex:1,width:'100%',maxWidth:430,alignSelf:'center',backgroundColor:colors.background,paddingHorizontal:24},hero:{flex:1,justifyContent:'center'},
  logo:{alignSelf:'flex-start',height:44,justifyContent:'center',marginBottom:28},logoText:{color:colors.ink,fontSize:27,fontWeight:'800',letterSpacing:-.8},
  eyebrow:{color:colors.primary,fontSize:14,fontWeight:'800',marginBottom:12},title:{color:colors.ink,fontSize:34,lineHeight:44,fontWeight:'800',letterSpacing:-1},description:{color:colors.muted,fontSize:16,lineHeight:25,marginTop:18,maxWidth:330},
  preview:{backgroundColor:colors.surface,borderRadius:24,marginTop:36,padding:22,shadowColor:colors.ink,shadowOpacity:.08,shadowRadius:20,shadowOffset:{width:0,height:8},elevation:3},previewTop:{flexDirection:'row',justifyContent:'space-between',marginBottom:20},previewLabel:{color:colors.muted,fontWeight:'700'},live:{color:colors.primary,fontSize:12,fontWeight:'700'},store:{color:colors.ink,fontSize:20,fontWeight:'700'},shift:{color:colors.muted,fontSize:14,marginTop:8},chip:{alignSelf:'flex-start',backgroundColor:colors.greenSoft,borderRadius:10,paddingHorizontal:10,paddingVertical:7,marginTop:18},chipText:{color:colors.green,fontSize:12,fontWeight:'800'},
  footer:{paddingBottom:16},button:{backgroundColor:colors.primary,height:58,borderRadius:18,alignItems:'center',justifyContent:'center'},buttonText:{color:'#fff',fontSize:17,fontWeight:'900'},caption:{color:'#929994',fontSize:11,lineHeight:17,textAlign:'center',marginTop:12},
});
