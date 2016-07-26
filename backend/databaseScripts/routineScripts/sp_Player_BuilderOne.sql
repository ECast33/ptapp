DROP PROCEDURE IF EXISTS sp_Player_BuilderOne

-- GO;

CREATE PROCEDURE sp_Player_BuilderOne
(
    IN pPlayerName       Varchar(255)
,	IN pPlayerSport      Varchar(255)
,	IN pPlayerId         INT
)
this_proc:BEGIN

    SELECT
        playerId
    ,   name
    ,   sport
    FROM
        player
    WHERE
        playerId = pPlayerId;
END