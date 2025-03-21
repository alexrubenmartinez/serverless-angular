CREATE DATABASE IF NOT EXISTS campaign_db;
USE campaign_db;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    status BOOLEAN NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    process_date DATE NOT NULL,
    process_hour TIME NOT NULL,
    process_status TINYINT NOT NULL DEFAULT 1,
    phone_list VARCHAR(255) NOT NULL,
    message_text TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id INT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    text TEXT NOT NULL,
    shipping_status TINYINT NOT NULL DEFAULT 1,
    process_date DATE NOT NULL,
    process_hour TIME NOT NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);


INSERT INTO customers (name, status) VALUES ('Customer Test', TRUE);

INSERT INTO users (customer_id, username, status) VALUES (1, 'test_user', TRUE);