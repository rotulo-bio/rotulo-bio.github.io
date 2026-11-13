/*
 * Minimal dependency-free integration: every WhatsApp entry point receives the
 * same pre-filled message. The links remain usable even if JavaScript is blocked.
 */
(function () {
  "use strict";

  if (typeof document === "undefined") {
    return;
  }

  var whatsappNumber = "351911911843";
  var quoteMessage = "Olá! Vim através do Instagram da GG Motors e gostaria de pedir um orçamento para o meu carro.";
  var whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(quoteMessage);
  var links = document.querySelectorAll(".js-whatsapp");

  for (var index = 0; index < links.length; index += 1) {
    links[index].href = whatsappUrl;
  }
  var galleries = document.querySelectorAll("[data-vehicle-gallery]");

  for (var galleryIndex = 0; galleryIndex < galleries.length; galleryIndex += 1) {
    setupVehicleGallery(galleries[galleryIndex]);
  }

  function setupVehicleGallery(gallery) {
    var mainImage = gallery.querySelector("[data-gallery-main]");
    var counter = gallery.querySelector("[data-gallery-count]");
    var previousButton = gallery.querySelector("[data-gallery-previous]");
    var nextButton = gallery.querySelector("[data-gallery-next]");
    var thumbnails = gallery.querySelectorAll("[data-gallery-thumb]");
    var activeIndex = 0;

    function selectImage(nextIndex) {
      activeIndex = (nextIndex + thumbnails.length) % thumbnails.length;

      for (var thumbIndex = 0; thumbIndex < thumbnails.length; thumbIndex += 1) {
        var isActive = thumbIndex === activeIndex;
        thumbnails[thumbIndex].classList.toggle("is-active", isActive);
        thumbnails[thumbIndex].setAttribute("aria-pressed", isActive ? "true" : "false");
      }

      mainImage.src = thumbnails[activeIndex].getAttribute("data-src");
      mainImage.alt = thumbnails[activeIndex].getAttribute("data-alt");
      counter.textContent = (activeIndex + 1) + " / " + thumbnails.length;
      thumbnails[activeIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }

    for (var thumbIndex = 0; thumbIndex < thumbnails.length; thumbIndex += 1) {
      (function (selectedIndex) {
        thumbnails[selectedIndex].addEventListener("click", function () {
          selectImage(selectedIndex);
        });
      }(thumbIndex));
    }

    previousButton.addEventListener("click", function () { selectImage(activeIndex - 1); });
    nextButton.addEventListener("click", function () { selectImage(activeIndex + 1); });
  }
})();
