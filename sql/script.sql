-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS `idev2_jotinhaveiculos`;
USE `idev2_jotinhaveiculos`;

-- Criar tabela de tipos de usuários
CREATE TABLE IF NOT EXISTS `tipos_usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `telefone` VARCHAR(20) NULL,
  `senha` VARCHAR(255) NOT NULL,
  `tipo_id` INT NOT NULL,
  `cpf` VARCHAR(14) NOT NULL,
  `nascimento` DATE NOT NULL,
  `sexo` ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`email`),
  UNIQUE (`cpf`),
  FOREIGN KEY (`tipo_id`) REFERENCES `tipos_usuarios`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de status dos carros
CREATE TABLE IF NOT EXISTS `status_carros` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de tipos de carros
CREATE TABLE IF NOT EXISTS `tipos_carros` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de carros
CREATE TABLE IF NOT EXISTS `carros` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `marca` VARCHAR(50) NOT NULL,
  `modelo` VARCHAR(50) NOT NULL,
  `ano` INT NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `quilometragem` INT NOT NULL,
  `combustivel` VARCHAR(20) NOT NULL,
  `cambio` VARCHAR(20) NOT NULL,
  `cor` VARCHAR(30) NOT NULL,
  `ipva` VARCHAR(10) NOT NULL,
  `descricao` TEXT NULL,
  `imagem1` VARCHAR(255) NULL,
  `imagem2` VARCHAR(255) NULL,
  `imagem3` VARCHAR(255) NULL,
  `status_id` INT NOT NULL,
  `tipo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`status_id`) REFERENCES `status_carros`(`id`),
  FOREIGN KEY (`tipo_id`) REFERENCES `tipos_carros`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de interesses de agendamentos
CREATE TABLE IF NOT EXISTS `interesses_agendamentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `interesse` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`interesse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de agendamentos
CREATE TABLE IF NOT EXISTS `agendamentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_carro` INT NOT NULL,
  `data` DATETIME NOT NULL,
  'hora' VARCHAR(10) NOT NULL,
  `interesse_id` INT NOT NULL,
  `observacoes` TEXT NULL,
  `status_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`),
  FOREIGN KEY (`id_carro`) REFERENCES `carros`(`id`),
  FOREIGN KEY (`interesse_id`) REFERENCES `interesses_agendamentos`(`id`),
  FOREIGN KEY (`status_id`) REFERENCES `status_carros`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de destaques
CREATE TABLE IF NOT EXISTS `destaques` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_carro` INT NOT NULL,
  `descricao_curta` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`id_carro`),
  FOREIGN KEY (`id_carro`) REFERENCES `carros`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de status de propostas
CREATE TABLE IF NOT EXISTS `status_propostas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Criar tabela de propostas
CREATE TABLE IF NOT EXISTS `propostas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_carro` INT NOT NULL,
  `valor_oferecido` DECIMAL(10,2) NOT NULL,
  `status_id` INT NOT NULL,
  `estado_do_veiculo` INT NULL,
  `quilometragem` INT NULL,
  `descricao` TEXT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`),
  FOREIGN KEY (`id_carro`) REFERENCES `carros`(`id`),
  FOREIGN KEY (`status_id`) REFERENCES `status_propostas`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
