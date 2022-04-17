# -------- Builder stage --------
FROM node:16.3.0-alpine3.11 as builder

WORKDIR /builder

COPY . ./

RUN yarn install --frozen-lockfile
RUN yarn build

# -------- Final stage --------
FROM node:16.3.0-alpine3.11

WORKDIR /app

COPY --from=builder /builder/package.json /app/
COPY --from=builder /builder/yarn.lock /app/
COPY --from=builder /builder/.env.prod /app/

COPY --from=builder /builder/packages/iremono-server/package.json /app/packages/iremono-server/
COPY --from=builder /builder/packages/iremono-server/dist /app/packages/iremono-server/dist

COPY --from=builder /builder/packages/iremono-util/package.json /app/packages/iremono-util/
COPY --from=builder /builder/packages/iremono-util/dist /app/packages/iremono-util/dist

COPY --from=builder /builder/packages/iremono-backend-core/package.json /app/packages/iremono-backend-core/
COPY --from=builder /builder/packages/iremono-backend-core/scripts /app/packages/iremono-backend-core/scripts
COPY --from=builder /builder/packages/iremono-backend-core/dist /app/packages/iremono-backend-core/dist

COPY --from=builder /builder/packages/iremono-web/dist /app/packages/iremono-web/dist

ENV NODE_ENV=production

RUN cd /app/packages/iremono-server && yarn install --frozen-lockfile

CMD yarn start
