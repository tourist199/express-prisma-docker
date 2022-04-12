import { Prisma } from '@prisma/client';
import token from '../../utils/token';
import bcrypt from 'bcrypt';
import { prisma } from '../../prisma';

class UserService {
    /**
     * Register a new user
     */
    public async register(
        userInput: Prisma.UserCreateInput
    ): Promise<string | Error> {
        try {
            const hash = await bcrypt.hash(userInput.password, 10);
            const user = await prisma.user.create({
                data: { ...userInput, password: hash },
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error) {
            throw new Error('Unable register user');
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await bcrypt.compare(password, user.password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }
}

export default UserService;
