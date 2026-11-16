import pool from '../config/database.js';
import cryptoService from '../utils/crypto.js'

class AgendamentoController {
    async listar (req, res) {
        const { ordenarPor } = req.query; //dia, mes ou ano

        try {
            let orderByClause = `ORDER BY DATE (a.data_agendamento) ASC, a.data_agendamento ASC;`;

            if(ordenarPor === 'mes'){
                `ORDER BY MONTH (a.data_agendamento) ASC, a.data_agendamento ASC;`;


            }else if(ordenarPor == 'ano') {
                `ORDER BY YEAR (a.data_agendamento) ASC, a.data_agendamento ASC;`;
            }

            const sql = `SELECT 
                a.id, a.data_agendamento, a.descricao_servico, a.status,
                c.id AS ID_CLIENTE, c.nome AS NOME_CLIENTE, c.cpf AS CPF_CLIENTE, c.telefone AS TELEFONE_CLIENTE, c.email AS EMAIL_CLIENTE,
                v.id AS ID_VEICULO, v.placa AS PLACA_VEICULO, v.modelo AS MODELO_VEICULO, v.marca AS MARCA_VEICULO, v.ano AS ANO_VEICULO
  
            FROM agendamentos a
            JOIN veiculos v
	            ON a.veiculo_id = v.id
            JOIN clientes c
	            ON v.cliente_id = c.id
               
                `;

            const [rows] = await pool.query(sql);

            rows.forEach((row) => {
                row.CPF_CLIENTE = cryptoService.decrypt(row.CPF_CLIENTE);
            });
            // const agendamentos = rows.map ((row) => ({
            //     id: row.id,
            //     data_agendamento: row.data_agendamento,
            //     descricao_servico: row.descricao_servico,
            //     veiculo_id: row.veiculo_id,
            //     status: row.status,
            //     cliente_id: row.cliente_id,
            //     cliente_nome: row.cliente_nome
            // }));
   
            return res.json(rows);
        } catch (error) {
            console.error('Erro ao listar cliente:', error);
            return res.status(500).json({error:'Erro ao buscar agendamento', errorMessage: error.message})
            console.log()
        }
    }


    async criar(req, res) {
        const { data_agendamento, descricao_servico, veiculo_id, status } = req.body;
        if( !data_agendamento || !descricao_servico || !veiculo_id) {
            return res.status(400).json({ message: 'Todos os dados são obrigatórios' });
        }
        try {
            const [result] = await pool.query(
                `INSERT INTO agendamentos ( data_agendamento, descricao_servico, veiculo_id, status) VALUES (?, ?, ?, ?)`, 
                [data_agendamento, descricao_servico, parseInt(veiculo_id, 10), status || 'Agendado']
            );

            return res.status(201).json({ message: 'Agendamento cadastrado com sucesso', id: result.insertId });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: ' Erro ao cadastrar agendamento', errorMesssage: error.message});
        }
    }

    async atualizarData (req, res) {
        const {id} = req.params;
        const {nova_data} = req.body;

        if(!nova_data) {
            return res.status(400).json({
                error: "Informe a nova data para atualização."
            })
        }

        try {
            const [result] = await pool.query(
                `UPDATE agendamentos SET data_agendamento = ? WHERE id = ?`,
                [nova_data,id]
            )

            if(result.affectedRows === 0) {
                return res.status(404).json({
                    error: "agendamento não encontrado."
                });
            }

            return res.json({
                message: "Data do agendamento realizado com sucesso no DB."
            })

        } catch (error) {
            console.error("Erro ao atualizar data do agendamento:", error);
            return res.status(500).json({
                error: "Erro ao salvar nova data no banco."
            });
        }
    }
}

export default new AgendamentoController();