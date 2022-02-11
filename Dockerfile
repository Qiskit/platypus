FROM node:16-alpine AS builder

ARG IBMID_CLIENT_ID
ARG IBMID_CLIENT_SECRET
ARG MONGODB_URI

WORKDIR /usr/app

COPY converter/textbook-converter/requirements.txt converter/textbook-converter/
# py3-pyzmq is needed by pyyaml but pip is not able to compile it
RUN apk add --no-cache g++ linux-headers python3 python3-dev py3-pip py3-pyzmq
RUN python3 -m venv .venv && source .venv/bin/activate
RUN python3 -m pip install -U pip \
  && python3 -m pip install -r converter/textbook-converter/requirements.txt

COPY package*.json ./
COPY patches patches/
RUN npm ci

COPY converter converter/
COPY frontend frontend/
COPY server server/
COPY notebooks notebooks/
COPY translations translations/
COPY config.yaml ./

RUN npm run setup:secrets -- --mongo $MONGODB_URI --ibmClientId $IBMID_CLIENT_ID --ibmClientSecret $IBMID_CLIENT_SECRET
RUN npm run build
# only need to keep all the strings.yaml & *.md files
RUN find ./translations -type f ! -iname "*.yaml" -type f ! -iname "*.md" -delete

FROM node:16-alpine AS runtime

WORKDIR /usr/app

COPY --from=builder /usr/app ./

RUN npm prune --production

CMD ["npm", "start"]
