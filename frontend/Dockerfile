FROM node:16

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto que usará Angular
EXPOSE 4200

# Comando para ejecutar Angular
CMD ["npm", "start"]