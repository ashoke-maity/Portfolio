let twitter = document.querySelector(".X-icon");
let github = document.querySelector(".github-icon");
let linkedin = document.querySelector(".linkedin-icon");
let projectVisit = document.querySelectorAll(".visit");
let contactform = document.querySelector(".submit");
let showmore = document.querySelector("#show-more-btn");
let hiddenGrids = document.querySelectorAll(".work-grid3.hidden, .work-grid4.hidden, .work-grid5.hidden");
let contact = document.querySelector("#contact");

contact.addEventListener("click", (e) => {
    location.href = "#contacts";
    console.log(e);
});

twitter.addEventListener("click", (e) => {
    open("https://x.com/ashokemaity_", "_blank");
    console.log(e);
});

github.addEventListener("click", (e) => {
    open("https://github.com/ashoke-maity", "_blank");
    console.log(e);
});

linkedin.addEventListener("click", (e) => {
    open("https://www.linkedin.com/in/ashokemaity", "_blank");
    console.log(e);
});

projectVisit.forEach((button) => {
    button.addEventListener('click', (e) => {
        open("https://github.com/ashoke-maity", "_blank");
        console.log(e);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    showmore.addEventListener("click", (e) => {
        console.log("Show more button clicked");

        // Loop through all hidden grids and toggle their visibility
        hiddenGrids.forEach(hiddenGrid => {
            if (hiddenGrid.classList.contains("hidden")) {
                hiddenGrid.classList.remove("hidden");
                hiddenGrid.style.display = "grid";  // Show each grid
            } else {
                hiddenGrid.classList.add("hidden");
                hiddenGrid.style.display = "none";  // Hide each grid
            }
        });

        // Change the button text based on the state of the grids
        if (showmore.textContent === "Show More") {
            showmore.textContent = "Show Less";
        } else {
            showmore.textContent = "Show More";
        }
    });
});

/* video pause and thumbnail showing effect*/
document.querySelectorAll("video").forEach(video => {
    video.addEventListener("play", () => {
        // When one video is played, ensure all videos keep their thumbnails
        document.querySelectorAll("video").forEach(otherVideo => {
            if (otherVideo !== video) {
                otherVideo.pause();
            }
        });
    });

    video.addEventListener("pause", () => {
        // Show the poster of the paused video
        video.load(); // Reload to show the poster correctly
    });

    // Ensure all videos show their poster when the page loads
    video.load(); // Initially show all posters
});

let isClickScrolling = false;

// Set active navlink on click
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function (e) {
        // Remove 'active' class from all links
        document.querySelectorAll('.nav__link').forEach(nav => {
            nav.classList.remove('active');
        });

        // Add 'active' class to the clicked link
        this.classList.add('active');

        // Store the clicked section in localStorage
        const section = this.getAttribute('href') === '#' ? 'logo' : this.getAttribute('href');
        localStorage.setItem('activeSection', section);

        // Smooth scroll to the section
        const targetId = this.getAttribute('href');

        if (targetId === '#home' || targetId === '#') {
            isClickScrolling = true;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            setTimeout(() => {
                isClickScrolling = false;
            }, 1000);
        } else {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                isClickScrolling = true;

                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    isClickScrolling = false;
                }, 1000);
            }
        }
    });
});

// Highlight active section on scroll
window.addEventListener('scroll', () => {
    if (isClickScrolling) {
        return;
    }

    const sections = document.querySelectorAll('section');
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // Adjust for fixed navbar height
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            document.querySelector('.nav__link.active')?.classList.remove('active');
            document.querySelector(`.nav__link[href="#${id}"]`).classList.add('active');

            localStorage.setItem('activeSection', `#${id}`);
        }
    });

    if (scrollPosition === 0) {
        document.querySelector('.nav__link.active')?.classList.remove('active');
    }
});

// Restore active navlink on page reload but without highlighting anything by default
window.addEventListener('load', () => {
    // Remove 'active' class from all links when the page loads
    document.querySelectorAll('.nav__link').forEach(nav => {
        nav.classList.remove('active');
    });

    // Scroll the page to the top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // You can use 'instant' if you want it to scroll instantly instead of smoothly
    });
});




// Get the name and designation elements
const nameElement = document.getElementById('name');
const designationElement = document.getElementById('designation');

// Listen for the end of the name typing animation
nameElement.addEventListener('animationend', () => {
  // Make the designation visible and start typing animation after name is finished
  designationElement.style.visibility = 'visible'; // Set to visible
  designationElement.style.width = '0'; // Reset width to 0 (in case it was expanded earlier)
  
  // Force a reflow to restart the animation
  designationElement.offsetWidth;  // This triggers a reflow
  
  // Start typing animation for the designation
  designationElement.style.animation = 'typing 3s steps(30) 0s forwards';
});



    window.onload = function() {
        // Trigger animations on page load
        document.querySelector('.info-outline').classList.add('animate-fade-in');
        document.querySelector('.imageplaceholder').classList.add('animate-zoom-in');
        document.querySelectorAll('button').forEach(function(button) {
            button.classList.add('animate-slide-in-from-bottom');
        });
        document.querySelectorAll('.work-item').forEach(function(item, index) {
            item.classList.add('animate-slide-in-from-left');
            item.style.animationDelay = `${index * 0.3}s`;
        });

        // For Navbar Links
        document.querySelectorAll('nav li a').forEach(function(link, index) {
            link.classList.add('animate-fade-in');
            link.style.animationDelay = `${index * 0.2}s`;    
        });
    };
