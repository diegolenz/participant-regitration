#FROM maven:3.6.0-jdk-11-slim AS build
#COPY src /api/src
#COPY pom.xml /api
#RUN mvn -f /api/pom.xml clean package

FROM adoptopenjdk:11-jre-hotspot
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java", "-jar", "application.jar"]