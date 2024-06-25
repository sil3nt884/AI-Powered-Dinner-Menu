CREATE TABLE RECIPES (
    ID uuid PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL UNIQUE ,
    URL VARCHAR(255) NOT NULL,
    OWNER VARCHAR(255) NOT NULL
);

CREATE TABLE INGREDIENTS (
    ID INT PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL
);


CREATE TABLE GENERATED_RECIPES (
    ID TEXT PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    INGREDIENTS TEXT [] NOT NULL,
    recipe_id uuid REFERENCES RECIPES(ID)
);


CREATE TABLE WEEKLY_DINNER (
    ID TEXT PRIMARY KEY,
    DATE DATE NOT NULL,
    RECIPE_ID uuid REFERENCES RECIPES(ID) NOT NULL
);



CREATE VIEW weekly_dinner_view AS
SELECT DISTINCT ON (DATE(wr.date), r.id) wr.recipe_id, r.name, r.url
FROM weekly_dinner wr
         JOIN recipes r ON r.id = wr.recipe_id
WHERE DATE(wr.date) >= (date_trunc('week', current_date) - INTERVAL '1 day')
  AND DATE(wr.date) < (date_trunc('week', current_date) + INTERVAL '7 days');


CREATE INDEX idx_recipes_name ON recipes(name);
CREATE INDEX idx_generated_recipes_recipe_id ON generated_recipes(recipe_id);
CREATE INDEX idx_weekly_dinner_date ON weekly_dinner(date);
CREATE INDEX idx_weekly_dinner_recipe_id ON weekly_dinner(recipe_id);
