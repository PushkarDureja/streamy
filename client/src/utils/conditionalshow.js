export function ShowAndHide(e, idx) {
    e.stopPropagation();
    console.log(`${idx}more`);
    var x = document.getElementById(`${idx}more`);
    if (x.style.display === "none") {
      x.style.display = "inline"
    } else {
      x.style.display = "none";
    }
  }