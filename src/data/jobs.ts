export type Job = {
  id: string;
  brand: string;
  store: string;
  area: string;
  address: string;
  dateLabel: string;
  isToday: boolean;
  time: string;
  hourlyPay: number;
  distance: number;
  matched: boolean;
  role: string;
  description: string;
  requirements: string[];
};

export const jobs: Job[] = [
  {id:'compose-sinnonhyeon',brand:'컴포즈커피',store:'신논현점',area:'논현동',address:'서울 강남구 강남대로 492',dateLabel:'오늘',isToday:true,time:'19:00–23:00',hourlyPay:16000,distance:.8,matched:true,role:'마감 보조',description:'음료 제조와 마감 정리를 함께해 주실 분을 찾아요.',requirements:['컴포즈커피 경력 3개월 이상','포스 및 음료 제조 가능','검정 바지 착용']},
  {id:'mega-yeoksam',brand:'메가MGC커피',store:'역삼점',area:'역삼동',address:'서울 강남구 테헤란로 146',dateLabel:'내일',isToday:false,time:'07:00–11:00',hourlyPay:15000,distance:1.1,matched:true,role:'오픈 보조',description:'오픈 준비와 출근 시간대 음료 제조 업무예요.',requirements:['메가MGC커피 경력자','오전 6시 50분까지 도착','보건증 필수']},
  {id:'ediya-nonhyeon',brand:'이디야커피',store:'논현점',area:'논현동',address:'서울 강남구 학동로 118',dateLabel:'내일',isToday:false,time:'12:00–17:00',hourlyPay:14500,distance:1.4,matched:false,role:'피크타임 보조',description:'점심 피크타임 음료 제조와 고객 응대를 담당해요.',requirements:['카페 경력 6개월 이상','음료 레시피 숙지 우대','보건증 필수']},
  {id:'paik-gangnam',brand:'빽다방',store:'강남역점',area:'역삼동',address:'서울 강남구 강남대로 396',dateLabel:'오늘',isToday:true,time:'17:00–22:00',hourlyPay:15500,distance:1.6,matched:false,role:'저녁 보조',description:'저녁 주문 응대와 음료 제조, 재료 보충 업무예요.',requirements:['카페 근무 경험','밝은 고객 응대','마감 시간 준수']},
  {id:'twosome-seolleung',brand:'투썸플레이스',store:'선릉점',area:'대치동',address:'서울 강남구 선릉로 428',dateLabel:'11월 20일',isToday:false,time:'14:00–20:00',hourlyPay:16500,distance:2.2,matched:true,role:'음료·디저트 보조',description:'음료 제조와 케이크 포장 업무를 함께 진행해요.',requirements:['투썸플레이스 경력 우대','케이크 포장 가능','6시간 근무 가능']},
  {id:'venti-sinsa',brand:'더벤티',store:'신사점',area:'신사동',address:'서울 강남구 도산대로 116',dateLabel:'오늘',isToday:true,time:'18:00–22:30',hourlyPay:15000,distance:2.5,matched:false,role:'마감 보조',description:'음료 제조 및 기물 세척, 마감 청소 업무예요.',requirements:['카페 경력 3개월 이상','22시 30분까지 근무','보건증 필수']},
  {id:'compose-gangnamgu',brand:'컴포즈커피',store:'강남구청점',area:'청담동',address:'서울 강남구 학동로 338',dateLabel:'11월 21일',isToday:false,time:'08:00–13:00',hourlyPay:14800,distance:2.8,matched:true,role:'오픈 보조',description:'오픈 세팅과 오전 음료 주문을 담당해요.',requirements:['컴포즈커피 경력자','오픈 근무 경험','시간 준수']},
  {id:'mega-daechi',brand:'메가MGC커피',store:'대치학원가점',area:'대치동',address:'서울 강남구 도곡로 510',dateLabel:'11월 21일',isToday:false,time:'16:00–21:00',hourlyPay:15200,distance:3.1,matched:true,role:'피크타임 보조',description:'하교 시간대 주문 응대와 음료 제조를 도와주세요.',requirements:['메가MGC커피 경력자','빠른 음료 제조','친절한 응대']},
  {id:'ediya-apgujeong',brand:'이디야커피',store:'압구정점',area:'신사동',address:'서울 강남구 압구정로 214',dateLabel:'11월 22일',isToday:false,time:'10:00–15:00',hourlyPay:14600,distance:3.4,matched:false,role:'주간 보조',description:'주간 음료 제조와 매장 정리 업무예요.',requirements:['카페 경력 우대','5시간 근무 가능','보건증 필수']},
  {id:'paik-samseong',brand:'빽다방',store:'삼성중앙점',area:'삼성동',address:'서울 강남구 봉은사로 469',dateLabel:'11월 22일',isToday:false,time:'13:00–18:00',hourlyPay:14900,distance:3.8,matched:false,role:'주말 보조',description:'주말 주문 응대와 음료 제조를 담당해요.',requirements:['카페 경험자','주말 근무 가능','성실한 근무 태도']},
];

export const formatPay = (pay:number) => `시급 ${pay.toLocaleString('ko-KR')}원`;
