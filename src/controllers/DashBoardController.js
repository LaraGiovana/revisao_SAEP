import pool from '../config/database.js';

async function resumo (req, res) {
    try {
        const [[{ total_clientes}]] = await pool.query (
            `SELECT COUNT (*) AS total_clientes FROM clientes;`
        );
         const [[{ total_veiculos}]] = await pool.query (
            `SELECT COUNT (*) AS total_veiculos FROM veiculos;`
        );
         const [[{ total_agendamentos}]] = await pool.query (
            `SELECT COUNT (*) AS total_agendamentos FROM agendamentos;`
        );

        const estatisticas = {
            total_clientes,
            total_veiculos,
            total_agendamentos
        }

        return res.json({
            // ususarioLogado: req.usuario,
            estatisticas
        })
        

    } catch (error) {
        console.log("Erro no resumo do dashboard:", error);
        return res.status(500).json({error: "Erro ao buscar estatísticas do dashboard",
            error: "Erro ao obter dados do dashboard"
        });
    }
}

export default { resumo };