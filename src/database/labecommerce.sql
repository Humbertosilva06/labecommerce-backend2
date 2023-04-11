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

-- Get all Users--
SELECT * FROM users;

-- Get all products --
SELECT * FROM products;

-- Search products by name --

SELECT * FROM products
WHERE name LIKE "%Boné%";

-- Create user --
INSERT INTO users (id, name, email, password)
VALUES
("u004", "Rodolfo", "rodolfo@gmail.com", "554466");

-- Create product --

INSERT INTO products(id, name, price, category)
VALUES
("P006", "Brinco feminino", 5.12, "Acessórios");

-- Get prodcuts by id --
SELECT * FROM products
WHERE id = "P002";

-- Delete user by ID --
DELETE FROM users
WHERE id = "u004";

-- Delete product by id --

DELETE FROM products
WHERE id = "P006";

-- Edit user by id --
UPDATE users
SET id = "u002",
    name = "Josefina",
    email = "Josefina@josefina.com.br",
    password = "778899"
WHERE id = "u010";

-- edit product by id--

UPDATE products
SET id = "P010",
    name = "Playstation 5",
    price = 4778.66,
    category = "Eletrônicos"
WHERE id = "P001";

-- Get all users ordenado por email crescente --
SELECT * FROM users
ORDER BY email ASC;

-- Geat all products versão 1: ordenado pela coluna price em ordem crescente; limita o resultado em 20 items iniciando pelo primeiro --

SELECT * FROM products
ORDER BY price ASC
LIMIT 20;

-- Get all products versão 2: seleção de um intevalo depreços (entre 100 e 300 por exemplo); retorna todos os produtos dentro do intervalo em ordem crescente

SELECT * FROM products
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;

-- criação da tabela de pedidos --

CREATE TABLE purchases(
    id TEXT UNIQUE NOT NULL PRIMARY KEY,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    created_at TEXT,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP Table purchases;

INSERT INTO purchases (id,total_price,paid,created_at,delivered_at,buyer_id)
VALUES
("Ped001", 149.78, 0, NULL, NULL, "u001"),
("Ped002", 1456.98, 0, NULL, NULL, "u002"),
("Ped003", 55.30, 0, NULL, NULL, "u002"),
("Ped004", 1200.24, 0, NULL, NULL, "u001" );

UPDATE purchases
SET delivered_at = DATETIME()
WHERE id = "Ped003";


SELECT
    users.id,
    users.name,
    purchases.id,
    purchases.buyer_id,
    purchases.total_price,
    purchases.created_at,
    purchases.delivered_at,
    purchases.paid     
FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE buyer_id = "u002";

