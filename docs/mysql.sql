-- CREATE DATABASE oficina_db;
 
-- USE oficina_db;

create table clientes (
id int auto_increment primary key,
nome varchar (100) not null,
cpf varchar (255) not null,
telefone varchar (20) not null,
email varchar (100) not null unique,
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table veiculos(
id int auto_increment primary key,
placa varchar (10) not null unique,
modelo varchar (50) not null,
marca varchar (50) not null,
ano int not null,
cliente_id int not null,
foreign key (cliente_id) 
	references clientes(id)
);

create table agendamentos (
id int auto_increment primary key,
data_agendamento datetime not null,
descricao_servico varchar (255) not null,
veiculo_id int not null,
status varchar (50) default 'Agendado',
foreign key (veiculo_id)
	references veiculos(id)
);

create table usuarios (
id int auto_increment primary key,
nome varchar (100) not null,
email varchar (100) not null unique,
senha varchar (255) not null,
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into usuarios (nome, email, senha) values 
('Carlos Mecanico', 'carlos@oficina.com', '123456'),
('Ana atendente', 'ana@oficina.com', '123456'),
('Roberto Gerente', 'roberto@oficina.com', '123456');

insert into clientes (nome, cpf, telefone, email) values
('João Silva', 'EEiyhyJCiARTnGGwNhQEB2Zt81yRNLG8d1WHkahkDSPQ9cIloF8CJOLsvKQ8bOLs', '(19) 98148-7606', 'joao.silva@gmail.com'),
('Maria Oliveira', '1sgg+wQTw13dLZghPvN+CZbZzXjvZK2EZDE2DswHYTgR+Y2tALQgqQDAyUHthcAB', '(19) 98142-2515', 'maria.oliveira@gmail.com'),
('Lucas Pereira', 'ty6LEhgHcVl0lJugNyjDArs0KkZhzdZJLYiRBZ+PFBPtVde0II9c7GeBqxldk9jp', '(19) 98102-4254', 'lucas.pereira@gmail.com');

insert into veiculos (placa, modelo, marca, ano, cliente_id) values
('ABC-1D34', 'Civic', 'Honda', 2021,1),
('XJK-3E14', 'Corolla', 'Toyota', 2025,2),
('QUS-6V54', 'Onix', 'Chevrolet', 2020,3);

insert into agendamentos (data_agendamento, descricao_servico, veiculo_id, status) values
('2026-03-15 09:00:00', 'Troca de óleo e filtro de ar',1, 'Em andamento'),
('2027-06-02 14:30:00', 'Revisão do sistema de freios',2, 'Confirmado'),
('2026-12-14 09:48:00', 'Alinhamento e balanceamento',3, 'Agendado');
