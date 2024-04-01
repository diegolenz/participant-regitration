#FROM maven:3.6.0-jdk-11-slim AS build
#COPY src /api/src
#COPY pom.xml /api
#RUN mvn -f /api/pom.xml clean package

FROM maven:3.8.4-openjdk-11-slim AS build
# Set the working directory in the container
WORKDIR /app
# Copy the pom.xml and the project files to the container
COPY pom.xml .
COPY src ./src

FROM adoptopenjdk:11-jre-hotspot
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java", "-jar", "application.jar", "--spring.config.location=/opt/application.properties"]