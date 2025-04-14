# App Gamified - Evolução Pessoal e Gamificação de Treino

Este projeto é uma aplicação web gamificada inspirada no universo de evolução pessoal e RPG, onde o usuário cria sua conta, define suas configurações (nome de usuário, tipo de treino e experiência de treino) e, a partir disso, recebe missões diárias (por exemplo, flexões, agachamentos, abdominais, corrida e leitura) para acumular pontos de experiência (XP) e evoluir seu personagem.

## Features

- **Cadastro e Login:**  
  Permite que o usuário registre sua conta e efetue login com segurança utilizando JWT e cookies.

- **Configuração Inicial:**  
  Após o cadastro, o usuário é direcionado para configurar:
  - Seu nome de usuário.
  - Seu tipo de treino (academia ou casa/rua).
  - Sua experiência de treino (beginner, regular ou advanced).  
  Essas configurações definem as metas diárias personalizadas para os exercícios.

- **Geração de Missões Diárias:**  
  A aplicação gera missões diárias baseadas nos dados do usuário, e exibe um timer que reseta à meia-noite para que novas missões sejam geradas diariamente.

- **Registro do Treino Diário:**  
  O usuário registra os dados do seu treino (quantidade de flexões, agachamentos, abdominais e distância percorrida na corrida).  
  - Os registros diários são acumulados (caso o usuário registre mais de uma vez no mesmo dia, os valores são somados até o máximo permitido, que é o dobro da meta definida para cada exercício).

- **Sistema de Pontos e XP:**  
  A partir do desempenho do usuário, o sistema calcula pontos para atributos como Força e Agilidade e acumula XP para subir de nível.  
  A evolução do XP segue um modelo de progressão com metas dinâmicas baseadas na experiência (utilizando metas obtidas da tabela `workout_goals`).

- **Dashboard:**  
  Um painel que exibe as estatísticas do usuário (XP, nível, atributos) e as missões diárias, além de permitir o registro do treino.

## Tecnologias Utilizadas

- **Frontend:**  
  - React.js (com Vite)  
  - Tailwind CSS  
  - Zustand para gerenciamento de estado global

- **Backend:**  
  - Node.js com Express  
  - PostgreSQL como banco de dados  
  - JWT para autenticação  
  - Bibliotecas como bcrypt para hashing de senhas