WITH user_ratings AS (
    SELECT 
        u.id,
        u.username,
        AVG(r.score) as average_score,
        COUNT(r.id) as total_ratings
    FROM users u
    LEFT JOIN ratings r ON u.id = r.rated_user_id
    GROUP BY u.id, u.username
    HAVING COUNT(r.id) >= 3  -- Only include users with at least 3 ratings
)
SELECT 
    username,
    ROUND(average_score::numeric, 2) as average_score,
    total_ratings
FROM user_ratings
ORDER BY average_score DESC
LIMIT 5; 