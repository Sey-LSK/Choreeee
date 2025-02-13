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
  <div class="w-full max-w-md">
    <div
      class="group relative grid overflow-hidden rounded-xl px-8 py-8 shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0.9)_inset] transition-colors duration-200"
    >
      <!-- Animated border effect -->
      <span>
        <span
          class="spark mask-gradient animate-flip before:animate-kitrotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]"
        />
      </span>

      <!-- Background -->
      <span
        class="backdrop absolute inset-px rounded-[11px] bg-white/90 backdrop-blur-sm transition-colors duration-200"
      />

      <!-- Content -->
      <div class="z-10 space-y-6">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-800">
            Hi, {$selectedUser}
          </h1>
          <button
            on:click={switchUser}
            class="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
          >
            Switch
          </button>
        </div>

        <div class="space-y-3">
          <h2 class="text-lg sm:text-xl text-gray-700 font-medium text-center">
            This week's chore:
          </h2>
          <div class="bg-gray-50/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
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
            class="mt-6 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
          >
            Install App
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  :global(.mask-gradient) {
    mask: linear-gradient(white, transparent 50%);
    -webkit-mask: linear-gradient(white, transparent 50%);
  }
</style>
