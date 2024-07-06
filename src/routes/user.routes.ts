import { Router } from 'express';
import userController from '../controllers/user.controller';
import { validateCreateUser, validateUpdateUser, validateUUID } from '../validations/user-validation';

const router = Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = userController;

router.post('/', validateCreateUser, createUser);
router.get('/', getUsers);
router.get('/:id', validateUUID, getUserById);
router.put('/:id', validateUUID, validateUpdateUser, updateUser);
router.delete('/:id', validateUUID, deleteUser);

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/** POST - CREATE USER
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

/** GET - GET USERS
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

/** GET - GET USER BY ID
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

/** PUT - UPDATE USER BY ID
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

/** DELETE - DELETE USER BY ID
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