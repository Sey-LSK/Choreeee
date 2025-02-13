<script>
  import { onMount } from "svelte";
  import { users } from "$lib/stores/user";
  import {
    CHORES,
    setCustomAssignment,
    getCustomAssignment,
  } from "$lib/stores/chores";

  let assignments = {};
  let message = "";
  let messageType = "";

  onMount(() => {
    loadAssignments();
  });

  function loadAssignments() {
    users.forEach((user) => {
      const savedAssignment = getCustomAssignment(user);
      assignments[user] = savedAssignment || "";
    });
    assignments = { ...assignments }; // Trigger reactivity
  }

  function saveAssignments() {
    try {
      Object.entries(assignments).forEach(([user, chore]) => {
        if (chore) {
          setCustomAssignment(user, chore);
        } else {
          // Clear assignment by removing from localStorage
          localStorage.removeItem(`chore_assignment_${user}`);
        }
      });
      message = "Assignments saved successfully!";
      messageType = "success";
    } catch (error) {
      message = "Error saving assignments";
      messageType = "error";
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      message = "";
      messageType = "";
    }, 3000);
  }

  function clearAllAssignments() {
    users.forEach((user) => {
      localStorage.removeItem(`chore_assignment_${user}`);
      assignments[user] = "";
    });
    assignments = { ...assignments }; // Trigger reactivity
    message = "All assignments cleared";
    messageType = "success";
  }
</script>

<div
  class="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4 sm:p-6"
>
  <div class="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Admin Panel</h1>
      <button
        on:click={clearAllAssignments}
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Clear All
      </button>
    </div>

    {#if message}
      <div
        class="mb-4 p-3 rounded-lg {messageType === 'success'
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'}"
      >
        {message}
      </div>
    {/if}

    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        {#each users as user}
          <div class="p-4 bg-gray-50 rounded-lg">
            <label class="block mb-2 font-medium" for={user}>{user}</label>
            <select
              id={user}
              bind:value={assignments[user]}
              class="w-full p-2 border rounded-md"
            >
              <option value="">Select a chore</option>
              {#each CHORES as chore}
                <option value={chore}>{chore}</option>
              {/each}
            </select>
          </div>
        {/each}
      </div>

      <div class="flex justify-end">
        <button
          on:click={saveAssignments}
          class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Save Assignments
        </button>
      </div>
    </div>
  </div>
</div>
