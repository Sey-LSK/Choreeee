<script>
  import { onMount } from "svelte";
  import { currentChore } from "$lib/stores/chores";
  import { selectedUser } from "$lib/stores/user";
  import { goto } from "$app/navigation";

  let deferredPrompt;

  onMount(() => {
    selectedUser.init();
    if (!$selectedUser) {
      goto("/");
      return;
    }
    currentChore.updateCurrentChore($selectedUser);
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });
  });

  async function installPWA() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
    }
  }

  function switchUser() {
    selectedUser.set(null);
    goto("/");
  }
</script>

<div
  class="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4 sm:p-6"
>
  <main
    class="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md transform transition-all hover:scale-[1.02] sm:hover:scale-105"
  >
    <div class="flex justify-between items-center mb-8">
      <h1
        class="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
        style="padding: 0.5em 0;" 
      >
        Hi, {$selectedUser}
      </h1>
      <button
        on:click={switchUser}
        class="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        Switch
      </button>
    </div>

    <div class="space-y-3 sm:space-y-4">
      <h2 class="text-lg sm:text-xl text-gray-700 font-medium text-center">
        This week's chore:
      </h2>
      <div
        class="bg-gradient-to-r from-purple-100 to-pink-100 p-4 sm:p-6 rounded-lg sm:rounded-xl"
      >
        <p
          class="text-2xl sm:text-3xl font-bold text-center text-gray-800 break-words"
        >
          {$currentChore}
        </p>
      </div>
    </div>

    {#if deferredPrompt}
      <button
        on:click={installPWA}
        class="mt-6 w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Install App
      </button>
    {/if}
  </main>
</div>
