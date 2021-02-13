export const initStagger = _group => {
  let _groupAttrs = {
    staggerItems: _group.querySelectorAll(".stagger-item"),
    staggerGap: Number(_group.dataset.staggerGap || 0.1),
    staggerStartTime: Number(_group.dataset.staggerStartTime || 0)
  };

  const setDelay = () => {
    let counter = 0;

    _groupAttrs.staggerItems.forEach(_item => {
      let transDelay =
        counter * _groupAttrs.staggerGap + _groupAttrs.staggerStartTime;

      counter = _item.dataset.resetStagger ? 0 : counter;

      _item.style.transitionDelay = `${transDelay}s`;

      counter++;
    });
  };

  const updateAttr = updates => {
    _groupAttrs = { ...(_groupAttrs || {}), ...updates };
    setDelay();
  };

  _group.updateArr = updateAttr;

  setDelay();
};

// <div data-stagger-gap=".1">
//   <p className="stagger-item">olamide</p>
//   <p className="stagger-item">olamide</p>
//   <p className="stagger-item">olamide</p>
//   <p className="stagger-item" data-reset-stagger="true">
//     olamide
//   </p>
//   <p className="stagger-item">olamide</p>
//   <p className="stagger-item">olamide</p>
//   <p className="stagger-item">olamide</p>
//   <p className="stagger-item">olamide</p>
//   <p className="stagger-item">olamide</p>
// </div>;
