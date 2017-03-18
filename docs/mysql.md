##Installing mysql on cloud9
run the following commands to install DB 
```sh
$ mysql-ctl install
```
Run mysql with the following command 
```sh 
$ mysql-ctl cli
```
create the database
```sh 
mysql> CREATE DATABASE ptApp;
```
create the user 
```sh 
mysql> CREATE USER 'mobius1333'@'localhost' IDENTIFIED BY '1234QWER';
```
grant the provileges to the user 
```sh 
mysql> GRANT ALL PRIVILEGES ON ptApp.* TO 'mobius1333'@'localhost';
```