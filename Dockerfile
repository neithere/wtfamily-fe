# See also:
#  * https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html
#  * https://shekhargulati.com/2019/01/18/dockerizing-a-vue-js-application/

FROM node:alpine

LABEL maintainer="Andy Mikhaylenko <neithere@gmail.com>"

# for static content
RUN yarn global add http-server

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# FIXME this overrides yarn.lock
COPY . .

CMD ["yarn", "run", "build"]

# serve via http-server
CMD ["http-server", "dist"]
