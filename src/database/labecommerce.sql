-- Active: 1681046257349@@127.0.0.1@3306
-- ciação da tabela users --

CREATE TABLE users(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL
);

DROP TABLE users;


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
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

DROP TABLE products;

-- populando a tabela--

INSERT INTO products (id, name, price, category, description, "imageUrl")
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
WHERE name LIKE  "%Boné%";

-- Create user --
INSERT INTO users (id, name, email, password)
VALUES
("u004", "Rodolfo", "rodolfo@gmail.com", "554466");

-- Create product --

INSERT INTO products (id, name, price, category, description, imageUrl)
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
SET id = "P001",
    name = "Playstation 5",
    price = 4778.66,
    category = "Eletrônicos"
WHERE id = "P010";

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
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,    
    created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

DROP Table purchases;

INSERT INTO purchases (id,total_price,paid,created_at,delivered_at,buyer_id)
VALUES
("Ped001", 14057.32, 0, NULL, NULL, "u001"), -- 2 play 5 + 1 notebook
("Ped002", 584.4 , 0, NULL, NULL, "u002"), --3 calças jeans + 3 camisetas
("Ped003", 5081.58, 0, NULL, NULL, "u002"), -- 4 bonés + playstation
("Ped004", 280.44, 0, NULL, NULL, "u001" ), -- 2 camisetas dallas
("Ped005", 19062.87, 0, NULL, NULL, "u003"), -- 1 notebook + 4 play + 3 bonés
("Ped006", 300, 0, NULL,NULL, "u003"); --  2 clças

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

-- tabela de relação de produtos e pedidos

CREATE TABLE purchase_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE purchase_products;

--OBS: acjo que na tabelça pruchase, eu tenho que fazer um unico pedido com o valor total de todos osprodutos do pedido, eu fiz umpedido pra cada produto
-- OBS2: fiz isso na tabela purchases, coloquei alguns pedidos com mais de um produto

INSERT INTO purchase_products (purchase_id, product_id, quantity)
VALUES
("Ped001", "P001", 2),
("Ped001", "P004", 1),
("Ped002", "P002", 3),
("Ped002", "P005", 3),
("Ped003", "P003", 4),
("Ped003", "P001", 1 ),
("Ped004", "P005", 2 ),
("Ped005", "P004", 1 ),
("Ped005", "P001", 4 ),
("Ped005", "P003", 3 ),
("Ped006", "P002", 2 );


SELECT * FROM purchase_products
INNER JOIN purchases
ON purchase_products.purchase_id = purchases.id
INNER JOIN products
ON purchase_products.product_id = products.id;







