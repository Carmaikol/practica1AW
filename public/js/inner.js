function closegame(id) {
    if (confirm("Close the game?") == true) {
        window.location.href="/closegame?id="+id;
    }
}