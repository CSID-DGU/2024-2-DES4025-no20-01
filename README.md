<img src="https://github.com/user-attachments/assets/ef6967db-2ffa-4ce5-8b9c-5e2f60d21951">
<br>
<br>

# 🚁 BioCheck 소개

### 복지 서비스 부정 수급 방지를 위한 업무 관리 앱입니다.
- 위치 정보와 생체 데이터를 활용하여 출퇴근 시간을 정확히 기록합니다.
- 업무 활동의 신뢰성을 강화하고, 투명한 운영을 지원합니다.

<br>


## 📱 데모 영상
[🔗 영상 바로 가기](https://www.youtube.com/watch?v=K7tjSsUuAk8 "영상 바로 가기")

<br>


## 🎃 Team 이공없는 이공계팀

| 역할 | 이름 | 학번 | 전공 | 깃허브 |
|----| ----- | ----- | ----- | ----- |
| 팀장 | 홍원준 | 2019111661 | 컴퓨터공학전공 | price126 |
| 팀원 | 김수빈 | 2021110022 | 불교학부 | dewbeeny |
| 팀원 | 서하은 | 2022111923 | 컴퓨터공학전공 | haeun1107 |
| 팀원 | 이 설 | 2023113203 | 융합보안학과 | LEESEOL0403 |
| 팀원 | 임재현 | 2019111663 | 산업시스템공학과 | jaehyun-lim99 |

<br>


## 🍭 사용 기술

##### DESIGN
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

##### FRONTEND
<img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=Android&logoColor=white"> <img src="https://img.shields.io/badge/React Native-0095D5?&style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=Expo&logoColor=white"/>

##### BACKEND
<img src="https://img.shields.io/badge/Spring-228B22?style=for-the-badge&logo=Spring&logoColor=green"> <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=yellow"> <img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=Spring%20Security&logoColor=white"> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white">

##### DB
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">

##### CI/CD & DEVOPS
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=GitHub%20Actions&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/Jenkins-232F3E?style=for-the-badge&logo=Jenkins&logoColor=white">

##### TOOLS
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black"> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/Slack-4a154b?style=for-the-badge&logo=Slack&logoColor=white"/>

<br>


## 🎇 시스템 아키텍처

<details>
<summary> 📌 플로우 차트 </summary>
<img src="https://github.com/user-attachments/assets/6278e6a2-eafb-4b72-9959-8cfd736b53fb" width=800>
</details>

<details>
<summary> 📌 모듈 구성도 </summary>
<img src="https://github.com/user-attachments/assets/54fe8c52-8dfe-48ba-8437-c1583afdd433" width=800>
<img src="https://github.com/user-attachments/assets/c8a4ca7a-907d-4cef-8117-13dae349900c" width=800>
<img src="https://github.com/user-attachments/assets/2e24b2e5-2ccf-46d1-ad11-2710cf55e3cc" width=800>
<img src="https://github.com/user-attachments/assets/37d6816f-6972-460d-b9f0-a19bc147ad3a" width=800>
</details>

<details>
<summary> 📌 시퀀스 다이어그램 </summary>
<img src="https://github.com/user-attachments/assets/84526b39-086f-4bdf-be6e-613b5ddb842d" width=600>
<img src="https://github.com/user-attachments/assets/5b5d48d6-8872-441e-bba9-e6d3f1388d35" width=600>
<img src="https://github.com/user-attachments/assets/f69f4ee9-ce19-4e02-9e03-bd5d6c7d3a61" width=600>
</details>

<br>


## 📚 디렉토리 구조

<details>
<summary> Backend </summary>
<div markdown="1">

```
.
├─gradle
│  └─wrapper
└─src
    ├─main
    │  ├─java
    │  │  └─dgu
    │  │      └─notwenty
    │  │          ├─domain
    │  │          │  ├─auth
    │  │          │  │  ├─controller
    │  │          │  │  ├─converter
    │  │          │  │  ├─dto
    │  │          │  │  ├─service
    │  │          │  │  └─util
    │  │          │  ├─history
    │  │          │  │  ├─controller
    │  │          │  │  ├─converter
    │  │          │  │  ├─dto
    │  │          │  │  ├─entity
    │  │          │  │  ├─repository
    │  │          │  │  └─service
    │  │          │  ├─out
    │  │          │  │  ├─controller
    │  │          │  │  ├─converter
    │  │          │  │  ├─dto
    │  │          │  │  ├─entity
    │  │          │  │  ├─repository
    │  │          │  │  └─service
    │  │          │  ├─supply
    │  │          │  │  ├─controller
    │  │          │  │  ├─converter
    │  │          │  │  ├─dto
    │  │          │  │  ├─entity
    │  │          │  │  ├─repository
    │  │          │  │  ├─scheduler
    │  │          │  │  └─service
    │  │          │  ├─user
    │  │          │  │  ├─controller
    │  │          │  │  ├─converter
    │  │          │  │  ├─dto
    │  │          │  │  ├─entity
    │  │          │  │  ├─repository
    │  │          │  │  └─service
    │  │          │  └─work
    │  │          │      ├─controller
    │  │          │      ├─converter
    │  │          │      ├─dto
    │  │          │      ├─entity
    │  │          │      ├─repository
    │  │          │      └─service
    │  │          └─global
    │  │              ├─base
    │  │              │  └─status
    │  │              ├─config
    │  │              ├─converter
    │  │              ├─exception
    │  │              │  └─handler
    │  │              └─s3
    │  └─resources
    └─test
        └─java
            └─dgu
                └─notwenty

```

</div>
</details>

<details>
<summary> Frontend </summary>
<div markdown="1">

```
.
├─assets
└─src
    ├─assets
    ├─components
    ├─lib
    │  └─apis
    ├─navigation
    └─pages
```

</div>
</details>

<br>


## 🛸 주요 기능
<img src="https://github.com/user-attachments/assets/b4117bdf-5172-434b-8314-c10df4d03a7b">
<img src="https://github.com/user-attachments/assets/9f1a5dec-0ac4-47cd-b1dc-0882c7b67efb">
<img src="https://github.com/user-attachments/assets/f3932c4d-56bd-4277-8819-c54c90942788">
<img src="https://github.com/user-attachments/assets/fedfaa49-7689-4767-80de-5a62050c4a16">

