<script>
  import { onMount } from "svelte";
  import { users, selectedUser } from "$lib/stores/user";
  import { goto } from "$app/navigation";

  onMount(() => {
    selectedUser.init();
    if ($selectedUser) {
      goto("/chores");
    }
  });

  function selectUser(user) {
    selectedUser.set(user);
    goto("/chores");
  }
</script>

<div
  class="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4 sm:p-6"
>
  <main
    class="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md"
  >
    <h1
      class="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 text-center"
    >
      Who are you?
    </h1>

    <div class="grid gap-3">
      {#each users as user}
        <button
          on:click={() => selectUser(user)}
          class="w-full p-4 text-lg font-medium rounded-lg transition-all
                           bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200
                           transform hover:scale-[1.02] active:scale-100"
        >
          {user}
        </button>
      {/each}
    </div>
  </main>
</div>

<style>
  @referance "tailwindcss/theme";
</style>
