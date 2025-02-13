import { writable } from 'svelte/store';
import { users } from './user';

const CHORES = [
    'Hallway 🏠',
    'Lounge📺',
    'Laundry🧺',
    'Kitchen🔪',
    'Week off☺️',
    'Bins🗑️',
    'Week off 😀'
];

function getWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
}

function createChoreStore() {
    const { subscribe, set } = writable('');
    
    return {
        subscribe,
        updateCurrentChore: (username: string) => {
            const weekNumber = getWeekNumber();
            const userIndex = users.indexOf(username);
            // Ensure rotation works with new chore list length
            const rotationOffset = (weekNumber + userIndex) % CHORES.length;
            set(CHORES[rotationOffset]);
        }
    };
}

export const currentChore = createChoreStore();
