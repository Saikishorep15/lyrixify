const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

searchBtn.addEventListener("click", getLyrics);

async function getLyrics() {
    const artist = document.getElementById("artist").value.trim();
    const song = document.getElementById("song").value.trim();

    if (!artist || !song) {
        result.innerHTML = "⚠️ Please enter both artist and song name.";
        return;
    }

    result.innerHTML = "⏳ Fetching lyrics...";

    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
        const data = await response.json();

        if (data.lyrics) {
            result.innerHTML = `
                <h3>${song} - ${artist}</h3>
                <br>
                ${data.lyrics}
            `;
        } else {
            result.innerHTML = "❌ Lyrics not found.";
        }
    } catch (error) {
        result.innerHTML = "🚫 Error fetching lyrics. Please try again.";
    }
}
