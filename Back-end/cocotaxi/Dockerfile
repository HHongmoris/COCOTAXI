FROM adoptopenjdk/openjdk11

# java 환경변수
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

COPY ./build/libs/cocotaxi-0.0.1-SNAPSHOT.jar ./app/cocotaxi-0.0.1-SNAPSHOT.jar

EXPOSE 9000

CMD ["java", "-jar", "/app/cocotaxi-0.0.1-SNAPSHOT.jar"]