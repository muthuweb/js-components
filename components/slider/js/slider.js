"use strict";

(function () {
  const slider = document.querySelector(".slider");
  const sliderItem = slider.children;
  const sliderWidth = slider.clientWidth;

  let sliderHTML = "";

  for (let i = 0; i < sliderItem.length; i++) {
    sliderHTML += `<div class="slider__item">${sliderItem[i].outerHTML}</div>`;
  }

  function dots() {
    let html = "";
    for (let i = 0; i < sliderItem.length; i++) {
      html +=
        '<button role="button" class="slider__dot"><span></span></button>';
    }
    let display = "";
    if (sliderItem.length > 1) {
      display = `<div class="slider__dots">${html}</div>`;
    }
    return display;
  }

  const sliderWrap = `
                <div class="slider__wrap">
                    <div class="slider__outer">
                        <div class="slider__list">
                            ${sliderHTML}
                        </div>
                        <div class="slider__nav">
                            <button type="button" role="presentation" class="slider__prev">
                                <span aria-label="Previous">‹</span>
                            </button>
                            <button type="button" role="presentation" class="slider__next">
                                <span aria-label="Next">›</span>
                            </button>
                        </div>
                    </div>
                    ${dots()}
                </div>
                `;
  slider.innerHTML = sliderWrap;

  const sliderList = slider.querySelector(".slider__list");
  const sliderChild = slider.querySelectorAll(".slider__item");

  sliderList.style.width = sliderChild.length * sliderWidth + "px";

  for (let i = 0; i < sliderChild.length; i++) {
    sliderChild[i].style.width = sliderWidth + "px";
  }

  const dotList = slider.querySelector(".slider__dots");

  function moveSlide(count = 0) {
    sliderList.style.transform = `translate3d(-${
      count * sliderWidth
    }px, 0px, 0px)`;

    for (let i = 0; i < dotList.children.length; i++) {
      dotList.children[i].classList.remove("active");
    }
    dotList.children[count].classList.add("active");
  }
  moveSlide(0);

  let dotListCount = dotList.children.length;

  function getElementIndex(dots, el) {
    let elem = el.tagName === "SPAN" ? el.parentElement : el;
    let index = [...dots.children].indexOf(elem);
    return index;
  }

  let currentSlide = 0;

  dotList.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON" || event.target.tagName === "SPAN") {
      const index = getElementIndex(this, event.target);
      currentSlide += index;
      moveSlide(index);
    }
  });

  slider
    .querySelector(".slider__prev")
    .addEventListener("click", function (event) {
      if (currentSlide >= sliderItem.length) {
        currentSlide += -1;
        moveSlide(currentSlide);
      }
    });

  slider
    .querySelector(".slider__next")
    .addEventListener("click", function (event) {
      if (currentSlide <= sliderItem.length) {
        currentSlide += 1;
        moveSlide(currentSlide);
      }
    });
})();
