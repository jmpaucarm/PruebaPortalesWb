## ODC Web



### Installation

Clone repository:
```sh
git clone https://github.com/portalesit/opendevcore-web.git
```
Before running:
```sh
npm set registry http://10.10.0.42:4873
npm install
```


## Run

### Local test

```sh
npm i
npm link %module%
npm start
```

### Production build

```sh
npm run build
```

### Docker multi-stage build

```sh
docker build -t 10.10.1.109:5000/odc-web:v1.0-alpha .
docker run -d --name odc-web -it -p 8090:5000 --restart=always 10.10.1.109:5000/odc-web:v1.0-alpha
```

### Production build and publish in nginx docker container

```sh
npm run build
docker build -f Dockerfile.nginx -t 10.10.1.109:5000/odc-web:v1.0-alpha .
docker run -d --name odc-web -p 8091:80 --restart=always 10.10.1.109:5000/odc-web:v1.0-alpha
```

### Aditional Libraries to install

```sh
npm i filepond react-filepond filepond-plugin-file-rename filepond-plugin-file-validate-type filepond-plugin-get-file filepond-plugin-image-overlay filepond-plugin-image-preview
npm i @aspnet/signalr@^3.0.0-preview6.19307.2
```
