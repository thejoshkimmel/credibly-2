SELECT 
    r.id as rating_id,
    r.category,
    r.score,
    r.comment,
    r.created_at,
    u.username as rater_username,
    u.email as rater_email
FROM ratings r
JOIN users u ON r.rater_id = u.id
WHERE r.rated_user_id = :user_id
ORDER BY r.created_at DESC; 