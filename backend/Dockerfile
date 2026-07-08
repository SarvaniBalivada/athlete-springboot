# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy build files first to leverage Docker layer caching
COPY pom.xml .
COPY mvnw .
COPY .mvn/ .mvn/

# Copy source
COPY src ./src

# Make the Maven wrapper executable and build the jar (skipping tests)
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

# ---- Run stage ----
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
