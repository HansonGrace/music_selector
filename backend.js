window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    // all elements needed for website to work
    const randomize = document.getElementById("randomize");
    const name = document.getElementById("name");
    const addAlbumBtn = document.getElementById("addAlbumBtn");
    const albumImageInput = document.getElementById("albumImage");
    const albumNameInput = document.getElementById("albumName");
    const clearAlbumsBtn = document.getElementById("clearAlbums"); // New clear button

    // load the existing albums from localStorage or initialize an empty array
    let albums = JSON.parse(localStorage.getItem("albums")) || [];

    // When randomize is clicked, it will randomly select an album from the array of albums
    randomize.addEventListener("click", () => {
        let albums_length = albums.length;

        // gets a random number from 0 to the length of albums array
        let num = Math.floor(Math.random() * albums_length);

        // sets the text for name as the random album
        name.textContent = albums[num].name;

        // sets the image for the album cover as the random album's image
        setAlbumCover(albums[num]);
    });

    // Adding a new album
    addAlbumBtn.addEventListener("click", () => {
        const albumName = albumNameInput.value.trim();
        const albumImageFile = albumImageInput.files[0];

        if (albumName && albumImageFile) {
            // create a new album object and add it to the albums array
            const reader = new FileReader();
            reader.onload = function (event) {
                let newAlbum = {
                    name: albumName,
                    image: event.target.result
                };

                // Add the new album to the albums array and update localStorage
                albums.push(newAlbum);
                localStorage.setItem("albums", JSON.stringify(albums));

                // display the new album in the randomizer
                setAlbumCover(newAlbum);
                name.textContent = newAlbum.name;

                // clears out the inputs
                albumNameInput.value = "";
                albumImageInput.value = "";

                alert("Album added successfully!");
            };

            reader.readAsDataURL(albumImageFile);
        } else {
            alert("Please provide both an album name and image.");
        }
    });

    // Function to set the album cover based on album name or image data URL
    function setAlbumCover(album) {
        const albumCover = document.getElementById("albumCover");

        // if the album is an image URL, use it
        if (typeof album === "string") {
            albumCover.src = `./covers/${album}.jpg`;  // fallback for existing albums
        } else {
            albumCover.src = album.image;  // use uploaded image
        }
    }

    // Clear all albums
    clearAlbumsBtn.addEventListener("click", () => {
        // Clear albums from localStorage and refresh the page
        localStorage.removeItem("albums");
        albums = [];
        alert("All albums have been cleared.");
        location.reload(); // reload the page to reset everything
    });
}
