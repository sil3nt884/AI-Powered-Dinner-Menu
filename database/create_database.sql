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
