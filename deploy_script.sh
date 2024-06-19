#!/bin/bash

# Navegue até o diretório do seu projeto
cd face-recognition-engine/

GIT_SSH_COMMAND="ssh -i /home/ubuntu/.ssh/id_rsa -o StrictHostKeyChecking=no" git pull origin main

## Instalar dependências clean install (ci)
npm ci

## Roda o build e cria uma pasta dist
npm run build

## Faz a migração de forma segura para o banco de Prod
npx prisma db push

## Reiniciar o serviço (Considerando que já esteja rodando)
sudo systemctl restart recog.service
