import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

type Role = 'worker' | 'owner';
const roles = [
  {id:'worker' as const,icon:'⚡',title:'근로자로 일할래요',copy:'경력 있는 커피 브랜드의 긴급 근무를 찾아요'},
  {id:'owner' as const,icon:'☕',title:'점주로 구인할래요',copy:'우리 카페에 바로 투입할 경력자를 찾아요'},
];

export default function OnboardingScreen(){
  const [role,setRole]=useState<Role>('worker'); const [brands,setBrands]=useState(['메가MGC커피']);
  const selectBrand=(brand:string)=>setBrands(current=>role==='owner'?[brand]:current.includes(brand)?(current.length===1?current:current.filter(item=>item!==brand)):[...current,brand]);
  return <SafeAreaView style={s.screen} edges={['top','bottom']}>
    <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <View style={s.progress}><View style={s.progressFill}/></View><Text style={s.step}>1 / 2</Text>
      <Text style={s.title}>어떤 용병 서비스를{`\n`}이용하시나요?</Text><Text style={s.description}>역할에 맞춰 필요한 화면과 알림을 준비할게요.</Text>
      <View style={s.roleList}>{roles.map(item=>{const selected=role===item.id;return <Pressable key={item.id} onPress={()=>setRole(item.id)} style={[s.roleCard,selected&&s.roleSelected]}>
        <Text style={s.roleIcon}>{item.icon}</Text><View style={s.roleCopy}><Text style={s.roleTitle}>{item.title}</Text><Text style={s.roleDescription}>{item.copy}</Text></View><View style={[s.radio,selected&&s.radioSelected]}>{selected&&<View style={s.radioDot}/>}</View>
      </Pressable>})}</View>
      <Text style={s.sectionTitle}>{role==='worker'?'일해본 커피 브랜드':'운영 중인 커피 브랜드'}</Text><Text style={s.helper}>{role==='worker'?'1개 이상 선택 · 복수 선택 가능':'카페 매장 등록은 다음 단계에서 진행해요.'}</Text>
      <View style={s.brandGrid}>{['메가MGC커피','컴포즈커피','빽다방','이디야커피','투썸플레이스','더벤티'].map(item=>{const selected=brands.includes(item);return <Pressable key={item} onPress={()=>selectBrand(item)} style={[s.brand,selected&&s.brandSelected]}><Text style={s.brandMark}>{item[0]}</Text><Text style={[s.brandText,selected&&s.brandTextSelected]} numberOfLines={1}>{item}</Text></Pressable>})}</View>
    </ScrollView>
    <View style={s.footer}><Pressable style={s.button} onPress={()=>router.replace({pathname:'/dashboard/[role]',params:{role}})}><Text style={s.buttonText}>다음</Text></Pressable></View>
  </SafeAreaView>;
}

const s=StyleSheet.create({
  screen:{flex:1,width:'100%',maxWidth:430,alignSelf:'center',backgroundColor:colors.background},content:{padding:24,paddingBottom:130},progress:{height:5,backgroundColor:colors.line,borderRadius:9},progressFill:{width:'50%',height:5,backgroundColor:colors.primary,borderRadius:9},step:{color:colors.primary,fontWeight:'900',marginTop:26},title:{color:colors.ink,fontSize:30,lineHeight:39,fontWeight:'900',marginTop:10,letterSpacing:-.8},description:{color:colors.muted,fontSize:15,marginTop:10},roleList:{gap:12,marginTop:30},
  roleCard:{minHeight:96,padding:18,flexDirection:'row',alignItems:'center',borderWidth:1.5,borderColor:colors.line,borderRadius:20,backgroundColor:colors.surface},roleSelected:{borderColor:colors.primary,backgroundColor:colors.primarySoft},roleIcon:{fontSize:24,width:42},roleCopy:{flex:1},roleTitle:{color:colors.ink,fontSize:17,fontWeight:'900'},roleDescription:{color:colors.muted,fontSize:12,lineHeight:18,marginTop:5},radio:{width:22,height:22,borderRadius:11,borderWidth:2,borderColor:'#C8CCC9',alignItems:'center',justifyContent:'center'},radioSelected:{borderColor:colors.primary},radioDot:{width:10,height:10,borderRadius:5,backgroundColor:colors.primary},
  sectionTitle:{color:colors.ink,fontSize:18,fontWeight:'900',marginTop:34},helper:{color:colors.muted,fontSize:13,marginTop:7},brandGrid:{flexDirection:'row',flexWrap:'wrap',gap:10,marginTop:18},brand:{width:'48%',minHeight:58,flexDirection:'row',alignItems:'center',padding:12,borderRadius:15,borderWidth:1,borderColor:colors.line,backgroundColor:colors.surface},brandSelected:{borderColor:colors.ink},brandMark:{width:32,height:32,borderRadius:10,textAlign:'center',textAlignVertical:'center',backgroundColor:colors.warning,color:colors.ink,fontWeight:'900',marginRight:9},brandText:{color:colors.muted,fontSize:13,fontWeight:'700'},brandTextSelected:{color:colors.ink},
  footer:{position:'absolute',left:0,right:0,bottom:0,paddingHorizontal:24,paddingTop:14,paddingBottom:16,backgroundColor:colors.background},button:{height:58,backgroundColor:colors.primary,borderRadius:18,alignItems:'center',justifyContent:'center'},buttonText:{color:'#fff',fontSize:17,fontWeight:'900'},
});
