<template>
    <div class="carousel-container p-14 w-full overflow-hidden">
      <div
        class="carousel-wrapper flex"
        :style="wrapperStyle"
        @transitionend="handleTransitionEnd"
      >
        <div v-for="(image, index) in combinedSlides" :key="index" ref="carouselSlide" class="carousel-slide">
          <img :src="image" class="carousel-img" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RollerCoasterCarousel',
    data() {
      return {
        currentSlide: 0,
        imagesPerSlide: 5,
        images: [
          "https://d35qs7oh01bd1h.cloudfront.net/adidas.webp",
          "https://d35qs7oh01bd1h.cloudfront.net/amazon.webp",
          "https://d35qs7oh01bd1h.cloudfront.net/ariel.webp",
          "https://d35qs7oh01bd1h.cloudfront.net/axa.webp",
          "https://d35qs7oh01bd1h.cloudfront.net/dell.webp",
          "https://d35qs7oh01bd1h.cloudfront.net/burger-king.webp",
          "https://d35qs7oh01bd1h.cloudfront.net/carrefour.webp",
          "https://d35qs7oh01bd1h.cloudfront.net/booking.webp",
          "https://d35qs7oh01bd1h.cloudfront.net/gilette.webp",
        ],
        isTransitioning: true,
        slideWidth: 0, 
      };
    },
    computed: {
      combinedSlides() {
        return [
          ...this.images.slice(-this.imagesPerSlide),
          ...this.images,
          ...this.images.slice(0, this.imagesPerSlide),
        ];
      },
      wrapperStyle() {
        return {
          transform: `translateX(-${this.currentSlide * this.slideWidth}px)`,
          transition: this.isTransitioning ? 'transform 1s ease-in-out' : 'none',
          width: `${this.slideWidth * this.combinedSlides.length}px`, 
        };
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.updateSlideWidth();
        this.startAutoSlide();
        window.addEventListener('resize', this.updateSlideWidth);
      });
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.updateSlideWidth);
    },
    methods: {
      updateSlideWidth() {
        if (this.$refs.carouselSlide && this.$refs.carouselSlide.length) {
          this.slideWidth = this.$refs.carouselSlide[0].offsetWidth;
          this.setImagesPerSlide();
        }
      },
      setImagesPerSlide() {
        const width = window.innerWidth;
        if (width < 640) {
          this.imagesPerSlide = 1; // Mobile
        } else if (width < 768) {
          this.imagesPerSlide = 2; // Tablet
        } else {
          this.imagesPerSlide = 5; // Desktop
        }
      },
      startAutoSlide() {
        setInterval(() => {
          this.nextSlide();
        }, 2000); 
      },
      nextSlide() {
        if (this.currentSlide < this.combinedSlides.length - this.imagesPerSlide) {
          this.currentSlide++;
        } else {
          this.currentSlide = 0; 
          this.isTransitioning = false; 
          this.$nextTick(() => {
            this.isTransitioning = true; 
          });
        }
      },
      handleTransitionEnd() {
        if (this.currentSlide >= this.images.length) {
          this.currentSlide = 0;
          this.isTransitioning = false; 
          this.$nextTick(() => {
            this.isTransitioning = true; 
          });
        }
      },
    },
  };
  </script>
<style scoped>
.carousel-container {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  overflow: hidden; 
}

.carousel-wrapper {
  display: flex;
  transition: transform 1s ease-in-out;
}

.carousel-slide {
  flex: 0 0 auto; 
}

.carousel-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  padding: 5px;
}

@media (max-width: 639px) {
  .carousel-slide {
    width: 100px; 
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .carousel-slide {
    width: 50vw; 
  }
}

@media (min-width: 768px) {
  .carousel-slide {
    width: 150px; 
  }
}
</style>
