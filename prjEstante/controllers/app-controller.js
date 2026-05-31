var AppController = {

  currentStyle: null,
  currentScene: null,

  init: function ()
  {
    this.setWebStorage();
    this.showScene('home');
  },

  showScene: async function (sceneName)
  {
    if (this.currentScene && this.currentScene.destroy)
      this.currentScene.destroy();

    var root = document.getElementById('app-root');
    var res = await fetch('views/' + sceneName + '-scene.html');
    root.innerHTML = await res.text();

    if (this.currentStyle)
      this.currentStyle.remove();

    this.currentStyle = document.createElement('link');
    this.currentStyle.rel = 'stylesheet';
    this.currentStyle.href = 'css/' + sceneName + '-style.css';
    document.head.appendChild(this.currentStyle);

    switch (sceneName)
    {
      case 'home': this.currentScene = HomeController; HomeController.init(); break;
      case 'show': this.currentScene = ShowController; ShowController.init(); break;
      case 'settings': this.currentScene = SettingsController; SettingsController.init(); break;
    }
  },

  setWebStorage: function()
  {
    if(localStorage.getItem("imageDisplayTime") == null)
      localStorage.setItem("imageDisplayTime", 6);
  }

};