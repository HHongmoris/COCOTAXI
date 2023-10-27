# 가져올 이미지를 정의
FROM node:18.18.2-alpine as builder
# 경로 설정하기
WORKDIR /app
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json .

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .

RUN npm install
RUN npm run build

# 5000번 포트 노출
EXPOSE 5000

ENV PATH /app/node_modules/.bin:$PATH

# npm start 스크립트 실행
CMD ["npm", "run", "dev"]