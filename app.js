document.addEventListener('DOMContentLoaded', () => {
    const mainPhoto = document.getElementById('main-photo');
    const photoCaption = document.getElementById('photo-caption');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from the current active thumbnail
            document.querySelector('.thumbnail.active').classList.remove('active');

            // Add active class to the clicked thumbnail
            thumbnail.classList.add('active');

            // Get the new image source and caption
            const newSrc = thumbnail.src;
            const newCaption = thumbnail.dataset.caption;

            // Fade out the main photo and caption
            mainPhoto.style.opacity = 0;
            photoCaption.style.opacity = 0;

            // After the fade out, change the content and fade back in
            setTimeout(() => {
                mainPhoto.src = newSrc;
                mainPhoto.alt = `Luciana Rosa, a mulher mais linda do mundo - ${thumbnail.alt.split(' ').pop()}`;
                photoCaption.textContent = newCaption;

                mainPhoto.style.opacity = 1;
                photoCaption.style.opacity = 1;
            }, 400); // This duration should match the CSS transition time
        });
    });
});
