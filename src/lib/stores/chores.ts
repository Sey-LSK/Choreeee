import { writable } from 'svelte/store';
import { users } from './user';

export const CHORES = [
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

export function setCustomAssignment(user: string, chore: string) {
    try {
        localStorage.setItem(`chore_assignment_${user}`, chore);
    } catch (error) {
        console.error('Error setting custom assignment:', error);
        throw error;
    }
}

export function getCustomAssignment(user: string): string | null {
    try {
        return localStorage.getItem(`chore_assignment_${user}`);
    } catch (error) {
        console.error('Error getting custom assignment:', error);
        return null;
    }
}

function createChoreStore() {
    const { subscribe, set } = writable('');
    
    return {
        subscribe,
        updateCurrentChore: (username: string) => {
            // Check for custom assignment first
            const customChore = getCustomAssignment(username);
            if (customChore) {
                set(customChore);
                return;
            }

            // Fall back to rotation if no custom assignment
            const weekNumber = getWeekNumber();
            const userIndex = users.indexOf(username);
            const rotationOffset = (weekNumber + userIndex) % CHORES.length;
            set(CHORES[rotationOffset]);
        }
    };
}

export const currentChore = createChoreStore();
