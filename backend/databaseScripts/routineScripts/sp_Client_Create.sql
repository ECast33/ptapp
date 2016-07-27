DROP PROCEDURE IF EXISTS sp_Client_Create

-- GO;

CREATE PROCEDURE sp_Client_Create
(
    IN pClientName       Varchar(255)
,	IN pClientEmail      Varchar(255)
,	IN pClientPhone      Varchar(255)
,	IN pClientAge        INT
,	IN pClientHeight     Varchar(255)
,	IN pClientWeight     INT
)
this_proc:BEGIN

DECLARE pClientId 	    Int DEFAULT 0;

INSERT INTO clients
(
    name
,   email
,   phone
,   age
,   height
,   weight
)VALUES
(
    pClientName
,   pClientEmail
,   pClientPhone
,   pClientAge
,   pClientHeight
,   pClientWeight
);
SET pClientId = LAST_INSERT_ID();

CALL sp_Client_BuilderOne( pClientName, pClientId );

END
