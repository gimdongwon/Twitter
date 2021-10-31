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

6. winston

실제 서버를 운영할 때 console.log와 console.error를 대체하기 위한 모듈이다. 로그를 파일이나 다른 데이터베이스에 저장하기 위해 사용.

인수 설정으로는 level, format, transports 등이 있다.

- level은 로그의 심각도를 의미ㅣ한다. error, warn, info, verbose, debug, silly가 있다. 심각도 순이므로 위 순서를 참고하여 기록하길 원하는 유형의 로그를 고르면 된다.
- format은 로그의 형식이다. json, label, timestamp, printf, simple, combine 등의 다양한 형식이 있다. 기본적으로는 JSON 형식으로 기록하지만, 로그 기록 시간을 표시하려면 timestamp가 낫다. combine은 여러 형식을 혼합해서 사용할 때 쓴다.
- transports는 로그 저장 방식을 의미한다. new transports.File은 파일로 저장한다는 뜻이고, new transports.Console은 콘솔에 출력한다는 뜻이다. 여러 로깅 방식을 동시에 사용할 수도 있다.

7. helmet, hpp

서버의 각종 취약점을 보완해주는 패키지로, 익스프레스 미들웨어로서 사용할 수 있다. helmet과 hpp가 방어해주는 취약점 목록은 각각의 공식 문서에 나와 있다. 기본적으로는 배포전에 이 두 패키지를 넣어주는 것이 좋다.
