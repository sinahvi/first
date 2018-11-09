FROM arm32v6/alpine
RUN apk add node
COPY . .
EXPOSE 8080
CMD ["node","server.js"]
