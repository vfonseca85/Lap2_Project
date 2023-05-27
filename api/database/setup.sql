DROP TABLE IF EXISTS token CASCADE ;
DROP TABLE IF EXISTS user_account CASCADE;
DROP TABLE IF EXISTS item CASCADE;


CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE item (
    item_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    content VARCHAR (200) NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO item (title, content, price)
VALUES ('Playstation 5', 'The console is in a good condition, it does work without any issue', 400),
 ('Kettle', 'I am still using it and works like new', 40.5),
 ('Washing mashine', 'This machine is 3 years old and still washing', 54),
 ('4 Wood Chair', 'All 4 have been used a few times', 85),
 ('Table', 'Not using it anymore', 125)



