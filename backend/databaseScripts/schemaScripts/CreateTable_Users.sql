CREATE TABLE IF NOT EXISTS  users (
	userId   					Int(10) unsigned 	NOT NULL AUTO_INCREMENT
,	userName      				Varchar(255)        NOT NULL DEFAULT ''
,	password       				Varchar(255)        NOT NULL DEFAULT ''
,	PRIMARY KEY ( userId )
)