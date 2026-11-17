/* ===== 휴대폰에서 화면이 좌우로 밀리는 문제
   - 아이폰은 글자 크기 16px보다 작은 입력칸을 누르면 화면을 확대해서, 그 뒤로 좌우로 끌리게 돼요 → 입력칸 16px
   - overflow-x:clip을 모르는 옛 브라우저는 hidden으로
   - 좌우 끝에서 튕기며 밀리는 것 막기 ===== */
(function(){var st=document.createElement('style');st.textContent='html,body{overscroll-behavior-x:none}@supports not (overflow-x:clip){html,body{overflow-x:hidden}}@media (pointer:coarse){input:not([type=checkbox]):not([type=radio]):not([type=range]),select,textarea{font-size:16px!important}}';document.head.appendChild(st);})();
