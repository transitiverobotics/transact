import { COOKIE_NAME } from '@/common/constants.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import utils from '@transitive-sdk/utils';

const SALT_ROUNDS = 10;

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ACCOUNTS_FILE = path.join(__dirname, 'accounts.json');

const log = utils.getLogger('auth');
log.setLevel('debug');


interface Account {
    _id: string;
    bcryptPassword?: string;
    email: string;
    created: Date;
    admin?: boolean;
    verified?: boolean;
}

/** given an account (object from DB), create the cookie payload string */
const createCookie = (account: Account, impersonating: boolean = false): string => {
    const payload = {
        user: account._id,
        verified: account.verified,
        admin: account.admin || false,
        impersonating
    };
    return JSON.stringify(payload);
};

export const readAccounts = async (): Promise<Account[]> => {
    if (!fs.existsSync(ACCOUNTS_FILE)) {
        await fs.promises.writeFile(ACCOUNTS_FILE, '[]');
        return [];
    }
    const data = await fs.promises.readFile(ACCOUNTS_FILE, 'utf-8');
    return JSON.parse(data) as Account[];
};

export const writeAccounts = async (accounts: Account[]): Promise<void> => {
    await fs.promises.writeFile(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
};

/** simple middleware to check whether the user is logged in */
export const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        log.debug('not logged in');
        res.redirect('/login');
    } else {
        next();
    }
};

interface CreateAccountParams {
    name: string;
    password?: string;
    email: string;
    admin?: boolean;
    verified?: boolean;
}

type Callback = (error: string | null, account?: Account) => void;

export const getAccount = async (name: string): Promise<Account | void> => {
    const accounts = await readAccounts();
    return accounts.find(account => account._id === name);
}

export const createAccount = async ({name, password, email, admin, verified}: CreateAccountParams, cb?: Callback): Promise<Account | void> => {
    const accounts = await readAccounts();
    const existing = accounts.find(account => account._id === name);
    if (existing) {
        console.warn(`An account with the name >${name}< already exists`);
        if (cb) {
            cb('An account with that name already exists');
        }
    } else {
        const bcryptPassword = password && await bcrypt.hash(password, SALT_ROUNDS);
        const newAccount: Account = {
            _id: name,
            bcryptPassword,
            email,
            created: new Date(),
            // if admin, i.e., auto-created internally:
            ...(admin && {
                admin: true,
                verified: true,
            }),
            // if already verified, e.g., from Google Login
            ...(verified && {
                verified,
            })
        };

        accounts.push(newAccount);
        await writeAccounts(accounts);
        console.info(`New account created: ${name}`);
        if (cb) {
            cb(null, newAccount);
        }
        return newAccount;
    }
};


/** Log the user of this request into the given account. */
export const  login = (req, res, {account, impersonating = false, redirect = '/'}) => {
    // if (req.hostname.startsWith('localhost')) {
    //   delete req.session.cookie.domain;
    // }
    // Write the verified username to the session to indicate logged in status
    req.session.user = account;
    const cookiedRes = res.cookie(COOKIE_NAME, createCookie(account, impersonating));
    if (!redirect) {
      cookiedRes.json({status: 'ok'});
    } else {
      cookiedRes.redirect(redirect);
    }
  };