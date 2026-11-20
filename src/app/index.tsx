import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function WelcomeScreen() {
  return <SafeAreaView style={s.screen}>
    <View style={s.hero}>
      <Text style={s.logoText}>용⚔️병</Text>
      <Text style={s.tagline}>갑자기 생긴 빈자리, 믿을 수 있는 용병으로</Text>
    </View>
    <View style={s.footer}>
      <Pressable style={s.button} onPress={() => router.push('/onboarding')}><Text style={s.buttonText}>시작하기</Text></Pressable>
    </View>
  </SafeAreaView>;
}

const s = StyleSheet.create({
  screen:{flex:1,width:'100%',maxWidth:430,alignSelf:'center',backgroundColor:colors.background,paddingHorizontal:24},hero:{flex:1,justifyContent:'center',alignItems:'center'},
  logoText:{color:colors.ink,fontSize:54,fontWeight:'800',letterSpacing:-1.8},tagline:{color:colors.muted,fontSize:13,lineHeight:20,textAlign:'center',marginTop:14},
  footer:{paddingBottom:16},button:{backgroundColor:colors.primary,height:58,borderRadius:18,alignItems:'center',justifyContent:'center'},buttonText:{color:'#fff',fontSize:17,fontWeight:'900'},
});
