var HomeController = {

  init: function () {
    this.bindEvents();
    document.getElementById('btn-play-id').focus();
  },

  bindEvents: function () {
    document.getElementById('btn-play-id').addEventListener('click', function () {
      AppController.showScene("show");
    });

    document.getElementById('btn-settings-id').addEventListener('click', function () {
      AppController.showScene("settings");
    });

    HomeController.onKeyDown = function (e) {
      switch (e.keyCode) {
        case 13: document.activeElement.click();    break;
        case 37: HomeController.moveFocus('left');  break;
        case 39: HomeController.moveFocus('right'); break;
      }
    };
    document.addEventListener('keydown', HomeController.onKeyDown);
  },

  moveFocus: function (direction)
  {
    var btns = Array.from(document.querySelectorAll('button'));
    var current = document.activeElement;
    var rect = current.getBoundingClientRect();

    var nearest = btns
      .filter(function (btn) {
        if (btn === current) return false;
        var r = btn.getBoundingClientRect();
        switch (direction) {
          case 'left':  return r.left < rect.left;
          case 'right': return r.left > rect.left;
        }
      })
      .map(function (btn) {
        var r = btn.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        var ex = rect.left + rect.width / 2;
        var ey = rect.top + rect.height / 2;
        var dx = cx - ex;
        var dy = cy - ey;
        var dist = Math.abs(dx) + Math.abs(dy) * 10;
        return { btn: btn, dist: dist };
      })
      .sort(function (a, b) { return a.dist - b.dist; })[0];

    if (nearest) nearest.btn.focus();
  },
  
  destroy: function ()
  {
    document.removeEventListener('keydown', HomeController.onKeyDown);
  },
};