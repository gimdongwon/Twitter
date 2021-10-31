# Twitter

with nodejs + express

추후에 ts + react 로 fe 개발 예정

목적은 aws, gcp deploy 연습, nodejs 서버 공부 목적

[o] user follow 하기, unfollow 하기
[o] post crud 기능 구현
[o] post like 구현
[o] 이미지 업로드
[o] 검색기능

## aws deploy 하기

1. morgan, express-session

개발용으로 된 미들웨어를 배포용으로 변경

2. sequelize 변경

배포 환경에 맞게 데이터베이스를 수정해야 한다. 일단 json으로 설정한 파일을 js로 변경해야함.

3. cross-env

배포 명령 스크립트. 윈도우를 위해 cross-env lib 를 설치해줌

4. santize-html, csurf

xss를 막기위한 santize-html

csrf를 막기ㅣ위한 csurf lib 설치

5. pm2

project manager로 node 서버를 관리할 때 사용하는 라이브러리이다. `개발할 때 nodemon을 쓴다면 배포할 때는 pm2를 쓴다는 말이 존재한다` 가장 큰 기능은 에러로 서버가 꺼졌을 때 다시 켜주는 것이다.

- npx pm2 list : 현재 pm2 항목리슷트
- npx pm2 logs : 로그
- npx pm2 logs -err : 에러만
- npx pm2 logs --lines :줄수
- npx pm2 kill :종료
- npx pm2 reload all : 전체 재시작

scripts에서 맨 뒤에 -i 0은 생성하길 원하는 프로세스 개수를 뜻함. 0은 현재 cpu 코어 갯수만큼 생성이란 뜻
