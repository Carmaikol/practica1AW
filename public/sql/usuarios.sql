-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2016 a las 13:11:55
-- Versión del servidor: 10.1.16-MariaDB
-- Versión de PHP: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `usuarios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `n_players` int(11) NOT NULL,
  `turns_left` int(11) NOT NULL,
  `creationdate` date NOT NULL,
  `id_creator` varchar(25) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `id_winner` varchar(25) DEFAULT NULL,
  `rows` int(11) NOT NULL DEFAULT '7',
  `columns` int(11) NOT NULL DEFAULT '7',
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `game`
--

INSERT INTO `game` (`id`, `n_players`, `turns_left`, `creationdate`, `id_creator`, `active`, `id_winner`, `rows`, `columns`, `name`) VALUES
(37, 3, 0, '0000-00-00', 'miki', 0, NULL, 7, 7, 'HHHH'),
(38, 3, 0, '0000-00-00', 'miki', 1, NULL, 7, 7, 'test'),
(42, 3, 0, '0000-00-00', 'testen', 1, NULL, 7, 7, '1'),
(43, 4, 0, '0000-00-00', 'testen', 1, NULL, 7, 7, '2'),
(44, 5, 0, '0000-00-00', 'testen', 1, NULL, 7, 7, '3'),
(45, 3, 0, '0000-00-00', 'undefined', 1, NULL, 7, 7, 'a'),
(46, 3, 0, '0000-00-00', 'undefined', 1, NULL, 7, 7, 'aa'),
(47, 3, 0, '0000-00-00', 'Testen', 0, NULL, 7, 7, 'hola'),
(48, 5, 0, '0000-00-00', 'undefined', 1, NULL, 7, 7, '12314'),
(49, 3, 0, '0000-00-00', 'jara', 1, NULL, 7, 7, 'jk'),
(50, 3, 0, '0000-00-00', 'miki', 1, NULL, 7, 7, 'dfgd'),
(51, 3, 0, '0000-00-00', 'miki', 0, NULL, 7, 7, 'hola'),
(52, 4, 0, '0000-00-00', 'miki', 1, NULL, 7, 7, 'asdasd'),
(53, 3, 0, '0000-00-00', 'miki', 0, NULL, 7, 7, '1'),
(54, 3, 0, '0000-00-00', 'jjj', 1, NULL, 7, 7, '21312'),
(55, 3, 0, '0000-00-00', 'miki', 1, NULL, 7, 7, 'fdg'),
(56, 3, 0, '0000-00-00', 'miki', 1, NULL, 7, 7, 'fgh'),
(57, 3, 0, '0000-00-00', 'test', 1, NULL, 7, 7, 'asdasd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(5) NOT NULL,
  `role` tinyint(4) NOT NULL DEFAULT '0',
  `id_game` int(11) NOT NULL,
  `id_player` varchar(25) NOT NULL,
  `turn` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `role`, `id_game`, `id_player`, `turn`) VALUES
(15, 0, 37, 'jara', 'jara'),
(16, 0, 38, 'miki', 'miki'),
(17, 0, 42, 'miki', 'miki'),
(18, 0, 43, 'miki', 'miki'),
(19, 0, 44, 'miki', 'miki'),
(20, 0, 45, 'miki', 'miki'),
(21, 0, 46, 'miki', 'miki'),
(22, 0, 43, 'jjj', 'jjj'),
(23, 0, 48, 'miki', 'miki'),
(24, 0, 38, 'tt', 'tt'),
(25, 0, 42, 'tt', 'tt'),
(26, 0, 43, 'tt', 'tt'),
(27, 0, 44, 'tt', 'tt'),
(28, 0, 45, 'tt', 'tt'),
(29, 0, 54, 'miki', 'miki'),
(30, 0, 43, 'test', 'test'),
(31, 0, 44, 'test', 'test'),
(32, 0, 54, 'test', 'test'),
(33, 0, 38, 'test', 'test'),
(34, 0, 54, 'test', 'test'),
(35, 0, 54, 'test', 'test'),
(36, 0, 48, 'test', 'test'),
(37, 0, 45, 'test', 'test'),
(38, 0, 43, 'test', 'test'),
(39, 0, 46, 'test', 'test'),
(40, 0, 42, 'test', 'test');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `username` varchar(25) NOT NULL,
  `password` varchar(35) NOT NULL,
  `fullname` varchar(125) NOT NULL,
  `gender` tinyint(4) NOT NULL,
  `photo` blob,
  `birthdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`username`, `password`, `fullname`, `gender`, `photo`, `birthdate`) VALUES
('jara', 'pass', 'undefined', 1, 0x61383563653534623738306633376534613735656637366235383338623135312e6a706567, '2016-12-17'),
('jjj', 'jjj', 'undefined', 0, 0x30343730363138623963353737323138306538636663313438623266326430622e6a706567, '2016-12-18'),
('miki', 'pass', 'undefined', 0, 0x33393630643936396632643839623664633636346633623665333930323236372e6a706567, '2015-11-17'),
('test', 'pass', 'undefined', 0, 0x39383435323038363762313235393338643035613133336664616464356566392e6a706567, '2016-12-18'),
('testen', 'pass', 'undefined', 0, 0x61303433626166326138616436326131663361366130303566363630346661662e6a706567, '2013-09-14'),
('tt', 'tt', 'undefined', 1, 0x38623535643666393037346662366366303936633438633461616265626237392e6a706567, '2016-12-18');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_creator` (`id_creator`,`id_winner`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_player` (`id_player`),
  ADD KEY `id_game` (`id_game`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
