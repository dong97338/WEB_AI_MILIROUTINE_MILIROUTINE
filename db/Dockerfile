FROM mysql:8.0

WORKDIR /app
COPY /dummy ./dummy
COPY schema.sql .
COPY mysql_user.sql .
COPY my.cnf /etc
COPY init.sh /docker-entrypoint-initdb.d/