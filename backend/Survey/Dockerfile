# Start with a base image containing Java runtime
FROM openjdk:17-jdk
# Add Author info
LABEL maintainer="ignuy"
# Add a volume to /tmp
VOLUME /tmp
# Make port 8020 available to the world outside this container
EXPOSE 8020
# The application's jar file
ARG JAR_FILE=./build/libs/Survey-0.0.1-SNAPSHOT.jar
# Add the application's jar to the container
COPY ${JAR_FILE} survey.jar
# Run the jar file
ENTRYPOINT ["java","-jar","-Duser.timezone=Asia/Seoul","/survey.jar"]
