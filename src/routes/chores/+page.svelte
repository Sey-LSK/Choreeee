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

<div class="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4 sm:p-6">
  <div class="w-full max-w-md">
    <div class="group relative grid overflow-hidden rounded-xl px-8 py-8 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
      <!-- Rainbow border effect -->
      <span>
        <span class="spark mask-gradient animate-flip before:animate-kitrotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,#ff0000_0deg,#ff8000_60deg,#ffff00_120deg,#00ff00_180deg,#00ffff_240deg,#0000ff_300deg,#ff00ff_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
      </span>
      
      <!-- Background -->
      <span class="backdrop absolute inset-px rounded-[11px] bg-neutral-950 transition-colors duration-200" />
      
      <!-- Content -->
      <div class="z-10 space-y-6">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-neutral-200">
            Hi, {$selectedUser}
          </h1>
          <button
            on:click={switchUser}
            class="text-sm px-3 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          >
            Switch
          </button>
        </div>

        <div class="space-y-3">
          <h2 class="text-lg sm:text-xl text-neutral-300 font-medium text-center">
            This week's chore:
          </h2>
          <div class="bg-neutral-900/50 p-4 sm:p-6 rounded-lg">
            <p class="text-2xl sm:text-3xl font-bold text-center text-neutral-200 break-words">
              {$currentChore}
            </p>
          </div>
        </div>

        {#if deferredPrompt}
          <button
            on:click={installPWA}
            class="mt-6 w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg font-medium transition-colors"
          >
            Install App
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes flip {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes kitrotate {
    from {
      transform: rotate(-90deg) translate(-50%, -15%);
    }
    to {
      transform: rotate(270deg) translate(-50%, -15%);
    }
  }

  :global(.animate-flip) {
    animation: flip 6s linear infinite;
  }

  :global(.animate-kitrotate) {
    animation: kitrotate 4s linear infinite;
  }
</style>