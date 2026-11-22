/* ===== 사진 보정: 물 상태 · 카메라 프리셋이 눈에 띄게 다르게 =====
   기존 보정은 색을 회색 평균으로 맞추고 끝나서 프리셋끼리 결과가 거의 같았어요.
   기본 보정 뒤에 프리셋마다 고유한 색감(물빛 · 따뜻함 · 대비 · 그림자)을 한 번 더 입혀요. 보정 강도에 비례해요. */
var PFLOOK={
  auto:null,
  tropic:{r:.97,g:1.03,b:1.10,sat:1.18,con:1.08,lift:0,gam:.97},   /* 맑은 열대 바다: 푸른 물빛은 살리고 선명하게 */
  deep:{r:1.16,g:.99,b:.92,sat:1.12,con:1.10,lift:.05,gam:.92},    /* 깊은 곳: 빨강 더 살리고 어두운 곳 끌어올리기 */
  green:{r:1.08,g:.88,b:1.06,sat:1.06,con:1.14,lift:.02,gam:.96},  /* 초록 물: 초록기 빼고 탁함 걷기 */
  murky:{r:1.02,g:.98,b:1,sat:1.12,con:1.28,lift:0,gam:1.02,black:.06}, /* 탁한 물: 강한 대비 · 뿌연 막 걷기 */
  light:{r:.98,g:1,b:1.03,sat:1.05,con:1.05,lift:0,gam:1},         /* 라이트 · 플래시: 원래 색 유지, 살짝만 */
  cave:{r:1.06,g:1,b:.96,sat:1.04,con:1.16,lift:.10,gam:.86}       /* 동굴 · 난파선: 그림자 살리고 대비 */
};
var CAMLOOK={gopro:{r:1.08,g:.98,b:.97,sat:1.06,con:1.06},dji:{r:1.02,g:1,b:1,sat:1.08,con:1.04},insta:{r:1.05,g:.99,b:.98,sat:1.05,con:1.05},tg:{r:1,g:1,b:1.02,sat:1.04,con:1.02},compact:{r:1.03,g:1,b:.99,sat:1.04,con:1.04},ml:{r:1.01,g:1,b:1,sat:1.02,con:1.02},phone:{r:1,g:1.01,b:1,sat:.95,con:1.03}};
function pfLook(cv,L,C,t){if(!cv||(!L&&!C)||t<=0)return cv;var x=cv.getContext('2d'),id;try{id=x.getImageData(0,0,cv.width,cv.height);}catch(e){return cv;}var d=id.data,mix=function(a,v){return 1+(v-1)*t*a;};
  var o=L||{},c=C||{},R=mix(1,o.r||1)*mix(1,c.r||1),G=mix(1,o.g||1)*mix(1,c.g||1),B=mix(1,o.b||1)*mix(1,c.b||1),S=mix(1,o.sat||1)*mix(1,c.sat||1),K=mix(1,o.con||1)*mix(1,c.con||1),lift=(o.lift||0)*t,gam=1+((o.gam||1)-1)*t,blk=(o.black||0)*t;
  var lut=new Uint8ClampedArray(256);for(var v=0;v<256;v++){var y=v/255;y=(y-blk)/(1-blk);if(y<0)y=0;y=Math.pow(y,gam);y=y+lift*(1-y)*(1-y);y=(y-.5)*K+.5;lut[v]=y*255;}
  for(var i=0;i<d.length;i+=4){var r=d[i]*R,g=d[i+1]*G,b=d[i+2]*B,l=.299*r+.587*g+.114*b;r=l+(r-l)*S;g=l+(g-l)*S;b=l+(b-l)*S;d[i]=lut[r<0?0:r>255?255:r|0];d[i+1]=lut[g<0?0:g>255?255:g|0];d[i+2]=lut[b<0?0:b>255?255:b|0];}
  x.putImageData(id,0,0);return cv;}
var _pfA119=pfApply;pfApply=function(img,k,maxW,opt){var cv=_pfA119(img,k,maxW,opt);if(!opt)return cv;var t=Math.max(0,Math.min(1,(k==null?70:k)/100));if(opt.bw)return cv;
  var cam=opt.cam&&opt.cam!=='auto'&&opt.cam!=='none'?opt.cam:(typeof pfCamId==='function'&&opt.cam==='auto'?pfCamId(img,opt):null);return pfLook(cv,PFLOOK[opt.preset||'auto'],cam?CAMLOOK[cam]:null,t);};
