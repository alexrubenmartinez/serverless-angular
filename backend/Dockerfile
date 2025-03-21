FROM node:20

# Instalar Serverless Framework globalmente
RUN npm install -g serverless

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto que usará Serverless Offline
EXPOSE 3000

# Comando para ejecutar Serverless Offline
CMD ["serverless", "offline", "--host", "0.0.0.0"]