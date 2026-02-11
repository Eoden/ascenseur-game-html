export function bind(id, fn){
  const el = document.getElementById(id);
  if(!el) return;

  const handler = (e) => {
    e.preventDefault();
    fn();
  };

  el.addEventListener('pointerdown', handler);
}
