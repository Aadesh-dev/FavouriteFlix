# ---------- STEP 1: Build ----------
FROM maven:3.9.9-eclipse-temurin-8 AS build

WORKDIR /app

# Copy only backend code (important for monorepo)
COPY favouriteflix-backend/pom.xml .
COPY favouriteflix-backend/src ./src

# Build the jar
RUN mvn clean package -DskipTests


# ---------- STEP 2: Run ----------
FROM eclipse-temurin:8-jdk

WORKDIR /app

# Copy built jar from previous stage
COPY --from=build /app/target/*.jar app.jar

# Render uses dynamic PORT
ENV PORT=8080

EXPOSE 8080

# Run app
CMD ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]