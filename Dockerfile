FROM node:14-stretch AS base
SHELL ["/bin/bash", "-c"]
RUN apt update

FROM base AS builder

ARG IBMID_CLIENT_ID
ARG IBMID_CLIENT_SECRET

WORKDIR /usr/app

COPY converter/textbook-converter/requirements.txt converter/textbook-converter/
RUN apt-get install -y g++ python3 python3-dev python3-pip python3-zmq python3-venv
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

RUN echo $IBMID_CLIENT_ID

RUN npm run setup:secrets -- --ibmClientId $IBMID_CLIENT_ID

RUN npm run build
# don't keep the notebooks
RUN find ./translations -type f -iname "*.ipynb" -delete

FROM base
WORKDIR /usr/app

COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/patches patches/
# npm ci --production is not working for some unknown reason
RUN npm install
COPY --from=builder /usr/app/server server/
COPY --from=builder /usr/app/config.yaml ./
RUN cat config.yaml
COPY --from=builder /usr/app/public public/
COPY --from=builder /usr/app/frontend frontend/
COPY --from=builder /usr/app/notebooks/toc.yaml notebooks/
COPY --from=builder /usr/app/working working/
COPY --from=builder /usr/app/translations translations/

CMD ["npm", "start"]
