export function bind(id, fn){
  const el = document.getElementById(id);
  if(!el) return;
  el.addEventListener('touchstart', e=>{
    e.preventDefault();
    fn();
  }, {passive:false});
}
