FROM node
WORKDIR /home/foodres/services/email/app
COPY app /home/foodres/services/email/app
RUN npm install
CMD npm run start
EXPOSE 3000
ENV MY_NAME="John Doe"
ENV VERSION="1.0.0" BUILD="6a800e3d-3f48-4312-8e45-b52abc79907d"