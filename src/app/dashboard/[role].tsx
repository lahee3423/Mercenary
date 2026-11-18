import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';

type TabKey='home'|'jobs'|'work'|'chat'|'my';
const tabs:{key:TabKey;icon:string;label:string}[]=[
  {key:'home',icon:'⌂',label:'홈'},{key:'jobs',icon:'⌕',label:'공고'},{key:'work',icon:'▣',label:'근무'},{key:'chat',icon:'◌',label:'채팅'},{key:'my',icon:'○',label:'마이'},
];

export default function DashboardScreen(){
  const {role}=useLocalSearchParams<{role:string}>(); const owner=role==='owner'; const [tab,setTab]=useState<TabKey>('home');
  return <SafeAreaView style={s.screen} edges={['top','bottom']}>
    <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <View style={s.header}><View><Text style={s.hello}>{owner?'강남역점 점주님':'김용병님'}, 안녕하세요</Text><Text style={s.heading}>{owner?'오늘 매장 운영은 괜찮나요?':'오늘 가능한 근무를 찾았어요'}</Text></View><View style={s.bell}><Text>♢</Text></View></View>
      <View style={s.statusCard}><View><Text style={s.statusEyebrow}>{owner?'등록 중인 긴급 공고':'다음 확정 근무'}</Text><Text style={s.statusTitle}>{owner?'오늘 저녁 마감 · 1명':'스타카페 강남역점'}</Text><Text style={s.statusMeta}>{owner?'18:00–22:00 · 지원자 3명':'오늘 18:00–22:00 · 4시간'}</Text></View><Pressable style={s.statusButton}><Text style={s.statusButtonText}>{owner?'지원자 보기':'출근 준비'}</Text></Pressable></View>
      <View style={s.sectionHeader}><Text style={s.sectionTitle}>{owner?'빠른 구인':'추천 긴급 공고'}</Text><Text style={s.more}>전체보기</Text></View>
      {owner?<OwnerQuick/>:<WorkerJobs/>}
      <Text style={[s.sectionTitle,{marginTop:30}]}>{owner?'최근 매칭 현황':'내 경력 현황'}</Text>
      <View style={s.insightCard}><View style={s.insightIcon}><Text style={s.insightIconText}>{owner?'3':'12'}</Text></View><View style={{flex:1}}><Text style={s.insightTitle}>{owner?'이번 달 매칭 3건':'인증 근무 12회'}</Text><Text style={s.insightCopy}>{owner?'평균 8분 안에 근로자를 찾았어요':'평점 4.9 · 노쇼 없이 성실하게 근무했어요'}</Text></View></View>
    </ScrollView>
    <View style={s.tabBar}>{tabs.map(item=><Pressable key={item.key} onPress={()=>setTab(item.key)} style={s.tab}><Text style={[s.tabIcon,tab===item.key&&s.tabActive]}>{item.icon}</Text><Text style={[s.tabLabel,tab===item.key&&s.tabActive]}>{item.label}</Text></Pressable>)}</View>
    {owner&&<Pressable style={s.fab}><Text style={s.fabText}>＋ 긴급 구인</Text></Pressable>}
  </SafeAreaView>;
}

function WorkerJobs(){return <View style={s.cards}>{[
  ['버거하우스 신논현점','오늘 19:00–23:00','시급 16,000원','도보 12분'],['스타카페 역삼점','내일 07:00–11:00','시급 15,000원','경력 일치'],
].map((job,i)=><View style={s.jobCard} key={job[0]}><View style={s.brandLogo}><Text style={s.brandLogoText}>{job[0][0]}</Text></View><View style={{flex:1}}><Text style={s.jobTitle}>{job[0]}</Text><Text style={s.jobTime}>{job[1]}</Text><View style={s.jobBottom}><Text style={s.pay}>{job[2]}</Text><Text style={[s.badge,i===1&&s.matchBadge]}>{job[3]}</Text></View></View></View>)}</View>}
function OwnerQuick(){return <View style={s.quickRow}>{[['☕','오픈'],['🍔','피크타임'],['🌙','마감']].map(item=><Pressable key={item[1]} style={s.quick}><Text style={s.quickIcon}>{item[0]}</Text><Text style={s.quickText}>{item[1]}</Text><Text style={s.quickMeta}>템플릿</Text></Pressable>)}</View>}

const s=StyleSheet.create({
  screen:{flex:1,backgroundColor:colors.background},content:{padding:24,paddingBottom:120},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8},hello:{color:colors.muted,fontSize:13,fontWeight:'700'},heading:{color:colors.ink,fontSize:24,fontWeight:'900',marginTop:6,letterSpacing:-.5},bell:{width:42,height:42,borderRadius:15,backgroundColor:colors.surface,alignItems:'center',justifyContent:'center'},
  statusCard:{backgroundColor:colors.ink,borderRadius:24,padding:22,marginTop:28},statusEyebrow:{color:'#AAB6B1',fontSize:12,fontWeight:'800'},statusTitle:{color:'#fff',fontSize:19,fontWeight:'900',marginTop:9},statusMeta:{color:'#C7CFCC',fontSize:13,marginTop:6},statusButton:{backgroundColor:colors.primary,borderRadius:13,paddingVertical:12,alignItems:'center',marginTop:20},statusButtonText:{color:'#fff',fontWeight:'900'},
  sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:30,marginBottom:14},sectionTitle:{color:colors.ink,fontSize:18,fontWeight:'900'},more:{color:colors.muted,fontSize:12,fontWeight:'700'},cards:{gap:12},jobCard:{flexDirection:'row',padding:17,backgroundColor:colors.surface,borderRadius:20,gap:14},brandLogo:{width:48,height:48,borderRadius:15,backgroundColor:colors.warning,alignItems:'center',justifyContent:'center'},brandLogoText:{fontSize:17,fontWeight:'900',color:colors.ink},jobTitle:{color:colors.ink,fontSize:15,fontWeight:'900'},jobTime:{color:colors.muted,fontSize:12,marginTop:5},jobBottom:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:13},pay:{color:colors.primary,fontSize:13,fontWeight:'900'},badge:{color:colors.muted,fontSize:10,backgroundColor:colors.background,paddingHorizontal:8,paddingVertical:5,borderRadius:8},matchBadge:{color:colors.green,backgroundColor:colors.greenSoft},
  quickRow:{flexDirection:'row',gap:10},quick:{flex:1,paddingVertical:17,alignItems:'center',backgroundColor:colors.surface,borderRadius:18},quickIcon:{fontSize:24},quickText:{color:colors.ink,fontSize:13,fontWeight:'900',marginTop:9},quickMeta:{color:colors.muted,fontSize:10,marginTop:3},insightCard:{backgroundColor:colors.surface,borderRadius:20,padding:18,marginTop:14,flexDirection:'row',alignItems:'center',gap:14},insightIcon:{width:48,height:48,borderRadius:16,backgroundColor:colors.greenSoft,alignItems:'center',justifyContent:'center'},insightIconText:{color:colors.green,fontWeight:'900',fontSize:18},insightTitle:{color:colors.ink,fontSize:14,fontWeight:'900'},insightCopy:{color:colors.muted,fontSize:11,lineHeight:17,marginTop:5},
  tabBar:{position:'absolute',left:0,right:0,bottom:0,height:82,flexDirection:'row',backgroundColor:colors.surface,borderTopWidth:1,borderTopColor:colors.line,paddingTop:10},tab:{flex:1,alignItems:'center'},tabIcon:{color:'#A1A8A4',fontSize:19,fontWeight:'900'},tabLabel:{color:'#A1A8A4',fontSize:10,fontWeight:'700',marginTop:5},tabActive:{color:colors.primary},fab:{position:'absolute',right:22,bottom:98,backgroundColor:colors.primary,paddingHorizontal:18,height:48,borderRadius:16,alignItems:'center',justifyContent:'center',shadowColor:colors.primary,shadowOpacity:.25,shadowRadius:12,elevation:4},fabText:{color:'#fff',fontWeight:'900'},
});
