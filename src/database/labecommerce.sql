-- Active: 1681046257349@@127.0.0.1@3306
-- ciação da tabela users --

CREATE TABLE users(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- POPULANDO A TABELA --

    INSERT INTO users (id, name, email, password)
    VALUES
    ("u001", "Maria", "maria@gmail.com", "12345"),
    ("u002", "José", "jose@gmail.com", "54321"),
    ("u003", "Rafaela", "rafaela@email.com", "11223344");

-- criação tabela products

CREATE TABLE products(
    id TEXT  NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

-- populando a tabela--

INSERT INTO products(id, name, price, category)
VALUES
("P001", "Iphone", 1000, "Eletrônicos"),
("P002", "Calça Jeans", 150, "Roupas e calçados"),
("P003", "Boné masculino", 75.63, "Acessórios"),
("P004", "Notebook 17 Polegadas", 4500, "Eletrônicos"),
("P005", "Camiseta NBA Dallas Mavericks", 140.22, "Roupas e calçados");
