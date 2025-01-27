ARG RUN_IMAGE=node:22.12-alpine3.19
FROM node:22.12-alpine3.19 as prepare_deps

WORKDIR /home/web/code
COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./core/package.json ./core/package.json
RUN yarn install --network-timeout=300000

# LOCAL IMAGE
FROM $RUN_IMAGE as run_local
ARG SERVICE_DIR
COPY --from=prepare_deps /home/web/code /home/web/code
RUN apk update && apk add --no-cache ca-certificates && update-ca-certificates
WORKDIR /home/web/code/${SERVICE_DIR}
ENTRYPOINT ["yarn", "start:dev"]
