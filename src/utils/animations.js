export default class CssAnimations {
  static textAppearOnScrollMethod(event, element, maximumShow, classname) {
    const getReveals = document.querySelectorAll(element);
    const currentScreenHeight = window.innerHeight;
    for (let i = 0; i < getReveals.length; i++) {
      const element = getReveals[i].getBoundingClientRect().top;
      if (element < currentScreenHeight - maximumShow) {
        getReveals[i].classList.add(classname);
      } else {
        getReveals[i].classList.remove(classname);
      }
    }
  }

  static customCursorOnMOuseMoveMethod(e) {
    const cursor = document.querySelector(".cursor");
    const cursor2 = document.querySelector(".cursor2");
    const pagex = e.pageX;
    const pagey = e.pageY;
    if (cursor) {
      cursor.style.top = pagey + "px";
      cursor.style.left = pagex + "px";
    }
    if (cursor2) {
      cursor2.style.top = cursor.style.top;
      cursor2.style.left = cursor.style.left;
    }
  }

  static typewritingAnimation(element, array) {
    let typeText = "";

    function processElement(i) {
      setTimeout(() => {
        const letter = array[i];
        typeText += letter;
        const moralElement = document.querySelector(element);
        if (moralElement) {
          moralElement.textContent = typeText;
        }
      }, i * 200);
    }

    for (let i = 0; i < array.length; i++) {
      processElement(i);
    }
  }

  static async mouseOverTextVisible(name) {
    const getMouseElement = document.querySelector(name);
    if (getMouseElement) {
      getMouseElement?.classList.add("visibleText");
    }
  }

  static async mouseOutTextInVicible(name) {
    const getMouseElement = document.querySelector(name);
    if (getMouseElement) {
      getMouseElement?.classList.remove("visibleText");
    }
  }
}
