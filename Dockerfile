# Build Stage
FROM maven:3.6.3-openjdk-11 AS build

WORKDIR /opt/app

COPY ./ /opt/app
RUN mvn clean install -DskipTests

# Docker Build Stage
FROM adoptopenjdk/openjdk11:alpine-slim

COPY --from=build /opt/app/target/*.jar app.jar

ENV PORT 8082
EXPOSE $PORT

ENTRYPOINT ["java","-jar","-Dserver.port=${PORT}","app.jar"]
