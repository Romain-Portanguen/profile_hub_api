import { Request, Response } from 'express';
import userService from '../services/user.service';
import logger from '../utils/logger.utils';
import { UserDto, CreateUserDto, UpdateUserDto, PaginatedUsersDto } from '../dtos/user.dto';

class UserController {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userDto: CreateUserDto = req.body;
      const user = await userService.createUser(userDto);
      res.status(201).json(user);
    } catch (error: any) {
      logger.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 10;
      const users: PaginatedUsersDto = await userService.getUsers(page, limit);
      res.status(200).json(users);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user: UserDto | null = await userService.getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updateUserDto: UpdateUserDto = req.body;
      const user: UserDto | null = await userService.updateUser(req.params.id, updateUserDto);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user: UserDto | null = await userService.deleteUser(req.params.id);
      if (user) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
}

export default new UserController();

/**
   * @swagger
   * tags:
   *   name: Users
   *   description: User management
   */

/** CREATE USER
   * @swagger
   * /api/users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserDto'
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserDto'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */

/** GET USERS
   * @swagger
   * /api/users:
   *   get:
   *     summary: Get a list of users
   *     tags: [Users]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Number of items per page
   *     responses:
   *       200:
   *         description: List of users
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PaginatedUsersDto'
   *       500:
   *         description: Internal server error
   */

/** GET USER BY ID
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: User ID
   *     responses:
   *       200:
   *         description: User found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserDto'
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */

/** UPDATE USER
   * @swagger
   * /api/users/{id}:
   *   put:
   *     summary: Update user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: User ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserDto'
   *     responses:
   *       200:
   *         description: User updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserDto'
   *       404:
   *         description: User not found
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */

/** DELETE USER
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Delete user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: User ID
   *     responses:
   *       204:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
