import re
p='/home/claude/dive/site/index.html';s=open(p).read()
mod=open('/home/claude/dive/site/life_about.js').read()+'\n'+open('/home/claude/dive/site/up.js').read()+'\n'+open('/home/claude/dive/site/up2.js').read()
mark="window.addEventListener('hashchange',route);"
if '/*UP-START*/' in s:
  a=s.index('/*UP-START*/');b=s.index('/*UP-END*/')+len('/*UP-END*/');s=s[:a]+'/*UP-START*/\n'+mod+'\n/*UP-END*/'+s[b:]
else:
  s=s.replace(mark,'/*UP-START*/\n'+mod+'\n/*UP-END*/\n'+mark,1)
if '<meta name="description"' not in s:
  s=s.replace('<title>','<meta name="description" content="전 세계 스쿠버·프리다이빙 포인트, 리조트, 강사, 로그와 장비 정비까지 한 곳에서. 다이버는 모두 무료.">\n<title>',1)
open(p,'w').write(s);print('ok',len(s))
