#!/bin/bash

echo "change directory to /app/"
cd /app/
echo "installing schema..."
mysql -uroot -p$MYSQL_ROOT_PASSWORD < schema.sql
echo "creating mysql user for miliroutine_db..."
mysql -uroot -p$MYSQL_ROOT_PASSWORD < mysql_user.sql
echo "inserting dummy user..."
mysql -uroot -p$MYSQL_ROOT_PASSWORD < dummy/user.sql
echo "inserting dummy user_category..."
mysql -uroot -p$MYSQL_ROOT_PASSWORD < dummy/user_category.sql
echo "inserting dummy routine..."
mysql -uroot -p$MYSQL_ROOT_PASSWORD < dummy/routine.sql
echo "inserting dummy user_routine..."
mysql -uroot -p$MYSQL_ROOT_PASSWORD < dummy/user_routine.sql
echo "inserting dummy auth..."
mysql -uroot -p$MYSQL_ROOT_PASSWORD < dummy/auth.sql
echo "inserting dummy goods..."
mysql -uroot -p$MYSQL_ROOT_PASSWORD < dummy/goods.sql
echo "inserting dummy user_goods..."
mysql -uroot -p$MYSQL_ROOT_PASSWORD < dummy/user_goods.sql
echo "Success!"