import { writable } from 'svelte/store';

const chores = [
    'Clean Bathroom',
    'Vacuum House',
    'Do Laundry',
    'Clean Kitchen',
    'Dust Furniture'
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
        updateCurrentChore: () => {
            const weekNumber = getWeekNumber();
            const choreIndex = weekNumber % chores.length;
            set(chores[choreIndex]);
        }
    };
}

export const currentChore = createChoreStore();
