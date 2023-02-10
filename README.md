# API VENDAS

## Como Roda


Primeiramente configuramos arquivo ormconfig.json

```json
{
    "type":"postgres",
    "host":"localhost",
    "port":5432,            //padrão do postgres
    "username":"postgres",
    "password":"password",    //opcional postgres
    "database":"apivendas",
    "migrations":[
        "./src/shared/typeorm/migrations/*.ts"
    ],
    "cli":{
        "migrationsDir":"./src/shared/typeorm/migrations"
    }
}
```

*Após isso observe que já esta chamando o createConnection do typeorm, na src/shared/typeorm/index.ts e sendo chamado para configuração raiz do nosso projeto no src/shared/http/serve.ts.*

Com a configuração acima pronta iremos agora cria nossa imagem docker.

Basta roda o comando.

- caso queria roda já configurando password.
```docker
    docker run --name apivendas -e POSTGRES_PASSWORD=password -p 5437:5432 -d postgres

```
- sem o password

```docker
    docker run --name apivendas -p 5437:5432 -d postgres

```

Antes de roda o migrate:run, necesarios instalar a extensão uuid_ossp

> Pronto, seu banco de dados esta configurado para roda o projeto, rode as migrate e se divitar ;D.
