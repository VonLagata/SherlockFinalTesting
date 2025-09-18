// CLUE
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", () => {
    modal.classList.add("open");
});
    closeBtn.addEventListener("click", () => { modal.classList.remove("open");
});

// OPEN VALUT
// entire file or replace the OPEN VAULT portion with this
document.addEventListener("DOMContentLoaded", () => {
  // ---------- CLUE modal (keeps your original behavior) ----------
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");
  const modal = document.getElementById("modal");
  if (openBtn) openBtn.addEventListener("click", () => modal.classList.add("open"));
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  // ---------- OPEN VAULT ----------
  const openVaultBtn = document.getElementById("opn-vault");
  const openVaultModal = document.getElementById("openVault");
  const openVaultInner = openVaultModal.querySelector(".openVault-inner");
  const inputCode1 = document.getElementById("code-1");
  const inputCode2 = document.getElementById("code-2");

  // create alert banner element (keeps your original style)
  const alertBanner = document.createElement("div");
  alertBanner.style.position = "fixed";
  alertBanner.style.top = "0";
  alertBanner.style.left = "0";
  alertBanner.style.right = "0";
  alertBanner.style.backgroundColor = "red";
  alertBanner.style.color = "white";
  alertBanner.style.textAlign = "center";
  alertBanner.style.padding = "10px";
  alertBanner.style.fontWeight = "bold";
  alertBanner.style.zIndex = "10000";
  alertBanner.style.display = "none";
  alertBanner.style.fontFamily = "Arial, sans-serif";
  document.body.appendChild(alertBanner);

  function showAlert(message) {
    alertBanner.textContent = message;
    alertBanner.style.display = "block";
    setTimeout(() => {
      alertBanner.style.display = "none";
    }, 3000);
  }

  // helper to close vault modal
  function closeVault() {
    openVaultModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // open-vault click: validate codes
  if (openVaultBtn) {
    openVaultBtn.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default in case it's a button inside a form or anchor
      const code1Value = (inputCode1 && inputCode1.value || "").trim();
      const code2Value = (inputCode2 && inputCode2.value || "").trim().toLowerCase();

      const correctCode1 = "9129115251521";
      const correctCode2 = "ilikeyou";

      if (code1Value === correctCode1 && code2Value === correctCode2) {
        // show modal
        openVaultModal.classList.add("open");
        document.body.style.overflow = "hidden"; // prevent background scroll

        // wait until modal is painted and sizes are available, then set initial no btn pos
        requestAnimationFrame(() => requestAnimationFrame(() => resetNoButtonPosition()));
      } else {
        showAlert("Mali po ate. Kaya mo yan :)");
      }
    });
  }

  // close when clicking the overlay background
  openVaultModal.addEventListener("click", (e) => {
    if (e.target === openVaultModal) closeVault();
  });

  // Yes button behaviour
  const yesBtn = openVaultModal.querySelector(".yes");
  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      window.location.href = "love-letter.html";
    });
  }

  // ---------- NO button logic (smooth, stays inside modal, avoids mouse) ----------
  const noBtn = openVaultModal.querySelector(".no");
  if (!noBtn) return; // nothing more to do if .no doesn't exist

  // ensure inner container is a positioned parent (we also added CSS, but ensure here too)
  openVaultInner.style.position = openVaultInner.style.position || "relative";
  openVaultInner.style.overflow = openVaultInner.style.overflow || "hidden";

  // position the noBtn absolutely and add a smooth transition
  noBtn.style.position = "absolute";
  noBtn.style.transition = "left 0.35s ease, top 0.35s ease";

  // reset initial position (center bottom-ish)
  function resetNoButtonPosition() {
    const innerW = openVaultInner.clientWidth;
    const innerH = openVaultInner.clientHeight;
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;

    // if sizes are zero (modal still hidden), try again shortly
    if (innerW === 0 || innerH === 0 || btnW === 0 || btnH === 0) {
      requestAnimationFrame(() => requestAnimationFrame(() => resetNoButtonPosition()));
      return;
    }

    const left = Math.max(0, Math.round((innerW - btnW) / 2));
    const top = Math.max(0, Math.round(innerH * 0.7 - btnH / 2));
    noBtn.style.left = left + "px";
    noBtn.style.top = top + "px";
  }

  // When hovering / attempting to reach the No button, move it away
  noBtn.addEventListener("mouseenter", (e) => {
    // get modal inner and button rectangles
    const innerRect = openVaultInner.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const cursorX = e.clientX - innerRect.left;
    const cursorY = e.clientY - innerRect.top;

    const btnCenterX = (btnRect.left - innerRect.left) + btnRect.width / 2;
    const btnCenterY = (btnRect.top - innerRect.top) + btnRect.height / 2;

    let dx = btnCenterX - cursorX;
    let dy = btnCenterY - cursorY;
    const dist = Math.hypot(dx, dy) || 1;

    // how far away to jump (based on modal size)
    const preferredMove = Math.max(80, Math.min(innerRect.width * 0.35, 180));

    // target center is further out in the same direction away from cursor
    const targetCenterX = btnCenterX + (dx / dist) * preferredMove;
    const targetCenterY = btnCenterY + (dy / dist) * preferredMove;

    const btnW = btnRect.width;
    const btnH = btnRect.height;

    const maxLeft = innerRect.width - btnW;
    const maxTop = innerRect.height - btnH;

    // convert center -> top-left and clamp inside bounds
    let targetLeft = targetCenterX - btnW / 2;
    let targetTop = targetCenterY - btnH / 2;

    targetLeft = Math.max(0, Math.min(maxLeft, targetLeft));
    targetTop = Math.max(0, Math.min(maxTop, targetTop));

    noBtn.style.left = Math.round(targetLeft) + "px";
    noBtn.style.top = Math.round(targetTop) + "px";
});

  // If modal class changes to 'open', reset the no button (covers when user re-opens)
const observer = new MutationObserver((mutations) => {
for (const m of mutations) {
    if (m.attributeName === "class") {
    if (openVaultModal.classList.contains("open")) {
        requestAnimationFrame(() => requestAnimationFrame(() => resetNoButtonPosition()));
    }
    }
}
});
observer.observe(openVaultModal, { attributes: true });

// initial safety call in case modal is already open on load
requestAnimationFrame(() => {
if (openVaultModal.classList.contains("open")) {
    resetNoButtonPosition();
}
});
});

