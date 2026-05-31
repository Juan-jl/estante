var SettingsController = {

  init: function () {
    this.bindEvents();
    this.setValues();
    document.getElementById('btn-display-time-down-id').focus();
  },

  bindEvents: function () {
    var imageDisplayTime = document.getElementById('input-image-display-time-id');

    document.getElementById('btn-display-time-up-id').addEventListener('click', function () {
      imageDisplayTime.value++;
      localStorage.setItem("imageDisplayTime", imageDisplayTime.value);
    });

    document.getElementById('btn-display-time-down-id').addEventListener('click', function () {
      if (imageDisplayTime.value > 1) {
        imageDisplayTime.value--;
        localStorage.setItem("imageDisplayTime", imageDisplayTime.value);
      }
    });

    document.getElementById('btn-back-id').addEventListener('click', function () {
      AppController.showScene("home");
    });

    var elements = [
      document.getElementById('btn-display-time-down-id'),
      document.getElementById('btn-display-time-up-id'),
      document.getElementById('btn-back-id')
    ];

    var focusIndex = 0;

    SettingsController.onKeyDown = function (e) {
      switch (e.keyCode) {
        case 39:
          if (focusIndex < elements.length - 1) {
            focusIndex++;
            elements[focusIndex].focus();
          }
          break;
        case 37:
          if (focusIndex > 0) {
            focusIndex--;
            elements[focusIndex].focus();
          }
          break;
        case 40:
          focusIndex = 2;
          elements[focusIndex].focus();
          break;
        case 38:
          if (focusIndex === 2) {
            focusIndex = 1;
            elements[focusIndex].focus();
          }
          break;
        case 461:
          document.getElementById('btn-back-id').click();
          break;
      }
    };
    document.addEventListener('keydown', SettingsController.onKeyDown);
  },

  setValues: function () {
    document.getElementById('input-image-display-time-id').value = localStorage.getItem("imageDisplayTime");
  },

  destroy: function () {
    document.removeEventListener('keydown', SettingsController.onKeyDown);
  }
};