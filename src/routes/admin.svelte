<script>
    let users = ["User1", "User2", "User3"]; // Replace with your actual users array
    let selectedUser = "";
    let chore = "";

    function assignChore() {
        console.log(`Assigned chore "${chore}" to user "${selectedUser}"`);
        // Here you can handle the assignment logic, e.g., save to local storage or send to a backend
    }
</script>

<main>
    <h1>Assign Chores</h1>
    <form on:submit|preventDefault={assignChore}>
        <label for="userSelect">Select User:</label>
        <select bind:value={selectedUser} id="userSelect">
            {#each users as user}
                <option value={user}>{user}</option>
            {/each}
        </select><br><br>
        <label for="choreInput">Chore:</label>
        <input type="text" bind:value={chore} id="choreInput" required><br><br>
        <button type="submit">Assign Chore</button>
    </form>
</main>

<style>
    main {
        padding: 1em;
        max-width: 600px;
        margin: 0 auto;
    }
    label, input, select {
        display: block;
        margin-bottom: 0.5em;
    }
</style>
