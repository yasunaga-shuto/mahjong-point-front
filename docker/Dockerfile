FROM node:18.20.4-alpine AS base
WORKDIR /home/node/project
COPY ["./package.json", "./yarn.lock", "./"]
RUN apk add tzdata \
  && cp /usr/share/zoneinfo/Japan /etc/localtime \
  && yarn --frozen-lockfile --silent

FROM node:18.20.4-alpine
WORKDIR /home/node/project
COPY [".", "./"]
COPY --from=base /home/node/project/node_modules ./node_modules
COPY --from=base /etc/localtime /etc/localtime
RUN yarn build
CMD ["yarn", "start"]
