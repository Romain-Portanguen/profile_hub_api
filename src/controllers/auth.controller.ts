import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos/user.dto';
import authService from '../services/auth.service';
import logger from '../utils/logger.utils';

class AuthController {
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userDto: CreateUserDto = req.body;
      const user = await authService.register(userDto);
      res.status(201).json(user);
    } catch (error: any) {
      logger.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const userDto: Pick<CreateUserDto, 'email' | 'password'> = req.body;
      const token = await authService.login(userDto);
      res.status(200).json({ token });
    } catch (error: any) {
      logger.error(error);
      res.status(401).json({ error: error.message });
    }
  }
}

export default new AuthController();

/**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Authentication management
   */

/** REGISTER
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserDto'
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserDto'
   *       500:
   *         description: Internal server error
   */

/** LOGIN
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login a user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: password123
   *     responses:
   *       200:
   *         description: User logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
