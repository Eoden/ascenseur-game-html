export function bindDirectional(id, stateKey, inputState){
  const el = document.getElementById(id);
  if(!el) return;

  const down = (e) => {
    e.preventDefault();
    e.stopPropagation();
    inputState[stateKey] = true;
  };

  const up = (e) => {
    if(e) e.preventDefault();
    inputState[stateKey] = false;
  };

  el.addEventListener('pointerdown', down);
  el.addEventListener('pointerup', up);
  el.addEventListener('pointerleave', up);
  el.addEventListener('pointercancel', up);
}

export function bindAction(id, fn){
  const el = document.getElementById(id);
  if(!el) return;

  el.addEventListener('pointerdown', (e)=>{
    e.preventDefault();
    e.stopPropagation();
    fn();
  });
}
