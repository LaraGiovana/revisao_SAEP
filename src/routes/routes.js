import { Router } from "express";
import ClienteController from "../controllers/ClienteController.js"
import VeiculoController from "../controllers/VeiculoController.js";
import AgendamentoController from "../controllers/AgendamentoController.js";
import DashBoardController from "../controllers/DashBoardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import AuthController from "../controllers/AuthController.js";

const router = Router ();

router.post('/login', (req, res) => AuthController.login(req, res));

router.use(authMiddleware);

//ROTAS PARA AUTH
router.post('/logout', (req, res) => AuthController.logout(req, res));
router.get('/me', (req, res) => AuthController.me(req, res));

//ROTAS PARA DASHBOARD
router.get('/dashboard/resumo', (req, res) => DashBoardController.resumo(req, res));

//ROTAS PARA CLIENTE
router.get('/clientes', (req, res) => ClienteController.listar(req, res));
router.post('/clientes', (req, res) => ClienteController.criar(req, res));
router.put('/clientes/:id', (req, res) => ClienteController.atualizar(req, res));

//ROTAS PARA VEÍCULOS
router.get('/veiculos', (req, res) => VeiculoController.listar(req, res));
router.post('/veiculos', (req, res) => VeiculoController.criar(req, res));

//ROTAS PARA AGENDAMENTOS
router.get('/agendamentos', (req, res) => AgendamentoController.listar(req, res));
router.post('/agendamentos', (req, res) => AgendamentoController.criar(req, res));
router.patch('/agendamentos/:id/data', (req, res) => AgendamentoController.atualizarData(req, res));

export default router;