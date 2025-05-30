//------------------------------------------------
// -- Page Juice Section --
//------------------------------------------------

    //Event listener that makes the page background follow the mouse
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX / window.innerWidth;  // horizontal (0 to 1)
        const y = e.clientY / window.innerHeight; // vertical (0 to 1)

        const moveX = (x - 0.5) * 20; // range: -10% to +10%
        const moveY = (y - 0.5) * 10; // range: -5% to +5%

        const bg = document.querySelector(".fixed-bg");
        const bg_alt = document.querySelector(".fixed-bg-alt");

        if (bg) {
        bg.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
        }

        if (bg_alt) {
            bg_alt.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
        }
    });

    //Event Listener for adding bacground to nav bar after scroll
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
        header.classList.add('scrolled');
        } else {
        header.classList.remove('scrolled');
        }
    });

    //Event listener to dim bg when scrolled past landing page
    const overlay = document.querySelector('.bg-overlay');
    const bg = document.querySelector('.fixed-bg');

    window.addEventListener('scroll', () => {
        const maxScroll = window.innerHeight; // 1 screen height
        const scrollTop = window.scrollY;

        // Calculate a ratio (0 to 1)
        let ratio = scrollTop / maxScroll;
        ratio = Math.min(ratio, 1);

        // Set overlay opacity (e.g., up to 0.5)
        overlay.style.opacity = ratio * 0.5;

        // Set blur (e.g., from 3px up to 10px)
        const blurAmount = 1 + ratio * 7; // 3px → 10px
        bg.style.filter = `blur(${blurAmount}px)`;
    });

    //Event Listener for when the scroll wheel controls the bar of E-Board Cards
    const scrollWrapper = document.querySelector('.board-scroll-wrapper');

    scrollWrapper.addEventListener('wheel', function (e) {
        // Only scroll horizontally
        if (e.deltaY !== 0) {
            e.preventDefault();
            scrollWrapper.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    //Event listener for when a eboard card is selected by user
    const cards = document.querySelectorAll('.discord-card');
    const bioSection = document.getElementById('bio-section');
    const bioUsername = document.getElementById('bio-username');
    const bioContent = document.getElementById('bio-content');

    // Map usernames to bios
    const bios = {
    "#reallifetomoya": "Tomoya is our fearless president and code goblin. Known for his clean HTML and love for psychological anime.",
    "#superp2222": "Our Vice President loves JRPGs, fighting games, and unhinged karaoke energy.",
    "#renamed_successfully": "Secretary by day, Genshin main by night. They handle forms and forms of suffering.",
    "#hayamakana": "Treasurer with a calculator in one hand and Sailor Moon merch in the other.",
    "#tangyono": "Our social chair — hosts chaotic events, brings the vibes, lives for cosplay Saturdays.",
    };
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const isSelected = card.classList.contains('selected');
            const username = card.querySelector('.discord-username')?.textContent;
            cards.forEach(c => c.classList.remove('selected'));

                // Add 'selected' to the clicked card
                if (!isSelected) {
                    card.classList.add('selected');
                }

                if (isSelected) {
                    bioSection.classList.add('hidden');
                } else {
                    card.classList.add('selected');
                    bioUsername.textContent = username;
                    bioContent.textContent = bios[username] || "This member's bio is coming soon!";
                    bioSection.classList.remove('hidden');
                }
        });
    });
