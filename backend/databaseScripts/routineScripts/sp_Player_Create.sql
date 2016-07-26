DROP PROCEDURE IF EXISTS sp_Player_Create

-- GO;

CREATE PROCEDURE sp_Player_Create
(
    IN pPlayerName       Varchar(255)
,	IN pPlayerSport      Varchar(255)
)
this_proc:BEGIN

DECLARE pPLayerId 	    Int DEFAULT 0;

INSERT INTO player
(
    name
,   sport
)VALUES
(
    pPlayerName
,   pPlayerSport
);
SET pPLayerId = LAST_INSERT_ID();

CALL sp_Player_BuilderOne(pPlayerName, pPlayerSport, pPlayerId );

END
