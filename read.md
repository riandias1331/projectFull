//


//Docker

criar dockerfile no back e outro front
docker compose -build


alteraçoes: 
    pasta raiza/ back e front:     
        >>  docker compose down -v
        >> docker compose up --build


        --

        docker compose down -v   # para tudo + remove volumes (zera db local, se tiver)
        docker compose up --build   # rebuilda imagens e sobe novamente



docker compose up


docker hub:
docker tag 2243d88da92e riandias/projectfull-frontend:1.0
docker tag 07e7bb79dbb9 riandias/projectfull-backend:1.0


docker push riandias/projectfull-frontend:1.0
docker push riandias/projectfull-backend:1.0


Agora qualquer máquina com Docker pode baixar suas imagens:

docker pull riandias/projectfull-frontend:1.0
docker pull riandias/projectfull-backend:1.0


//Cloud - gcp
