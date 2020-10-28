FROM node:12 AS build

RUN groupadd -r app \
    && useradd --no-log-init -r -g app app\
    && mkdir -p /usr/src\
    && chown app:app /usr/src
WORKDIR /usr/src
ARG APP_NAME
COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY packages/ ./packages/
COPY ${APP_NAME}/ ./${APP_NAME}
RUN CI=DOCKER yarn install --frozen-lockfile
ENV NODE_ENV="development"
RUN yarn --cwd ${APP_NAME} build:prod
RUN CI=DOCKER\
    yarn --cwd ${APP_NAME} install --production --frozen-lockfile

FROM node:12-slim
ARG APP_NAME
RUN groupadd -r app \
    && useradd --no-log-init -r -g app app\
    && mkdir -p /usr/src\
    && chown app:app /usr/src
USER app:app
WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=build /usr/src/node_modules/ ./node_modules
COPY --from=build /usr/src/dist/${APP_NAME}.js ./dist/app.js

EXPOSE 3000
CMD ["node", "/usr/src/dist/app.js"]
