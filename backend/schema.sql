-- backend/schema.sql

-- Agar 'posts' table pehle se hai, to usko delete kar do
DROP TABLE IF EXISTS posts;

-- Naya 'posts' table banao
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- Har post ki ek unique ID, jo apne aap badhegi
  title TEXT NOT NULL,                  -- Post ka title, khali nahi ho sakta
  content TEXT NOT NULL,                -- Post ka content, khali nahi ho sakta
  image_url TEXT NOT NULL,              -- Image ka path/URL, khali nahi ho sakta
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Post kab bana, apne aap set ho jayega
);