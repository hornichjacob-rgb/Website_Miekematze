const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target); // 👈 stoppt weitere Beobachtung
    }
  });
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const track = document.getElementById("sliderTrack")
const dotsContainer = document.getElementById("sliderDots")

const cards = track.querySelectorAll(".card")

let currentIndex = 0

/* create dots */

cards.forEach((_, index) => {

  const dot = document.createElement("span")

  dot.classList.add("dot")

  if (index === 0)
    dot.classList.add("active")

  dot.addEventListener("click", () => {

    scrollToCard(index)

  })

  dotsContainer.appendChild(dot)

})

const dots = document.querySelectorAll(".dot")

/* scroll */

function scrollToCard(index) {

  currentIndex = index

  const card = cards[index]

  track.scrollTo({
    left: card.offsetLeft,
    behavior: "smooth"
  })

  updateDots()

}

function updateDots() {

  dots.forEach(dot =>
    dot.classList.remove("active")
  )

  dots[currentIndex]
    .classList.add("active")

}

/* buttons */

document
  .querySelector(".next")
  .addEventListener("click", () => {

    if (currentIndex < cards.length - 1)
      currentIndex++

    scrollToCard(currentIndex)

})

document
  .querySelector(".prev")
  .addEventListener("click", () => {

    if (currentIndex > 0)
      currentIndex--

    scrollToCard(currentIndex)

})