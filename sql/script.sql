-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 08/05/2025 às 15:07
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Crie e use o banco
CREATE DATABASE IF NOT EXISTS jotinha_veiculos DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE jotinha_veiculos;

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamentos`
--

CREATE TABLE `agendamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `interesse` varchar(200) NOT NULL,
  `data` varchar(200) NOT NULL,
  `hora` varchar(10) NOT NULL,
  `observacoes` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Despejando dados para a tabela `agendamentos`
--

INSERT INTO `agendamentos` (`id`, `id_usuario`, `interesse`, `data`, `hora`, `observacoes`) VALUES
(10, 11, 'Comprar um veículo', '2025-04-11', '14:00', 'Cliente interessado em test drive'),
(11, 11, 'avaliacao', '2025-04-15', '11:00', 'pegar o felipe'),
(13, 10, 'test-drive', '2025-04-15', '16:00', 'asdasd'),
(15, 11, 'venda', '2025-04-15', '10:00', 'alguma coisa'),
(16, 11, 'compra', '2025-04-17', '14:00', 'sou lindo'),
(17, 11, 'venda', '2025-04-18', '10:00', 'p...'),
(18, 11, 'compra', '2025-04-26', '10:00', 'sdad'),
(19, 27, 'compra', '2025-04-16', '14:00', 'to sem dinehirp'),
(20, 11, 'venda', '2025-07-17', '10:00', 'dfefefefefe'),
(21, 30, 'avaliacao', '2025-04-26', '10:00', 'Quero avaliar'),
(22, 10, 'compra', '2025-04-24', '09:00', 'alguma coisa'),
(23, 11, 'venda', '2025-05-06', '10:00', 'algumacoisa'),
(24, 11, 'venda', '2025-05-08', '09:00', ''),
(25, 11, 'compra', '2025-05-06', '10:00', 'alguma coisa'),
(26, 11, 'compra', '2025-05-10', '10:00', '123'),
(27, 11, 'venda', '2025-05-07', '09:00', '123'),
(28, 11, 'compra', '2025-05-16', '10:00', '123'),
(29, 11, 'venda', '2025-05-16', '09:00', '123'),
(30, 11, 'venda', '2025-05-17', '10:00', '123'),
(31, 11, 'venda', '2025-05-08', '10:00', '123'),
(32, 11, 'compra', '2025-05-09', '09:00', '123'),
(33, 11, 'compra', '2025-05-09', '10:00', 'fefefe'),
(34, 11, 'test-drive', '2025-05-10', '09:00', 'letzel cocudo'),
(35, 11, 'venda', '2025-05-30', '11:00', 'refe'),
(36, 32, 'avaliacao', '2025-05-07', '09:00', 'entendi'),
(38, 11, 'avaliacao', '2025-05-22', '16:00', 'algumacoisa');

-- --------------------------------------------------------

--
-- Estrutura para tabela `carros`
--

CREATE TABLE `carros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `ano` int NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `quilometragem` int NOT NULL,
  `combustivel` varchar(20) NOT NULL,
  `cambio` varchar(20) NOT NULL,
  `cor` varchar(30) NOT NULL,
  `ipva` varchar(10) NOT NULL,
  `descricao` text DEFAULT NULL,
  `imagem1` varchar(255) DEFAULT NULL,
  `imagem2` varchar(255) DEFAULT NULL,
  `imagem3` varchar(255) DEFAULT NULL,
  `imagem4` varchar(255) DEFAULT NULL,
  `imagem5` varchar(255) DEFAULT NULL,
  `status_id` int NOT NULL,
  `tipo_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `tipo_id` (`tipo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Despejando dados para a tabela `carros`
--

INSERT INTO `carros` (`id`, `marca`, `modelo`, `ano`, `preco`, `quilometragem`, `combustivel`, `cambio`, `cor`, `ipva`, `descricao`, `imagem1`, `imagem2`, `imagem3`, `imagem4`, `imagem5`, `status_id`, `tipo_id`) VALUES
(38, 'Citroen', 'C4 CACTUS FEEL', 2023, 85000.00, 48109, 'Flex', 'Automático', 'Marrom', 'Pago', 'C4 CACTUS FEEL\r\nMOTOR=1.6 FLEX\r\nAutomático ANO= 2023\r\nKM=48.109 valor : 85.000,00', '/src/imgcarros/1741959753771-763179516.jpeg', '/src/imgcarros/1741959753772-45467230.jpeg', '/src/imgcarros/1741959753774-802785399.jpeg', '/src/imgcarros/1741959753777-453696572.jpeg', '/src/imgcarros/1741959753779-964500345.jpeg', 1, 1),
(47, 'Volkswagen', 'Gol', 2023, 59000.00, 43923, 'Flex', 'Manual', 'Branco', 'Pago', 'Veículo em excelente estado, completo de fábrica, motor 1.0 Flex econômico e confiável, câmbio manual preciso, ideal para o dia a dia. Com apenas 43.923 km rodados, oferece conforto, segurança e praticidade. Pronto para rodar!\r\n', '/src/imgcarros/1744238946509-34312315.jpeg', '/src/imgcarros/1744238946516-310313224.jpeg', '/src/imgcarros/1744238946519-240082560.jpeg', '/src/imgcarros/1744238946523-221003448.jpeg', '/src/imgcarros/1744238946526-555503314.jpeg', 1, 1),
(48, 'Volkswagen', 'Virtus Confortline', 2023, 115000.00, 53000, 'Flex', 'Automático', 'Preto', 'Pago', 'Sedã moderno e super confortável, equipado com motor 1.0 TSI turbo, Flex, garantindo ótima performance com economia. Modelo Comfortline completo, com acabamento refinado e tecnologia de ponta. Rodou apenas 53 mil km. Carro pronto para você e sua família!', '/src/imgcarros/1744239243791-482512689.jpeg', '/src/imgcarros/1744239243795-966731311.jpeg', '/src/imgcarros/1744239243798-64845754.jpeg', '/src/imgcarros/1744239243800-429264610.jpeg', '/src/imgcarros/1744239243803-124456928.jpeg', 1, 1),
(49, 'Hyundai', 'HB20S Platinum', 2022, 88000.00, 71121, 'Flex', 'Automático', 'Prata', 'Pago', 'Sedã elegante e completo! Motor 1.0 Turbo Flex de alta performance, câmbio automático, oferecendo conforto e economia para o dia a dia. Versão Platinum com acabamento premium, tecnologia de ponta e excelente espaço interno. Apenas 71.121 km rodados. Carro em ótimo estado!', '/src/imgcarros/1744239558242-21804269.jpeg', '/src/imgcarros/1744239558245-129310874.jpeg', '/src/imgcarros/1744239558249-468650618.jpeg', '/src/imgcarros/1744239558253-304360879.jpeg', '/src/imgcarros/1744239558257-804735178.jpeg', 1, 1),
(50, 'Chevrolet', 'Onix LTZ', 2021, 77000.00, 88000, 'Flex', 'Manual', 'Prata', 'Pago', 'Carro praticamente zero! Apenas 88 km rodados. Motor 1.0 Turbo Flex, econômico e potente, câmbio manual preciso, versão LTZ completa com ótimo acabamento, tecnologia e segurança. Perfeito para quem busca um seminovo novo!\n\n', '/src/imgcarros/1744240181590-686943909.jpeg', '/src/imgcarros/1744240181596-822149480.jpeg', '/src/imgcarros/1744240181598-767240730.jpeg', '/src/imgcarros/1744240181601-290505333.jpeg', '/src/imgcarros/1744240181604-857528607.jpeg', 1, 1),
(59, 'VW', '3123', 23213, 12321.00, 31231, 'Flex', 'Manual', 'Azul', 'Pago', '123213', '/src/imgcarros/0,,36959185-EX,00 - Copia-1746706324643.jpg', '/src/imgcarros/Banner Linkedin Lucas Letzel-1746706324643.png', '/src/imgcarros/Captura de tela 2024-11-27 165556-1746706324654.png', '/src/imgcarros/fusca3-1746706324659.jpg', '/src/imgcarros/fuscaquenrado-1746706324660.png', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `destaques`
--

CREATE TABLE `destaques` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_carro` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_carro` (`id_carro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Despejando dados para a tabela `destaques`
--

INSERT INTO `destaques` (`id`, `id_carro`) VALUES
(69, 38),
(72, 47),
(77, 59);

-- --------------------------------------------------------

--
-- Estrutura para tabela `interesses_agendamentos`
--

CREATE TABLE `interesses_agendamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `interesse` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `interesse` (`interesse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Despejando dados para a tabela `interesses_agendamentos`
--

INSERT INTO `interesses_agendamentos` (`id`, `interesse`) VALUES
(1, 'Teste de Interesse');

-- --------------------------------------------------------

--
-- Estrutura para tabela `propostas`
--

CREATE TABLE `propostas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_carro` int NOT NULL,
  `valor_oferecido` decimal(10,2) NOT NULL,
  `status_id` int NOT NULL,
  `estado_do_veiculo` int DEFAULT NULL,
  `quilometragem` int DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_carro` (`id_carro`),
  KEY `status_id` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `status_carros`
--

CREATE TABLE `status_carros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Despejando dados para a tabela `status_carros`
--

INSERT INTO `status_carros` (`id`, `status`) VALUES
(1, 'Disponível'),
(2, 'Indisponível');

-- --------------------------------------------------------

--
-- Estrutura para tabela `status_propostas`
--

CREATE TABLE `status_propostas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipos_carros`
--

CREATE TABLE `tipos_carros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo` (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Despejando dados para a tabela `tipos_carros`
--

INSERT INTO `tipos_carros` (`id`, `tipo`) VALUES
(5, 'Conversível'),
(1, 'Hatchback'),
(4, 'Picape'),
(2, 'Sedan'),
(3, 'SUV');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipos_usuarios`
--

CREATE TABLE `tipos_usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo` (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Despejando dados para a tabela `tipos_usuarios`
--

INSERT INTO `tipos_usuarios` (`id`, `tipo`) VALUES
(1, 'Administrador'),
(2, 'Cliente');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo_id` int NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `nascimento` date NOT NULL,
  `sexo` enum('Masculino','Feminino','Outro') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `tipo_id` (`tipo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `telefone`, `senha`, `tipo_id`, `cpf`, `nascimento`, `sexo`) VALUES
(10, 'Administrador', 'admin@gmail.com', '4545454', '$2b$14$Tuq4c7H/KCViyyGsAGyJa..ZZfj43b251QBerU/GZKW3186ts4dvK', 1, '12423438920', '2025-02-20', 'Masculino'),
(11, 'Cliente', 'cliente@gmail.com', '(14) 99803-0154', '$2b$14$0kEWU.U5ty.fXyr.LwE4UuPKMo4RMMEP40cvvZVdshD8OJ9EdxOKy', 2, '1234567899', '2025-02-20', 'Masculino'),
(27, 'pardas', 'luciano@gmail.com', NULL, '$2b$14$85r9pxXzeDDyOUfly4ZBE.PWBSR1qODzsRnFu.To7b5ylFLGt/Pzi', 2, '11111111111', '1980-04-02', 'Masculino'),
(30, 'Gabriel', 'gabri4590@gmail.com', NULL, '$2b$14$cZc1t19.2q2ts/m6Cb6WYevVfbVqCc2xmvZjgLWc4svodLpnCKVQy', 2, '40391149814', '2007-06-29', 'Masculino'),
(32, 'Lucas Dias Letzel', 'lucasdiasletzel@gmail.com', NULL, '$2b$14$HGuSp/Sx3a0H21BcaSPU3.HhgJr.clOVbfyORcgkO06xNLMWe7o/W', 2, '489.794.528-37', '2025-04-04', 'Masculino'),
(43, 'Lucas Dias Letzel', '77@gmail.com', NULL, '$2b$14$59G/Zz/Fqd/1dgJmMJDZeeIDMmJ6XtzaJXOoUNd3OKinlM8TnpLw.', 2, '123.123.111-11', '2009-02-12', 'Masculino');

-- 
-- Índices para tabelas despejadas
--

-- 
-- Índices de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

-- 
-- Índices de tabela `carros`
--
ALTER TABLE `carros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `tipo_id` (`tipo_id`);

-- 
-- Índices de tabela `destaques`
--
ALTER TABLE `destaques`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_carro` (`id_carro`);

-- 
-- Índices de tabela `interesses_agendamentos`
--
ALTER TABLE `interesses_agendamentos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `interesse` (`interesse`);

-- 
-- Índices de tabela `propostas`
--
ALTER TABLE `propostas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_carro` (`id_carro`),
  ADD KEY `status_id` (`status_id`);

-- 
-- Índices de tabela `status_carros`
--
ALTER TABLE `status_carros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `status` (`status`);

-- 
-- Índices de tabela `status_propostas`
--
ALTER TABLE `status_propostas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `status` (`status`);

-- 
-- Índices de tabela `tipos_carros`
--
ALTER TABLE `tipos_carros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

-- 
-- Índices de tabela `tipos_usuarios`
--
ALTER TABLE `tipos_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

-- 
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD KEY `tipo_id` (`tipo_id`);

-- 
-- AUTO_INCREMENT para tabelas despejadas
--

-- 
-- AUTO_INCREMENT de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

-- 
-- AUTO_INCREMENT de tabela `carros`
--
ALTER TABLE `carros`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

-- 
-- AUTO_INCREMENT de tabela `destaques`
--
ALTER TABLE `destaques`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

-- 
-- AUTO_INCREMENT de tabela `interesses_agendamentos`
--
ALTER TABLE `interesses_agendamentos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

-- 
-- AUTO_INCREMENT de tabela `propostas`
--
ALTER TABLE `propostas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

-- 
-- AUTO_INCREMENT de tabela `status_carros`
--
ALTER TABLE `status_carros`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- 
-- AUTO_INCREMENT de tabela `status_propostas`
--
ALTER TABLE `status_propostas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

-- 
-- AUTO_INCREMENT de tabela `tipos_carros`
--
ALTER TABLE `tipos_carros`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

-- 
-- AUTO_INCREMENT de tabela `tipos_usuarios`
--
ALTER TABLE `tipos_usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- 
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

-- 
-- Restrições para tabelas despejadas
--

-- 
-- Restrições para tabelas `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

-- 
-- Restrições para tabelas `carros`
--
ALTER TABLE `carros`
  ADD CONSTRAINT `carros_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `status_carros` (`id`),
  ADD CONSTRAINT `carros_ibfk_2` FOREIGN KEY (`tipo_id`) REFERENCES `tipos_carros` (`id`);

-- 
-- Restrições para tabelas `destaques`
--
ALTER TABLE `destaques`
  ADD CONSTRAINT `destaques_ibfk_1` FOREIGN KEY (`id_carro`) REFERENCES `carros` (`id`);

-- 
-- Restrições para tabelas `propostas`
--
ALTER TABLE `propostas`
  ADD CONSTRAINT `propostas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `propostas_ibfk_2` FOREIGN KEY (`id_carro`) REFERENCES `carros` (`id`),
  ADD CONSTRAINT `propostas_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status_propostas` (`id`);

-- 
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `tipos_usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
