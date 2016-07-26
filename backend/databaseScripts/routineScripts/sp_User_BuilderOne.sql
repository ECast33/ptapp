DROP PROCEDURE IF EXISTS sp_User_BuilderOne

-- GO;

CREATE PROCEDURE sp_User_BuilderOne
(
    IN pUserName         Varchar(255)
,	IN pPassword         Varchar(255)
,   IN userId            INT
)
this_proc:BEGIN

    SELECT *

    FROM
        users
    WHERE
        userName = pUserName
    AND password = pPassword;
END