
# FROM node:14

# WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

# COPY package.json /app/
# COPY package-lock.json /app/
# RUN apt-get update && \
#     apt-get install -y ghostscript && \
#     apt-get clean
# RUN npm install

# COPY . /app
# RUN npm run build
# # start app
# CMD [ "npm", "start" ]

FROM node:lts-alpine
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      ghostscript \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false

COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

COPY . /app
RUN npm run build
EXPOSE 8080

CMD ["npm", "start"]