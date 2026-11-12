/* ===== 5차 ===== */
/* 261 업체 연락처·서류는 본인과 운영자만: 공개 열만 읽고, 나머지는 함수로 받아 합쳐요 */
function bizCols(){return 'id,owner,biz_type,name,name_en,spot,addr,web,langs,services,orgs,facilities,price,intro,status,created_at,reject_reason,reviewed_at,photos,price_list,hours,paused,parent_id';}
function bizPriv(r){if(!r||!r.data||!r.data.length||!BE.user)return r;return BE.sb.rpc('biz_private',{ids:r.data.map(function(b){return b.id;})}).then(function(p){var o={};(p.data||[]).forEach(function(x){o[x.id]=x;});r.data.forEach(function(b){var x=o[b.id];if(x){b.owner_name=x.owner_name;b.email=x.email;b.tel=x.tel;b.docs=x.docs;}});return r;},function(){return r;});}
