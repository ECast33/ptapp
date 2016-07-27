DROP PROCEDURE IF EXISTS sp_Client_BuilderOne

-- GO;

CREATE PROCEDURE sp_Client_BuilderOne
(
    IN pClientName       Varchar(255)
,	IN pClientId         INT
)
this_proc:BEGIN

    SELECT *

    FROM
        clients
    WHERE
        name = pClientName;
END