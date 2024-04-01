#
# Build
#
FROM maven:3.6.0-jdk-11-slim AS build

# WORKDIR /home/api
# COPY ./ ./
# RUN mvn -f /pom.xml clean package

COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package


FROM openjdk:11-jre-slim 
COPY --from=build /home/app/target/participantManagerApi-0.1.0-SNAPSHOT.jar /usr/local/lib/api.jar 
ENTRYPOINT ["java" ,"-jar","/usr/local/lib/api.jar"]