document.addEventListener('DOMContentLoaded', function() {
    const memberCards = document.querySelectorAll('.member-card');
    const popupModal = document.getElementById('popup-modal');
    const popupImage = document.getElementById('popup-image');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const closeBtn = document.querySelector('.close-btn');
    const newTabBtn = document.getElementById('new-tab-btn');

    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            const image = card.getAttribute('data-image');
            const name = card.getAttribute('data-name');
            const description = card.getAttribute('data-description');

            popupImage.src = image;
            popupTitle.innerText = name;
            popupText.innerText = description;
            newTabBtn.href = image;

            popupModal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        popupModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == popupModal) {
            popupModal.style.display = 'none';
        }
    });
});

document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', () => {
        const popup = document.querySelector('.popup-modal');
        const popupImg = popup.querySelector('img');
        const popupDescription = popup.querySelector('.popup-description');

        const imgSrc = card.querySelector('img').src;
        const description = card.querySelector('p').textContent;

        popupImg.src = imgSrc;
        popupDescription.textContent = description;

        popup.style.display = 'block';
    });
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.popup-modal').style.display = 'none';
});

document.querySelector('.new-tab-btn').addEventListener('click', () => {
    const popupImgSrc = document.querySelector('.popup-modal img').src;
    window.open(popupImgSrc, '_blank');
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.image-item');
    const indicators = document.querySelectorAll('.indicator');

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed if needed
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].clientX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].clientX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed if needed
        slider.scrollLeft = scrollLeft - walk;
    });

    // Function to update active indicator
    function updateIndicator() {
        images.forEach((image, index) => {
            const rect = image.getBoundingClientRect();
            if (rect.left >= 0 && rect.right <= window.innerWidth) {
                indicators[index].classList.add('active');
            } else {
                indicators[index].classList.remove('active');
            }
        });
    }

    // Call updateIndicator on page load and resize
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
});