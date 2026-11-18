import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';

type TabKey='home'|'jobs'|'work'|'chat'|'my';
const tabs:{key:TabKey;icon:string;label:string}[]=[
  {key:'home',icon:'⌂',label:'홈'},{key:'jobs',icon:'⌕',label:'공고'},{key:'work',icon:'▦',label:'근무일정'},{key:'chat',icon:'◌',label:'채팅'},{key:'my',icon:'○',label:'마이'},
];

export default function DashboardScreen(){
  const {role}=useLocalSearchParams<{role:string}>(); const owner=role==='owner'; const [tab,setTab]=useState<TabKey>('home');
  return <SafeAreaView style={s.screen} edges={['top','bottom']}>
    <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      {owner?<OwnerHome/>:<WorkerScreen tab={tab}/>}
    </ScrollView>
    <View style={s.tabBar}>{tabs.map(item=><Pressable key={item.key} onPress={()=>setTab(item.key)} style={s.tab}><Text style={[s.tabIcon,tab===item.key&&s.tabActive]}>{item.icon}</Text><Text style={[s.tabLabel,tab===item.key&&s.tabActive]}>{item.label}</Text></Pressable>)}</View>
    {owner&&<Pressable style={s.fab}><Text style={s.fabText}>＋ 긴급 구인</Text></Pressable>}
  </SafeAreaView>;
}

function WorkerScreen({tab}:{tab:TabKey}){
  if(tab==='jobs') return <JobsScreen/>;
  if(tab==='work') return <ScheduleScreen/>;
  if(tab==='chat') return <ChatScreen/>;
  if(tab==='my') return <MyScreen/>;
  return <WorkerHome/>;
}

function ScreenHeader({eyebrow,title}:{eyebrow:string;title:string}){return <View style={s.header}><View><Text style={s.hello}>{eyebrow}</Text><Text style={s.heading}>{title}</Text></View><View style={s.bell}><Text style={s.bellText}>♢</Text></View></View>}

function WorkerHome(){return <>
  <ScreenHeader eyebrow="김용병님, 안녕하세요" title="오늘 가능한 근무를 찾았어요"/>
  <View style={s.statusCard}><View><Text style={s.statusEyebrow}>다음 확정 근무</Text><Text style={s.statusTitle}>메가MGC커피 강남역점</Text><Text style={s.statusMeta}>오늘 18:00–22:00 · 4시간</Text></View><Pressable style={s.statusButton}><Text style={s.statusButtonText}>출근 준비</Text></Pressable></View>
  <View style={s.sectionHeader}><Text style={s.sectionTitle}>추천 긴급 공고</Text><Text style={s.more}>전체보기</Text></View><WorkerJobs/>
  <Text style={[s.sectionTitle,{marginTop:30}]}>내 경력 현황</Text><Insight number="12" title="인증 근무 12회" copy="평점 4.9 · 노쇼 없이 성실하게 근무했어요"/>
</>}

function JobsScreen(){
  const [mode,setMode]=useState<'map'|'keyword'>('map');
  return <>
    <ScreenHeader eyebrow="내 경력과 가까운 곳부터" title="긴급 공고 찾기"/>
    <View style={s.searchMode}>
      <Pressable onPress={()=>setMode('map')} style={[s.modeButton,mode==='map'&&s.modeActive]}><Text style={[s.modeText,mode==='map'&&s.modeTextActive]}>⌖  지도 기반</Text></Pressable>
      <Pressable onPress={()=>setMode('keyword')} style={[s.modeButton,mode==='keyword'&&s.modeActive]}><Text style={[s.modeText,mode==='keyword'&&s.modeTextActive]}>⌕  키워드 검색</Text></Pressable>
    </View>
    {mode==='map'?<MapJobs/>:<KeywordJobs/>}
  </>;
}

function KeywordJobs(){return <>
  <View style={s.searchBox}><Text style={s.searchIcon}>⌕</Text><Text style={s.searchPlaceholder}>지역·커피 브랜드 검색</Text></View>
  <View style={s.filters}>{['오늘','경력 일치','거리순'].map((item,i)=><Pressable key={item} style={[s.filter,i===0&&s.filterActive]}><Text style={[s.filterText,i===0&&s.filterTextActive]}>{item}{i===2?' ⌄':''}</Text></Pressable>)}</View>
  <View style={s.resultHeader}><Text style={s.sectionTitle}>지금 지원 가능</Text><Text style={s.resultCount}>6개 공고</Text></View><WorkerJobs/>
  <View style={s.jobCard}><View style={[s.brandLogo,{backgroundColor:colors.greenSoft}]}><Text style={s.brandLogoText}>이</Text></View><View style={{flex:1}}><Text style={s.jobTitle}>이디야커피 논현점</Text><Text style={s.jobTime}>내일 12:00–17:00</Text><View style={s.jobBottom}><Text style={s.pay}>시급 14,500원</Text><Text style={s.badge}>1.4km</Text></View></View></View>
</>}

function MapJobs(){return <>
  <View style={s.mapFilters}><Pressable style={[s.filter,s.filterActive]}><Text style={[s.filterText,s.filterTextActive]}>오늘</Text></Pressable><Pressable style={s.filter}><Text style={s.filterText}>경력 일치</Text></Pressable><View style={{flex:1}}/><Pressable style={s.locationButton}><Text style={s.locationText}>⌖ 현 위치</Text></Pressable></View>
  <View style={s.map}>
    <View style={[s.road,{top:70,left:-30,width:440,transform:[{rotate:'-8deg'}]}]}/><View style={[s.road,{top:190,left:-35,width:440,transform:[{rotate:'11deg'}]}]}/><View style={[s.roadVertical,{top:-20,left:185,height:390,transform:[{rotate:'6deg'}]}]}/>
    <View style={[s.block,{top:24,left:28,width:100,height:72}]}/><View style={[s.block,{top:105,left:250,width:94,height:82}]}/><View style={[s.block,{top:225,left:30,width:120,height:76}]}/><View style={[s.block,{top:250,left:245,width:105,height:70}]}/>
    <Text style={[s.mapLabel,{top:41,left:44}]}>논현동</Text><Text style={[s.mapLabel,{top:274,left:264}]}>역삼동</Text>
    <View style={[s.pin,{top:95,left:80}]}><Text style={s.pinText}>2</Text></View><View style={[s.pin,{top:135,left:270}]}><Text style={s.pinText}>1</Text></View><View style={[s.pin,s.pinSelected,{top:205,left:173}]}><Text style={s.pinText}>3</Text></View><View style={[s.pin,{top:265,left:315}]}><Text style={s.pinText}>1</Text></View>
    <View style={s.myLocation}><View style={s.myLocationDot}/></View>
  </View>
  <View style={s.mapSummary}><View style={s.mapSummaryTop}><Text style={s.mapSummaryLabel}>선택한 지역의 공고</Text><Text style={s.resultCount}>반경 1.5km · 3개</Text></View><View style={s.mapJob}><View style={s.brandLogo}><Text style={s.brandLogoText}>컴</Text></View><View style={{flex:1}}><Text style={s.jobTitle}>컴포즈커피 신논현점</Text><Text style={s.jobTime}>오늘 19:00–23:00 · 도보 12분</Text><Text style={s.pay}>시급 16,000원</Text></View><Text style={s.chevron}>›</Text></View></View>
</>}

function ScheduleScreen(){return <>
  <ScreenHeader eyebrow="2026년 11월" title="근무일정"/>
  <View style={s.weekRow}>{[['월','16'],['화','17'],['수','18'],['목','19'],['금','20']].map((d,i)=><View key={d[0]} style={[s.day,i===2&&s.dayActive]}><Text style={[s.dayName,i===2&&s.dayTextActive]}>{d[0]}</Text><Text style={[s.dayNumber,i===2&&s.dayTextActive]}>{d[1]}</Text></View>)}</View>
  <Text style={[s.sectionTitle,{marginTop:28}]}>오늘의 근무</Text>
  <View style={s.scheduleCard}><View style={s.timeRail}><Text style={s.timeText}>18:00</Text><View style={s.rail}/><Text style={s.timeText}>22:00</Text></View><View style={s.scheduleInfo}><View style={s.confirmed}><Text style={s.confirmedText}>확정</Text></View><Text style={s.scheduleTitle}>메가MGC커피 강남역점</Text><Text style={s.scheduleMeta}>마감 보조 · 서울 강남구</Text><Pressable style={s.outlineButton}><Text style={s.outlineButtonText}>근무 상세보기</Text></Pressable></View></View>
  <Text style={[s.sectionTitle,{marginTop:30}]}>다가오는 일정</Text><View style={s.upcoming}><Text style={s.upcomingDate}>11. 21{`\n`}토요일</Text><View style={s.divider}/><View><Text style={s.upcomingTitle}>컴포즈커피 신논현점</Text><Text style={s.upcomingMeta}>19:00–23:00 · 4시간</Text></View></View>
</>}

function ChatScreen(){return <>
  <ScreenHeader eyebrow="매칭된 매장과 대화해요" title="채팅"/>
  <View style={s.chatNotice}><Text style={s.chatNoticeIcon}>!</Text><Text style={s.chatNoticeText}>개인정보와 외부 연락처 공유에 주의해주세요.</Text></View>
  <View style={s.chatList}>{[
    ['메','메가MGC커피 강남역점','네, 검정 바지 착용하고 와주세요!','오후 2:18','2'],
    ['컴','컴포즈커피 신논현점','지원이 확정되었습니다.','어제',''],
  ].map(chat=><Pressable key={chat[1]} style={s.chatRow}><View style={s.chatAvatar}><Text style={s.brandLogoText}>{chat[0]}</Text></View><View style={s.chatCopy}><Text style={s.chatName}>{chat[1]}</Text><Text numberOfLines={1} style={s.chatMessage}>{chat[2]}</Text></View><View style={s.chatSide}><Text style={s.chatTime}>{chat[3]}</Text>{chat[4]?<View style={s.unread}><Text style={s.unreadText}>{chat[4]}</Text></View>:null}</View></Pressable>)}</View>
</>}

function MyScreen(){return <>
  <ScreenHeader eyebrow="내 정보와 경력을 관리해요" title="마이"/>
  <View style={s.profileCard}><View style={s.profileAvatar}><Text style={s.profileInitial}>김</Text></View><View style={{flex:1}}><Text style={s.profileName}>김용병</Text><Text style={s.profileMeta}>경력 인증 완료 · 평점 4.9</Text></View><Text style={s.chevron}>›</Text></View>
  <View style={s.stats}><View style={s.stat}><Text style={s.statNumber}>12</Text><Text style={s.statLabel}>근무 완료</Text></View><View style={s.statLine}/><View style={s.stat}><Text style={s.statNumber}>48h</Text><Text style={s.statLabel}>누적 시간</Text></View><View style={s.statLine}/><View style={s.stat}><Text style={s.statNumber}>4.9</Text><Text style={s.statLabel}>평점</Text></View></View>
  <Text style={[s.sectionTitle,{marginTop:30}]}>내 정보</Text><View style={s.menuList}>{['브랜드 경력 인증','정산 계좌 관리','알림 설정','고객센터'].map(item=><Pressable key={item} style={s.menuRow}><Text style={s.menuText}>{item}</Text><Text style={s.chevron}>›</Text></Pressable>)}</View>
</>}

function OwnerHome(){return <>
  <ScreenHeader eyebrow="강남역점 점주님, 안녕하세요" title="오늘 매장 운영은 괜찮나요?"/>
  <View style={s.statusCard}><View><Text style={s.statusEyebrow}>등록 중인 긴급 공고</Text><Text style={s.statusTitle}>오늘 저녁 마감 · 1명</Text><Text style={s.statusMeta}>18:00–22:00 · 지원자 3명</Text></View><Pressable style={s.statusButton}><Text style={s.statusButtonText}>지원자 보기</Text></Pressable></View>
  <View style={s.sectionHeader}><Text style={s.sectionTitle}>빠른 구인</Text><Text style={s.more}>전체보기</Text></View><OwnerQuick/><Text style={[s.sectionTitle,{marginTop:30}]}>최근 매칭 현황</Text><Insight number="3" title="이번 달 매칭 3건" copy="평균 8분 안에 근로자를 찾았어요"/>
</>}

function Insight({number,title,copy}:{number:string;title:string;copy:string}){return <View style={s.insightCard}><View style={s.insightIcon}><Text style={s.insightIconText}>{number}</Text></View><View style={{flex:1}}><Text style={s.insightTitle}>{title}</Text><Text style={s.insightCopy}>{copy}</Text></View></View>}

function WorkerJobs(){return <View style={s.cards}>{[
  ['컴포즈커피 신논현점','오늘 19:00–23:00','시급 16,000원','도보 12분'],['메가MGC커피 역삼점','내일 07:00–11:00','시급 15,000원','경력 일치'],
].map((job,i)=><View style={s.jobCard} key={job[0]}><View style={s.brandLogo}><Text style={s.brandLogoText}>{job[0][0]}</Text></View><View style={{flex:1}}><Text style={s.jobTitle}>{job[0]}</Text><Text style={s.jobTime}>{job[1]}</Text><View style={s.jobBottom}><Text style={s.pay}>{job[2]}</Text><Text style={[s.badge,i===1&&s.matchBadge]}>{job[3]}</Text></View></View></View>)}</View>}
function OwnerQuick(){return <View style={s.quickRow}>{[['🌅','오픈'],['☕','피크타임'],['🌙','마감']].map(item=><Pressable key={item[1]} style={s.quick}><Text style={s.quickIcon}>{item[0]}</Text><Text style={s.quickText}>{item[1]}</Text><Text style={s.quickMeta}>카페 템플릿</Text></Pressable>)}</View>}

const s=StyleSheet.create({
  screen:{flex:1,width:'100%',maxWidth:430,alignSelf:'center',backgroundColor:colors.background},content:{padding:24,paddingBottom:120},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8},hello:{color:colors.muted,fontSize:13,fontWeight:'700'},heading:{color:colors.ink,fontSize:24,fontWeight:'900',marginTop:6,letterSpacing:-.5},bell:{width:42,height:42,borderRadius:15,backgroundColor:colors.surface,alignItems:'center',justifyContent:'center'},bellText:{color:colors.ink,fontSize:19,fontWeight:'900'},
  statusCard:{backgroundColor:colors.ink,borderRadius:24,padding:22,marginTop:28},statusEyebrow:{color:'#AAB6B1',fontSize:12,fontWeight:'800'},statusTitle:{color:'#fff',fontSize:19,fontWeight:'900',marginTop:9},statusMeta:{color:'#C7CFCC',fontSize:13,marginTop:6},statusButton:{backgroundColor:colors.primary,borderRadius:13,paddingVertical:12,alignItems:'center',marginTop:20},statusButtonText:{color:'#fff',fontWeight:'900'},
  sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:30,marginBottom:14},sectionTitle:{color:colors.ink,fontSize:18,fontWeight:'900'},more:{color:colors.muted,fontSize:12,fontWeight:'700'},cards:{gap:12},jobCard:{flexDirection:'row',padding:17,backgroundColor:colors.surface,borderRadius:20,gap:14},brandLogo:{width:48,height:48,borderRadius:15,backgroundColor:colors.warning,alignItems:'center',justifyContent:'center'},brandLogoText:{fontSize:17,fontWeight:'900',color:colors.ink},jobTitle:{color:colors.ink,fontSize:15,fontWeight:'900'},jobTime:{color:colors.muted,fontSize:12,marginTop:5},jobBottom:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:13},pay:{color:colors.primary,fontSize:13,fontWeight:'900'},badge:{color:colors.muted,fontSize:10,backgroundColor:colors.background,paddingHorizontal:8,paddingVertical:5,borderRadius:8},matchBadge:{color:colors.green,backgroundColor:colors.greenSoft},
  quickRow:{flexDirection:'row',gap:10},quick:{flex:1,paddingVertical:17,alignItems:'center',backgroundColor:colors.surface,borderRadius:18},quickIcon:{fontSize:24},quickText:{color:colors.ink,fontSize:13,fontWeight:'900',marginTop:9},quickMeta:{color:colors.muted,fontSize:10,marginTop:3},insightCard:{backgroundColor:colors.surface,borderRadius:20,padding:18,marginTop:14,flexDirection:'row',alignItems:'center',gap:14},insightIcon:{width:48,height:48,borderRadius:16,backgroundColor:colors.greenSoft,alignItems:'center',justifyContent:'center'},insightIconText:{color:colors.green,fontWeight:'900',fontSize:18},insightTitle:{color:colors.ink,fontSize:14,fontWeight:'900'},insightCopy:{color:colors.muted,fontSize:11,lineHeight:17,marginTop:5},
  searchMode:{height:48,backgroundColor:'#EDEEEA',borderRadius:15,padding:4,flexDirection:'row',marginTop:24},modeButton:{flex:1,borderRadius:12,alignItems:'center',justifyContent:'center'},modeActive:{backgroundColor:colors.surface,shadowColor:colors.ink,shadowOpacity:.06,shadowRadius:6,elevation:1},modeText:{fontSize:12,color:colors.muted,fontWeight:'800'},modeTextActive:{color:colors.ink},
  searchBox:{height:54,borderRadius:17,backgroundColor:colors.surface,flexDirection:'row',alignItems:'center',paddingHorizontal:17,marginTop:26,borderWidth:1,borderColor:colors.line},searchIcon:{fontSize:24,color:colors.ink,marginRight:10},searchPlaceholder:{color:'#959D99',fontSize:14,fontWeight:'700'},filters:{flexDirection:'row',gap:8,marginTop:14},filter:{paddingHorizontal:14,paddingVertical:9,borderRadius:12,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.line},filterActive:{backgroundColor:colors.ink,borderColor:colors.ink},filterText:{fontSize:12,fontWeight:'800',color:colors.muted},filterTextActive:{color:'#fff'},resultHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:30,marginBottom:14},resultCount:{fontSize:12,color:colors.muted},
  mapFilters:{flexDirection:'row',alignItems:'center',gap:8,marginTop:14},locationButton:{paddingHorizontal:12,paddingVertical:9,borderRadius:12,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.line},locationText:{fontSize:11,color:colors.ink,fontWeight:'800'},map:{height:350,borderRadius:22,backgroundColor:'#DFE8E1',marginTop:14,overflow:'hidden',borderWidth:1,borderColor:'#D6DFD8',position:'relative'},road:{position:'absolute',height:30,backgroundColor:'#F8F8F3',borderTopWidth:1,borderBottomWidth:1,borderColor:'#D2DAD4'},roadVertical:{position:'absolute',width:32,backgroundColor:'#F8F8F3',borderLeftWidth:1,borderRightWidth:1,borderColor:'#D2DAD4'},block:{position:'absolute',backgroundColor:'#D2DDD5',borderRadius:9},mapLabel:{position:'absolute',fontSize:10,color:'#87928C',fontWeight:'700'},pin:{position:'absolute',width:38,height:38,borderRadius:19,backgroundColor:colors.ink,borderWidth:3,borderColor:'#fff',alignItems:'center',justifyContent:'center',shadowColor:colors.ink,shadowOpacity:.2,shadowRadius:5,elevation:3},pinSelected:{width:46,height:46,borderRadius:23,backgroundColor:colors.primary},pinText:{color:'#fff',fontSize:13,fontWeight:'900'},myLocation:{position:'absolute',top:176,left:109,width:22,height:22,borderRadius:11,backgroundColor:'#A9D5FF',alignItems:'center',justifyContent:'center'},myLocationDot:{width:10,height:10,borderRadius:5,backgroundColor:'#348EE7',borderWidth:2,borderColor:'#fff'},mapSummary:{backgroundColor:colors.surface,borderRadius:22,padding:17,marginTop:-30,marginHorizontal:12,shadowColor:colors.ink,shadowOpacity:.12,shadowRadius:14,shadowOffset:{width:0,height:6},elevation:5},mapSummaryTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:13,borderBottomWidth:1,borderBottomColor:colors.line},mapSummaryLabel:{fontSize:13,color:colors.ink,fontWeight:'900'},mapJob:{flexDirection:'row',alignItems:'center',gap:12,paddingTop:14},
  weekRow:{flexDirection:'row',justifyContent:'space-between',marginTop:26,backgroundColor:colors.surface,borderRadius:20,padding:10},day:{width:55,height:68,borderRadius:16,alignItems:'center',justifyContent:'center'},dayActive:{backgroundColor:colors.primary},dayName:{fontSize:11,color:colors.muted,fontWeight:'700'},dayNumber:{fontSize:17,color:colors.ink,fontWeight:'900',marginTop:5},dayTextActive:{color:'#fff'},scheduleCard:{marginTop:14,backgroundColor:colors.surface,borderRadius:22,padding:18,flexDirection:'row'},timeRail:{width:52,alignItems:'center'},timeText:{fontSize:11,fontWeight:'800',color:colors.muted},rail:{width:2,height:72,backgroundColor:colors.primarySoft,marginVertical:6},scheduleInfo:{flex:1,paddingLeft:14},confirmed:{alignSelf:'flex-start',backgroundColor:colors.greenSoft,paddingHorizontal:8,paddingVertical:5,borderRadius:7},confirmedText:{fontSize:10,color:colors.green,fontWeight:'900'},scheduleTitle:{fontSize:17,color:colors.ink,fontWeight:'900',marginTop:11},scheduleMeta:{fontSize:12,color:colors.muted,marginTop:5},outlineButton:{height:40,borderRadius:12,borderWidth:1,borderColor:colors.line,alignItems:'center',justifyContent:'center',marginTop:16},outlineButtonText:{fontSize:12,color:colors.ink,fontWeight:'800'},upcoming:{backgroundColor:colors.surface,borderRadius:18,padding:17,marginTop:14,flexDirection:'row',alignItems:'center'},upcomingDate:{fontSize:11,color:colors.primary,fontWeight:'900',lineHeight:17},divider:{width:1,height:38,backgroundColor:colors.line,marginHorizontal:16},upcomingTitle:{fontSize:14,color:colors.ink,fontWeight:'900'},upcomingMeta:{fontSize:11,color:colors.muted,marginTop:5},
  chatNotice:{marginTop:25,backgroundColor:colors.warning,borderRadius:14,padding:13,flexDirection:'row',alignItems:'center'},chatNoticeIcon:{width:22,height:22,borderRadius:11,textAlign:'center',textAlignVertical:'center',backgroundColor:'#F1B944',color:'#fff',fontWeight:'900',marginRight:9},chatNoticeText:{fontSize:11,color:'#796129',fontWeight:'700'},chatList:{marginTop:16,backgroundColor:colors.surface,borderRadius:20,overflow:'hidden'},chatRow:{minHeight:82,flexDirection:'row',alignItems:'center',paddingHorizontal:16,borderBottomWidth:1,borderBottomColor:colors.line},chatAvatar:{width:46,height:46,borderRadius:15,backgroundColor:colors.warning,alignItems:'center',justifyContent:'center',marginRight:13},chatCopy:{flex:1},chatName:{fontSize:14,color:colors.ink,fontWeight:'900'},chatMessage:{fontSize:12,color:colors.muted,marginTop:6},chatSide:{alignItems:'flex-end',marginLeft:8},chatTime:{fontSize:10,color:'#9BA19E'},unread:{width:20,height:20,borderRadius:10,backgroundColor:colors.primary,alignItems:'center',justifyContent:'center',marginTop:7},unreadText:{fontSize:10,color:'#fff',fontWeight:'900'},
  profileCard:{backgroundColor:colors.surface,borderRadius:22,padding:18,flexDirection:'row',alignItems:'center',marginTop:26},profileAvatar:{width:58,height:58,borderRadius:20,backgroundColor:colors.ink,alignItems:'center',justifyContent:'center',marginRight:14},profileInitial:{color:'#fff',fontSize:20,fontWeight:'900'},profileName:{fontSize:18,color:colors.ink,fontWeight:'900'},profileMeta:{fontSize:12,color:colors.muted,marginTop:6},chevron:{fontSize:28,color:'#AAB0AD',fontWeight:'300'},stats:{flexDirection:'row',backgroundColor:colors.surface,borderRadius:20,paddingVertical:18,marginTop:12},stat:{flex:1,alignItems:'center'},statNumber:{fontSize:18,color:colors.ink,fontWeight:'900'},statLabel:{fontSize:10,color:colors.muted,marginTop:5},statLine:{width:1,backgroundColor:colors.line},menuList:{marginTop:14,backgroundColor:colors.surface,borderRadius:20,overflow:'hidden'},menuRow:{height:58,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:17,borderBottomWidth:1,borderBottomColor:colors.line},menuText:{fontSize:14,color:colors.ink,fontWeight:'700'},
  tabBar:{position:'absolute',left:0,right:0,bottom:0,height:82,flexDirection:'row',backgroundColor:colors.surface,borderTopWidth:1,borderTopColor:colors.line,paddingTop:10},tab:{flex:1,alignItems:'center'},tabIcon:{color:'#A1A8A4',fontSize:19,fontWeight:'900'},tabLabel:{color:'#A1A8A4',fontSize:9,fontWeight:'700',marginTop:5},tabActive:{color:colors.primary},fab:{position:'absolute',right:22,bottom:98,backgroundColor:colors.primary,paddingHorizontal:18,height:48,borderRadius:16,alignItems:'center',justifyContent:'center',shadowColor:colors.primary,shadowOpacity:.25,shadowRadius:12,elevation:4},fabText:{color:'#fff',fontWeight:'900'},
});
