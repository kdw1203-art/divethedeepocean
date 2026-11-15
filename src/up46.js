/* ===== 운영자 콘솔: 2단계 인증 뒤에도 '인증 필요'로 남던 문제 ===== */
/* 원인: 처음 콘솔을 열 때 받은 인증 단계(aal1)를 계속 기억해서, 6자리 인증을 마쳐도 다시 확인하지 않았음 */
(function(){if(!BE.on||!BE.sb)return;
  BE.sb.auth.onAuthStateChange(function(ev){if(ev==='MFA_CHALLENGE_VERIFIED'||ev==='SIGNED_IN'||ev==='TOKEN_REFRESHED'||ev==='SIGNED_OUT'){state.aal=null;aalLoad.b=0;if(ev==='MFA_CHALLENGE_VERIFIED'){LS.set('mfaOk',Date.now());if(state.afterMfa){var g=state.afterMfa;state.afterMfa=null;setTimeout(function(){location.hash=g;},300);}else if(cur()==='mfa'&&state.me&&state.me.admin){setTimeout(function(){location.hash='#admin';},300);}}if(cur()==='admin')setTimeout(rerender,50);}});})();
var _admin46=V.admin;V.admin=function(){if(BE.on&&BE.user&&state.me&&state.me.admin&&state.aal&&state.aal!=='aal2'&&(!V.admin.chk||Date.now()-V.admin.chk>4000)){V.admin.chk=Date.now();state.aal=null;aalLoad.b=0;}return _admin46();};
document.addEventListener('click',function(e){var a=e.target.closest('a[href="#mfa"]');if(a&&cur()==='admin')state.afterMfa='#admin';},true);
