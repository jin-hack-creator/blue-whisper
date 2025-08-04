CREATE OR REPLACE FUNCTION get_private_conversation(user_1 uuid, user_2 uuid)
RETURNS TABLE(id uuid) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id
    FROM conversations c
    JOIN participants p1 ON c.id = p1.conversation_id
    JOIN participants p2 ON c.id = p2.conversation_id
    WHERE c.name IS NULL
      AND p1.user_id = user_1
      AND p2.user_id = user_2;
END;
$$ LANGUAGE plpgsql;