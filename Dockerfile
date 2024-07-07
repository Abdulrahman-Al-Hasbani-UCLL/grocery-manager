# Stage 1: Build the backend
FROM maven:3.8.4-openjdk-17 as backend-builder
WORKDIR /app
# Copy the pom.xml and source code
COPY grocery-manager/Grocery-Manager_Backend/pom.xml /app/
COPY grocery-manager/Grocery-Manager_Backend/src /app/src
# Build the application
RUN mvn clean package

# Stage 2: Build the frontend
FROM node:14 as frontend-builder
WORKDIR /app
# Copy the frontend files
COPY grocery-manager/Grocery-Manager_Frontend/ /app/
# Install dependencies and build the frontend
RUN npm install && npm run build

# Stage 3: Prepare the final image
FROM openjdk:17
WORKDIR /app
# Copy the backend jar from the backend-builder stage
COPY --from=backend-builder /app/target/grocery-manager-1.0-SNAPSHOT.jar /app/
# Copy the built frontend files from the frontend-builder stage
COPY --from=frontend-builder /app/dist /app/public
# Expose the port the application runs on
EXPOSE 8080
# Command to run the application
CMD ["java", "-jar", "grocery-manager-1.0-SNAPSHOT.jar"]