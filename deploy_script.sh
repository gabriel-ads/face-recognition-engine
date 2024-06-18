#!/bin/bash
#
## Navegar até o diretório da aplicação
cd face-recognition-engine/
#
## Atualizar o repositório
git pull https://$BITBUCKET_USERNAME:$BITBUCKET_APP_PASSWORD@bitbucket.org/smartstaff/face-recognition-engine/src/main/
#
## Instalar dependências clean install (ci)
npm ci
#
## Roda o build e cria uma pasta dist
npm run build
#
## Faz a migração de forma segura para o banco de Prod
npx prisma db push
#
## Reiniciar o serviço (Considerando que já esteja rodando)
sudo systemctl restart recog.service