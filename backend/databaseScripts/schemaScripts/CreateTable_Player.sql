CREATE TABLE IF NOT EXISTS  player (
	playerId 					Int(10) unsigned 	NOT NULL AUTO_INCREMENT
,	name        				Varchar(255)        NOT NULL DEFAULT ''
,	sport        				Varchar(255)        NOT NULL DEFAULT ''
,	PRIMARY KEY ( playerId )
)