SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;

//copilot suggestion
SELECT employees_db.department AS department, 
    employees_db.role AS role, 
    employees_db.employee AS employee