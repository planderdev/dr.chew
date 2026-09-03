const videoEls = document.querySelectorAll('.video_product_ver2_video');

videoEls.forEach(videoEl => {
  const pdEl = videoEl.parentElement.parentElement.querySelector('.video_product_ver2_pd');

  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const width = entry.contentRect.width;
      const height = width * 16 / 9;

      videoEl.style.height = height + 'px';
      if (pdEl) {
        pdEl.style.height = height + 'px';
      }
    }
  });

  observer.observe(videoEl);
});


$(document).ready(function () {
    const scroll_pd = document.querySelector("#video_product_ver2 .ec-base-product");
    let isWheelAttached = false;

    function handleScrollEvent(shouldAttach) {
        if (!scroll_pd) return;

        if (shouldAttach && !isWheelAttached) {
            scroll_pd.addEventListener("wheel", wheelHandler, { passive: false });
            isWheelAttached = true;
        } else if (!shouldAttach && isWheelAttached) {
            scroll_pd.removeEventListener("wheel", wheelHandler, { passive: false });
            isWheelAttached = false;
        }
    }

    function wheelHandler(evt) {
        evt.preventDefault();
        scroll_pd.scrollLeft += evt.deltaY;
    }

    const mq = window.matchMedia("(max-width: 1000px)");
    handleScrollEvent(mq.matches); // 초기 진입 시 실행

    // 화면 크기 변경 시
    mq.addEventListener("change", function (e) {
        handleScrollEvent(e.matches);
    });
});

