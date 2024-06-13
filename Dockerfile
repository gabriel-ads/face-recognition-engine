FROM node:20-14
RUN npm ci && npm run build && prisma db push
RUN npm rum start
EXPOSE 3000