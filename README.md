# Strascrous API

API TypeScript pour consulter les restaurants, cafétérias et menus CROUS. Elle récupère les données de CROUS Mobile et les met en cache.

## Prérequis
- Node.js 22+ recommandé 
- Git 
- Une instance Valkey


## Installation
```sh
npm install
```

Copier le fichier d’exemple, puis adapter les valeurs à votre environnement :
```sh
cp .env.example .env
```

```sh
npm run dev
```

Le serveur démarre sur **http://localhost:3000**.

## Production

```sh
npm run build
npm start
```

`npm start` ne charge pas `.env`. Fournir les variables via l’environnement ou lancer :
```sh
node --env-file=.env dist/index.js
```

## Variables d'environnement

| Variable | Description | Exemple |
| --- | --- | --- |
| `VALKEY_URL` | URL de connexion à Valkey | `valkey://127.0.0.1:6379` |
| `VALKEY_APP_ID` | Préfixe des clés de cache de l’application | `strascrous-api` |

## API
| Route | Description |
| --- | --- |
| `/` | État du serveur HTTP |
| `/cities` | Villes prises en charge |
| `/restaurants?city=<cityId>` | Restaurants d’une ville |
| `/restaurants/:id` | Menus d’un restaurant |

## Organisation du projet
```text
src/
├── index.ts                  # Démarrage du serveur
├── crous/                    # Données CROUS
├── helpers/                  # Utilitaires
├── infrastructure/           # Connexion à Valkey
├── repositories/             # Gestion du cache
├── routes/                   # Routes HTTP
└── services/                 # Logique métier
```

## Licence
Ce projet est sous [licence MIT](LICENSE).
