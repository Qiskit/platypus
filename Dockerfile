FROM node:14.15.0-buster

# # Install Python
RUN \
  apt-get update && \
  apt-get install -y python3-pip && \
  rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /
RUN mkdir platypus
WORKDIR /platypus

# Copy everything
COPY . .

# Install converter requirements
WORKDIR /platypus/textbook-converter
RUN pip3 install -r requirements.txt

# Install Node.js requirements
WORKDIR /platypus
RUN npm install
WORKDIR /platypus/textbook-ui
RUN npm rebuild node-sass

# Build
WORKDIR /platypus
RUN npm run build

# Expose Node.js port
EXPOSE 5000

CMD [ "npm", "run", "start" ]
