FROM node:20

WORKDIR /app

# Copy package files
COPY ./website/package.json ./
COPY ./website/package-lock.json ./

# Install dependencies with verbose logging
RUN npm install --legacy-peer-deps --loglevel verbose

ARG DOMAIN_CONFIG_PATH

ENV DOMAIN_CONFIG_PATH=$DOMAIN_CONFIG_PATH

EXPOSE 3000

CMD ["npm", "run", "dev"] 