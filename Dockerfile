FROM node:14.5
COPY ./ /server
WORKDIR /server
RUN npm install

CMD ["npm", "start"]
