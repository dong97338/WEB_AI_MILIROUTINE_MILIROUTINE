FROM mysql:8.0

WORKDIR /app
COPY /dummy ./dummy
COPY schema.sql .
COPY mysql_user.sql .
COPY my.cnf /etc
RUN chmod 755 /etc/my.cnf
COPY init.sh /docker-entrypoint-initdb.d/