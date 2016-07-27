CREATE TABLE IF NOT EXISTS  clients (
	clientId 					Int(10) unsigned 	NOT NULL AUTO_INCREMENT
,	name        				Varchar(255)        NOT NULL DEFAULT ''
,	email        				Varchar(255)        NOT NULL DEFAULT ''
,	phone        				Varchar(255)        NOT NULL DEFAULT ''
,	age         				INT(11)             NOT NULL DEFAULT '0'
,	height         				Varchar(255)        NOT NULL DEFAULT ''
,	weight         				Int(11)             NOT NULL DEFAULT '0'
,	PRIMARY KEY ( clientId )
)