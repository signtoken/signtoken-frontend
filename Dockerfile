# production stage
FROM nginx:1.17-alpine as production-stage
COPY /build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]