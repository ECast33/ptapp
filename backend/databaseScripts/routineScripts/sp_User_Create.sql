DROP PROCEDURE IF EXISTS sp_User_Create

-- GO;

CREATE PROCEDURE sp_User_Create
(
	IN pUserName        Varchar(255)
,	IN pPassword        Varchar(255)
)
this_proc:BEGIN

DECLARE pUserId 	    Int DEFAULT 0;

INSERT INTO users
(
    userName
,   password
)VALUES
(
    pUserName
,   pPassword
);
SET pUserId = LAST_INSERT_ID();

CALL sp_User_BuilderOne( pUserName, pPassword, pUserId );

END