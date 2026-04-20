# ---------- STEP 1: Build ----------
FROM maven:3.9.9-eclipse-temurin-8 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests


# ---------- STEP 2: Run ----------
FROM eclipse-temurin:8-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
