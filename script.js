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
