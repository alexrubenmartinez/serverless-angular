# 1. Etapa de compilación
FROM node:20 AS build

WORKDIR /app

# Copia los archivos y configura dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el código fuente y compila Angular (usando --configuration production)
COPY . .
RUN npm run build --configuration frontend

# 2. Etapa de producción con Nginx
FROM nginx:alpine

# Copia la configuración de Nginx personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/frontend/ .

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
