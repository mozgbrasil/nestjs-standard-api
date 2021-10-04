ARG VARIANT=12
FROM node:${VARIANT}

RUN mkdir -p /usr/app/src
WORKDIR /usr/app

COPY . /usr/app/
RUN npm install
RUN npm run build

CMD ["npm","run","start:prod"]
