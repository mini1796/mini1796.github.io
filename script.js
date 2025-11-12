document.addEventListener("DOMContentLoaded", function () {
  // ======== 1. NAVBAR SCROLL EFFECT ========
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ======== 2. FADE-IN ANIMATION ON SCROLL ========
  // Select all elements with the .fade-in class
  const fadeElements = document.querySelectorAll(".fade-in");

  // Set up the IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the element is in view
        if (entry.isIntersecting) {
          // Add the .visible class to trigger the animation
          entry.target.classList.add("visible");
          // Stop observing the element so the animation doesn't re-run
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Options: trigger the animation when the element is 10% in view
      threshold: 0.1,
    }
  );

  // Observe each fade-in element
  fadeElements.forEach((el) => {
    observer.observe(el);
  });
});

// ======== 3. MODAL LOGIC ========
const modal = document.getElementById("case-study-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("modal-close-btn");
const openBtns = document.querySelectorAll(".open-modal-btn");

// Function to open the modal
const openModal = (e) => {
  // Find the content source ID from the button's data-attribute
  const contentTargetId = e.currentTarget.getAttribute("data-modal-target");
  const contentSource = document.querySelector(contentTargetId);

  if (contentSource) {
    // Inject the content into the modal body
    modalBody.innerHTML = contentSource.innerHTML;
    // Show the modal
    modal.classList.add("visible");
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
  }
};

// Function to close the modal
const closeModal = () => {
  modal.classList.remove("visible");
  // Allow background scrolling again
  document.body.style.overflow = "auto";
  // Clear the content to prevent flashing
  modalBody.innerHTML = "";
};

// Add click event listeners to all "View Case Study" buttons
openBtns.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

// Add click event listener to the close button
closeBtn.addEventListener("click", closeModal);

// Add click event listener to the modal overlay (to close when clicking outside)
modal.addEventListener("click", (e) => {
  // Check if the click is on the overlay itself, not the content
  if (e.target === modal) {
    closeModal();
  }
});

// ======== 4. PROJECT FILTERING LOGIC ========
// This code should only run if the filter menu exists on the page
const filterMenu = document.getElementById("filter-menu");

if (filterMenu) {
  const filterButtons = filterMenu.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-grid .project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get the filter value from the clicked button
      const filterValue = button.getAttribute("data-filter");

      // 1. Update the 'active' class on buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // 2. Filter the cards
      projectCards.forEach((card) => {
        const cardCategories = card.getAttribute("data-category");

        if (filterValue === "all" || cardCategories.includes(filterValue)) {
          // Show the card
          // We remove 'hide' and 'display: none'
          card.classList.remove("hide");
          card.style.display = "block";
        } else {
          // Hide the card
          card.classList.add("hide");
          // We use setTimeout to let the fade-out animation play
          // *before* setting display: none
          setTimeout(() => {
            card.style.display = "none";
          }, 400); // This 400ms must match your CSS transition time
        }
      });
    });
  });
}
