FROM 10.122.140.1:8082/acm/nginx-server:1.21.5
MAINTAINER wangyy32 <wangyy32@lenovo.com>
COPY dist /usr/share/nginx/html
EXPOSE 80
