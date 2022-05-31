# MusalaSoft Interview

### 📋 [Backend] Pre-requisites

### Technology

* Node.js v14+
* Yarn v1.22.18+
* Express v4.18.1
* Express-validator v6.14.1
* Mongoose v6.3.4
* Mongoose-unique-validator v3.0.0
* MongoDB

---

* Jest v28.1.0
* ESLint v8.16.0
* Prettier v2.6.2
* Git

---

### 🔧 Installation

1. Clone the repository:

``` 
git clone https://github.com/gcristia/musalasoft_interview.git
cd musalasoft_interview/backend
yarn install
```

2. Create .env file:

_.env.development_

```
NODE_ENV=development
HOST=127.0.0.1
PORT=3300
MONGO_DB=mongodb://localhost:27017/gateways
```

* 🚨 In _**MONGO_DB: ..../gateways**_ : means the name of the collection
* 🚨 _**.env.production**_  not created because on the deployment server it is configured in the environment variables, 
  but 
  for local tests it can be created without any problem

3. Scripts allowed in the application

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "set NODE_ENV=development&& node index.js",
    "prod": "set NODE_ENV=production&& node index.js",
    "format:check": "prettier --check .",
    "format:write": "prettier --write .",
    "lint:check": "eslint .",
    "lint:fix": "eslint --fix .",
    "test": "jest --verbose"
  }
}
```
* Example, how I'm using yarn :
```
yarn dev
```

### 🧪 Testing
```
yarn test
```

### 🚀 Deployment
The deployment is configured so that when you push to the main branch in the backend directory, [Vercel](https://vercel.com/) automatically deploys it

* 🚨 In Vercel the environment variables were configured 

![BACKEND - Environment Variables - VERCEL](https://github.
com/gcristia/musalasoft_interview/blob/main/docs/deploy/BACKEND-Environment-Variables-VERCEL.png?raw=true)

Is deployed to the following URL:
🌐  https://musalasoft-interview-backend.vercel.app

* 🚨 Try with an API platform, example Postman or just use the UI to test it on : 🌐  https://musalasoft-interview.vercel.app


---
⌨️ con ❤️ por [ghcristia](https://www.linkedin.com/in/gustavo-hurtado-cristia-b68195117) 😊
