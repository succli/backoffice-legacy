FROM node:8

EXPOSE 3000

COPY . /opt/app
WORKDIR /opt/app
ADD . /opt/app

RUN npm install
CMD npm run-script prod