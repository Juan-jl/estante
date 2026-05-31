var ShowController = {

  onKeyDown: null,

  init: async function () {
    this.running = true;
    this.bindEvents();
    await this.showImages();
  },

  bindEvents: function () {
    if (this.onKeyDown) return;

    this.onKeyDown = function (e) {
      switch (e.keyCode) {
        case 13:
        case 461: ShowController.destroy(); AppController.showScene("home"); break;
      }
    };
    document.addEventListener('keydown', this.onKeyDown);
  },

  showImages: async function()
  {
    let images = [];
    let imagesAlreadyDisplayed = [];
    let lastFrameUsed = null;

    for (let i = 1; i <= numberOfImages; i++)
    {
      images.push(i + imagesExtension);
    }

    while (this.running)
    {
      if (images.length < 4)
        images.push(...imagesAlreadyDisplayed);

      images.sort(() => Math.random() - 0.5);

      for (let i = 0; i < 4; i++)
      {
        if (lastFrameUsed == null || lastFrameUsed == 5)
          lastFrameUsed = 1;

        let image = images.shift();

        let imgPath = "media/" + image;
        document.getElementById("img-" + lastFrameUsed).src = imgPath;
        lastFrameUsed++;

        imagesAlreadyDisplayed.push(image);
        await new Promise(r => setTimeout(r, Number(localStorage.getItem("imageDisplayTime") + "000")));
      }
    }
  },

  destroy: function ()
  {
    this.running = false;
    document.removeEventListener('keydown', this.onKeyDown);
    this.onKeyDown = null;
  }

};