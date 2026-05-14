const init = function() {
    const sectionContainer = document.querySelector(".section-container");
    // const sections = sectionContainer.querySelectorAll("section");
    // for (const section of sections) {
    //     section.style.backgroundColor = randomColor();
    // }

    const timeline = document.querySelector(".timeline");
    const marker = document.querySelector(".progress");
    if (!timeline || !marker) return;
    const updateMarker = () => {
        const maxScroll = sectionContainer.scrollHeight - sectionContainer.clientHeight;
        const p = maxScroll > 0 ? sectionContainer.scrollTop / maxScroll : 0;
        const rail = timeline.getBoundingClientRect().height;
        marker.style.height = `${p * rail}px`;
    };
    sectionContainer.addEventListener("scroll", updateMarker, { passive: true });
    window.addEventListener("resize", updateMarker);
    updateMarker();
    createTimelineMarkers();
}

function focusEvent(n) {
    const sectionContainer = document.querySelector(".section-container");
    sectionContainer.children[n].scrollIntoView();
}

function createTimelineMarkers() {
    const timeline = document.querySelector(".timeline");
    const sectionContainer = document.querySelector(".section-container");
    if (!timeline || !sectionContainer) return;

    timeline.querySelectorAll(".timeline-dot").forEach((el) => el.remove());

    const sections = sectionContainer.querySelectorAll("section");
    const n = sections.length;
    if (n === 0) return;

    for (let i = 0; i < n; i++) {
        const dot = document.createElement("div");
        dot.className = "timeline-dot";
        dot.style.top = `${((i) / (n - 1)) * 100}%`;
        timeline.appendChild(dot);
        dot.addEventListener("click", function(){focusEvent(i)});
    }
}

function randomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

window.addEventListener("load", init);
