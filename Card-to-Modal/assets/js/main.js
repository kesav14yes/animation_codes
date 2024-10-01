// implemant this transition with learning this post https://tahazsh.com/blog/smooth-card-to-modal-transition

let expandedCard;

let initialProperties = [];
let finalProperties = [];
let cardClip;

function setup() {
  document.addEventListener("click", (e) => {
    // Don't continue if a card is already expanded
    if (expandedCard) return;

    // Get the clicked card by checking if the clicked
    // element is the card or one of its children
    if (e.target.matches(".js-card")) {
      expandedCard = e.target;
    } else if (e.target.closest(".js-card")) {
      expandedCard = e.target.closest(".js-card");
    }

    // If we couldn't get the card, stop the execution
    if (!expandedCard) return;

    // Get the close button and attach a click event
    // that calls the collapse() function
    const closeButton = expandedCard.querySelector(".js-close-button");
    closeButton.addEventListener("click", collapse);

    expand();
  });
}

function expand() {
  // Add transitionend event listener to remove styles
  // when the animation is done
  getCardContent().addEventListener("transitionend", onExpandTransitionEnd);

  disablePageScroll();

  // Collect the properties for the collapsed card.
  // These properties will be used for transform, opacity, and clipPath
  collectInitialProperties();

  // Switch the card to the expanded state
  expandedCard.classList.add("card--expanded");

  // Collect the properties for the expanded card
  collectFinalProperties();

  // Set transform and opacity on the expanded card.
  // This step will move the elements back to their
  // original positions when it was collapsed
  setInvertedTransformAndOpacity();

  // Clip the card content to look like it's collapsed,
  // even though the card is actually expanded
  clipCardContent();

  // Run the following code in the next frame
  requestAnimationFrame(() => {
    expandedCard.classList.add("card--animatable");
    // Expanding is just resetting the values of
    // transform, opacity, and clipPath
    startExpanding();
  });
}

function collectInitialProperties() {
  for (const element of getAnimatableElements()) {
    initialProperties.push({
      rect: element.getBoundingClientRect(),
      opacity: parseFloat(window.getComputedStyle(element).opacity),
    });
  }

  const cardRect = expandedCard.getBoundingClientRect();
  cardClip = {
    top: cardRect.top,
    right: window.innerWidth - cardRect.right,
    bottom: window.innerHeight - cardRect.bottom,
    left: cardRect.left,
  };
}

function collectFinalProperties() {
  for (const element of getAnimatableElements()) {
    finalProperties.push({
      rect: element.getBoundingClientRect(),
      opacity: parseFloat(window.getComputedStyle(element).opacity),
    });
  }
}

function setInvertedTransformAndOpacity() {
  for (const [i, element] of getAnimatableElements().entries()) {
    // Calculate the difference for left, top, and width
    const left = initialProperties[i].rect.left - finalProperties[i].rect.left;
    const top = initialProperties[i].rect.top - finalProperties[i].rect.top;
    const scale =
      initialProperties[i].rect.width / finalProperties[i].rect.width;

    // Use the calculated values here
    element.style.transform = `
      translate(${left}px, ${top}px)
      scale(${scale})
    `;

    // Set the opacity to the initial opacity of the element
    element.style.opacity = `${initialProperties[i].opacity}`;
  }
}

function clipCardContent() {
  getCardContent().style.clipPath = `
    inset(${cardClip.top}px ${cardClip.right}px ${cardClip.bottom}px ${cardClip.left}px round 5px)
  `;
}

function startExpanding() {
  for (const [i, element] of getAnimatableElements().entries()) {
    element.style.transform = "translate(0, 0) scale(1)";
    element.style.opacity = `${finalProperties[i].opacity}`;
  }

  getCardContent().style.clipPath = "inset(0)";
}

function onExpandTransitionEnd(e) {
  const cardContent = getCardContent();
  // Check if the transition ended for the
  // card content element, which would be the clip-path animation
  if (e.target !== cardContent) return;

  // Disable animations
  expandedCard.classList.remove("card--animatable");

  cardContent.removeEventListener("transitionend", onExpandTransitionEnd);

  removeStyles();
}

function removeStyles() {
  for (const element of getAnimatableElements()) {
    element.style = null;
  }

  getCardContent().style = null;
}

function disablePageScroll() {
  document.body.style.overflow = "hidden";
}

function enablePageScroll() {
  document.body.style.overflow = "";
}

function collapse() {
  getCardContent().addEventListener("transitionend", onCollapseTransitionEnd);

  setCollapsingInitialStyles();

  requestAnimationFrame(() => {
    expandedCard.classList.add("card--animatable");
    startCollapsing();
  });
}

function setCollapsingInitialStyles() {
  for (const element of getAnimatableElements()) {
    element.style.transform = `translate(0, 0) scale(1)`;
  }

  getCardContent().style.clipPath = "inset(0)";
}

function startCollapsing() {
  setInvertedTransformAndOpacity();
  clipCardContent();
}

function onCollapseTransitionEnd(e) {
  const cardContent = getCardContent();
  if (e.target !== cardContent) return;

  expandedCard.classList.remove("card--animatable");
  expandedCard.classList.remove("card--expanded");

  cardContent.removeEventListener("transitionend", onCollapseTransitionEnd);

  removeStyles();
  enablePageScroll();

  cleanup();
}

function cleanup() {
  expandedCard = null;
  cardClip = null;
  initialProperties = [];
  finalProperties = [];
}
setup();

function getAnimatableElements() {
  if (!expandedCard) return;
  return expandedCard.querySelectorAll(".js-animatable");
}

function getCardContent() {
  if (!expandedCard) return;
  return expandedCard.querySelector(".card__content");
}
