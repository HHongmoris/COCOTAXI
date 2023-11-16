# SSAFY 9기 기업연계프로젝트 

# 🥥 COCO TAXI🚖

## **0️⃣ 프로젝트 개요**

🎈 프로젝트명 : COCO TAXI

📌 프로젝트 컨셉 : 코코넛사일로(주)에서 사용하는 앱인 KOKKOK Move의 ADMIN 페이지 제작

🛠 개발 기간 : 23.10.10 ~ 23.11.17 (5주)

💻 사용 기술스택 : SpringBoot, REACT 




## **1️⃣ 팀원 정보 및 업무 분담 내역**

| 이름         | 역할     | 설명                                                         |
| ------------ | -------- | ------------------------------------------------------------ |
| 김성우(팀장) | Frontend |                                                              |
| 김남우       | Frontend | React와 JavaScript를 이용한 프론트 개발 컴포넌트 설계 ReverseGeocoding(OpenStreetMap/Nominatim) <br />requestAnimationFrame <br />UI/UX |
| 김민태       | Frontend | Google map 을 활용한 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ |
| 홍성민       | Backend  |                                                              |





## **2️⃣ 서비스 대표 기능**

<h4>Google MAP</h4>

| 기능   | 세부기능                                              |
| ------ | ----------------------------------------------------- |
| 구글맵 | 영어 버전   Google 버전, 라오스에서 적용              |
|        | 그림 지도 및 위성 사진 제공                           |
|        | 호출 요청 및 운전자 시각화 마크 제공 및 정보 제공     |
|        | 호출 클릭시 6km 반경 원 제공 및 호출 가능 차량 시각화 |
|        | 30초 이상 대기시 강제배차 서비스 제공                 |
|        | 차량 유저  간 이동 경로 제공                          |
|        | 교통 정보 제공                                        |
|        |                                                       |
|        |                                                       |



### **프로젝트의 특장점 **

1. 구글 경로 API 사용료를 줄이기 위해 Open Router Service 를 사용하여 비용을 절감
1. 




## 3️⃣ 서비스 화면

<h4>로그인</h4>

![로그인](./exec/assets/로그인.gif)

</hr>

<h4>거래소</h4>

![거래소](./exec/assets/전화번호인증.gif)

</hr>

<h4>주문</h4>

![주문](./exec/assets/메인페이지.gif)

</hr>

<h4>차트</h4>

![차트](./exec/assets/케이지-만들기.gif)

</hr>

<h4>정보</h4>

![정보](./exec/assets/동물추가.gif)

</hr>

<h4>마이페이지</h4>

![마이페이지](./exec/assets/동물 상세.gif)

</hr>

<h4>입출금 내역</h4>

![입출금 내역](./exec/assets/실시간-영상.gif)

</hr>

<h4>더보기</h4>

![더보기](./exec/assets/자동화-설정.gif)

</hr>

<h4>내정보 수정</h4>

![내정보 수정](./exec/assets/알림-추가.gif)

</hr>



## 4️⃣ 시스템 아키텍처 및 개발 환경

<h4>🌐 공통</h4>

| 상세       |       내용        |
| ---------- | :---------------: |
| GitLab     |     형상 관리     |
| Jira       | 일정 및 이슈 관리 |
| Mattermost |   커뮤니케이션    |
| Notion     | 일정 및 문서 관리 |

</br>

<h4>📱 FrontEnd&BackEnd</h4>

| 상세           |  버전  |
| :------------- | :----: |
| REACT          |  1.8   |
| Java           |   17   |
| SpringBoot     | 3.1.3  |
| SpringSecurity |   6    |
| redisson       | 3.23.4 |
| redis          |  7.2   |
| Jenkins        | 2.423  |
| nginx          | 1.25.2 |
| docker         | 24.0.6 |





<h4>System Architecture</h4>

![image-20231116154633724](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20231116154633724.png)



## 5️⃣ 컴포넌트 구조 및 프로토타입

<h4>📱 FrontEnd</h4>

```
📂 Front_end
  ㄴ📂 src 
 	 ㄴ📂 assets
  		ㄴ📘 CoCo.png
  		ㄴ📘 react.svg
      ㄴ📂 components
         ㄴ📄 AdminLogin.jsx
         ㄴ📄 ClientList.jsx
         ㄴ📄 DispatchCheck.jsx
         ㄴ📄 DispatchDriverList.jsx
         ㄴ📄 ManualInformation.jsx
         ㄴ📄 MapComponent.jsx
         ㄴ📄 MatchingToast.jsx
         ㄴ📄 MovingCarMap.jsx	
      ㄴ📂 navigations
     	 ㄴ📝App.css
      	 ㄴ📄 App.jsx
      ㄴ📂 redux
         ㄴ📄 action.js
         ㄴ📄 redux.js
         ㄴ📄 store.js
  🐳 Dockerfile
  📝 index.html
  📝 package.json
  📝 vite.config.js
  
```

<h4>💾 BackEnd</h4>

```
fffff
```



## 6️⃣ 데이터베이스 모델링 (ERD)

![erd](C:\Users\SSAFY\Desktop\coco taxi pic\erd.png)



## 7️⃣ Convention

### Commit Convention

> **"[Type] #(Jira issue number) Commit message"**

- Type
  - **Fix** : 잘못된 동작을 고칠 때

    > fix function/error/typo in style.css

  - option
    - funtion : 고친 함수 명 (e.g. fix login function in index.html)
    - error : 수정한 에러 (e.g. fix [구체적 에러명] error in login.js)
    - typo : 오타 (e.g. fix typo in style.css)
  - **Add** : 새로운 것을 추가할 때

    > add mytest.test for test (새로운 파일 추가 시)

    > add blue color to style.css (기존 파일에 내용 추가 시)

  - **Move** : 코드나 파일을 이동할 때

    > move A to B (e.g. A를 B로 이동할 때)

  - **Rename** : 이름 변경이 있을 때

    > rename A to B (e.g. A를 B로 이름을 변경할 때)

  - **Update** : 정상적으로 동작하는 파일을 보완하는 경우

    > update test.js to use HTTPS (test.js에 기존의 프로토콜에서 HTTPS 프로토콜 사용으로 변경)

  - **Remove** : 삭제가 있을 때

    > remove test.js (파일 삭제 시)

    > remove black color from style.css (파일 내 부분 삭제 시)
- #(Jira issue number) : Click 시, Jira에서 해당 Issue에 대한 상세 내용 확인 가능
- Commit message : 변경 사항에 대해 명확하게 기술




## **8️⃣ 회고**

| 이름                                                         | 내용                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <a href="https://github.com/niyamallo"><img src="https://avatars.githubusercontent.com/u/122415726?v=4?s=100" width="100px;" alt=""/> |                                                              |
| <a href="https://github.com/niyamallo"><img src="https://avatars.githubusercontent.com/u/122415726?v=4?s=100" width="100px;" alt=""/> | **김남우** <br />개발한 대부분의 컴포넌트를 한 페이지에 위치시키는 과정에서 컴포넌트의 구조를 설계하는 것이 어려웠다. 특정 데이터를 어떤 컴포넌트가 가지고 있어야하는지 고민하며 구조를 만들었지만, 기능이나 컴포넌트가 추가될 때마다 데이터의 전달 루트를 새롭게 구성해야했고, 만족스러운 최적화가 되지 않은 상태이다.(추후 리팩토링을 통해 해당 부분 수정 예정). 다량의 위치 데이터가 포함된 테이블에 ReverseGeocoding을 구현하고 적용하며 최소한의 API를 호출하는 로직을 구성하기 어려웠다. requestAnimationFrame을 사용하며 Animation Frame이라는 별도의 queue에 콜백 함수를 담아 실행이 밀리는 현상을 감소시키는 작동원리를 학습했다. 추가적으로 CPU나 GPU 사용량 여부에 따른 콜백 함수의 실행 순서에 대해서도 학습하였다. 기업에서 실제 사용하는 서비스의 일부분을 구현하며 직간접적으로 임직원의 피드백을 받을 수 있었다는 점이 좋았다. 현업에서 요구하는 페이지의 퀄리티를 만들어내기 위해서는 개발에 앞서 컴포넌트의 구조를 정확하게 설계해야 한다는 점을 절실히 느꼈다. 리팩토링을 통해 데이터 전달 과정을 최적화하며 해당 부분에 대해 깊게 고민해볼 계획이다. |
| <a href="https://github.com/HHongmoris"><img src="https://avatars.githubusercontent.com/u/122426101?v=4?s=100" width="100px;" alt=""/> |                                                              |
| <a href="https://github.com/minsoon025"><img src="https://avatars.githubusercontent.com/u/112068306?v=4?s=100" width="100px;" alt=""/> | **김민태**<br /> 경주마 조각투자 거래 플랫폼이라는 흥미로운 주제를 가지고 프로젝트를 진행하는 일은 즐거운 일이였습니다. 매일 개발 방향성을 얘기하고 진행했던 점이 좋은 결과를 가져오지 않았나 싶으며, 직접 구현하고 싶었던 기능인 생체인증은 뿌듯함을 가져왔습니다. 처음 사용하는 코틀린 언어는 자바와 유사해 빠르게 익숙해 졌던 것도 신기한 경험이였습니다. |
| <a href="https://github.com/HHongmoris"><img src="https://avatars.githubusercontent.com/u/122426101?v=4?s=100" width="100px;" alt=""/> | **홍성민**<br />  팀원들이 자유롭게 의견을 나누고 원활한 피드백이 프로젝트에 많은 도움이 되 |
