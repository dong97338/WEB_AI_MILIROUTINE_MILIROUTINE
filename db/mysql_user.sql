CREATE USER 'miliroutine_developer'@'%' IDENTIFIED WITH mysql_native_password BY '2022MySQL!@';
GRANT ALL PRIVILEGES ON miliroutine_db.* TO miliroutine_developer@'%';
FLUSH PRIVILEGES;