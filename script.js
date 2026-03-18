**script.js**

```javascript
// Később ide jöhetnek effektek (pl. menü animáció, retró hangulat)
console.log("Retro weboldal betöltve!");
```

function searchConsole() {
  const query = document.getElementById('consoleSearch').value.toLowerCase();
  const links = document.querySelectorAll('nav a');
  let found = false;

  links.forEach(link => {
    if (link.textContent.toLowerCase().includes(query)) {
      window.location.href = link.href;
      found = true;
    }
  });

  if (!found) {
    alert('Nincs találat a keresett konzolra.');
  }
}
async function loadHistory() {
  const container = document.getElementById("history-content");
  if (!container) return;

  try {
    const response = await fetch("data/nes.json");
    const data = await response.json();

    data.sections.forEach(section => {
      const sectionEl = document.createElement("section");

      if (section.type === "video") {
        sectionEl.classList.add("video");
      } else {
        sectionEl.classList.add("history-block");
      }

      const title = document.createElement("h2");
      title.textContent = section.title;
      sectionEl.appendChild(title);

      if (section.type === "text") {
        section.content.forEach(paragraph => {
          const p = document.createElement("p");
          p.textContent = paragraph;
          sectionEl.appendChild(p);
        });
      }

      if (section.type === "video") {
        const iframe = document.createElement("iframe");
        iframe.width = "560";
        iframe.height = "315";
        iframe.src = section.youtube;
        iframe.title = section.title;
        iframe.frameBorder = "0";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        sectionEl.appendChild(iframe);
      }

      container.appendChild(sectionEl);
    });
  } catch (error) {
    container.innerHTML = "<p>Nem sikerült betölteni a tartalmat.</p>";
    console.error("Hiba a history betöltésekor:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadHistory);
