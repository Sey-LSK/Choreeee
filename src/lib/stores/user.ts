import { writable } from 'svelte/store';
import { getCookie, setCookie } from '../utils/cookies';

export const users = [
    'Tony',
    'Anna',
    'Cait',
    'Seymour',
    'Joshua',
    'Georgia',
    'Thomas'
];

function createUserStore() {
    const { subscribe, set } = writable<string | null>(null);

    return {
        subscribe,
        set: (value: string | null) => {
            if (value) {
                setCookie('selectedUser', value);
            }
            set(value);
        },
        init: () => {
            const savedUser = getCookie('selectedUser');
            if (savedUser && users.includes(savedUser)) {
                set(savedUser);
            }
        }
    };
}

export const selectedUser = createUserStore();
