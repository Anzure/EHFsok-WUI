# Stage 1: Build production files
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# Stage 2: Copy builded files to webserver
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Stage 3: Copy default webserver configuration file
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

# Building command:
#docker build -t ehfsok-wui .

# Run command:
#docker run -p 5000:80 ehfsok-wui
