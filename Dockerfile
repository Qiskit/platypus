FROM alpine:3 AS base
RUN apk add --update nodejs npm

FROM base AS builder
WORKDIR /usr/app

COPY package*.json .
RUN npm ci

COPY requirements.txt .
RUN apk add --no-cache g++ linux-headers python3 python3-dev py3-pip py3-pyzmq
RUN python3 -m venv .venv && source .venv/bin/activate
RUN python3 -m pip install -U pip \
  && python3 -m pip install -r requirements.txt

COPY converter converter
COPY frontend frontend
COPY notebooks notebooks
COPY server server
COPY shared shared
COPY config.yaml .
RUN npm run build

FROM base
WORKDIR /usr/app

ENV PORT=5000
EXPOSE 5000

COPY --from=builder /usr/app/package*.json .
RUN npm ci --production
COPY --from=builder /usr/app/public public
COPY --from=builder /usr/app/server server
COPY --from=builder /usr/app/config.yaml .

CMD ["npm", "start"]