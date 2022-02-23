declare var global: any;
export function clear() {
  let extra = document.getElementById("extra");
  if (extra) {
    extra.innerHTML = "";
  }
  if (global.view) {
    global.view.destroy();
  }
}