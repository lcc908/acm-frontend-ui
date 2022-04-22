FROM nginx
MAINTAINER wangyy32 <wangyy32@lenovo.com>
COPY / /usr/local/src/acm-frontend-ui/
RUN cd /usr/local/src/acm-frontend-ui/ && npm install -S &&npm run build && cp -arp dist/* /usr/share/nginx/html/
EXPOSE 80

