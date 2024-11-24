const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");
const phoneCode = document.getElementById("phone-code");
const carBrand = document.getElementById("car-brand");
const carModel = document.getElementById("car-model");
const privacyCheckbox = document.getElementById("privacy");
const privacyError = document.getElementById("privacy-error");
const carError = document.getElementById("car-error");

// Санитизация ввода для предотвращения XSS атак
function sanitizeInput(input) {
  return input.replace(/[<>'"]/g, (char) => `&#${char.charCodeAt(0)};`);
}

// Проверка номера телефона
phoneInput.addEventListener("input", () => {
  let phoneValue = phoneInput.value.replace(/\D/g, ""); // Удалить нецифровые символы
  phoneInput.value = phoneValue; // Обновить поле ввода

  if (phoneValue.length < 7 || phoneValue.length > 10) {
    phoneError.textContent = "Die Telefonnummer muss zwischen 7 und 10 Ziffern enthalten.";
    phoneError.style.display = "block";
  } else {
    phoneError.style.display = "none";
  }
});

// Обновление подсказки для номера телефона при изменении кода
phoneCode.addEventListener("change", () => {
  phoneInput.placeholder = `${phoneCode.value} 123 456 7890`;
});

// Синхронизация марок и моделей
const carModels = {
  Mazda: ["Mazda 3", "Mazda 6", "CX-5"],
  BMW: ["3er", "5er", "X5"],
  Toyota: ["Corolla", "Camry", "RAV4"],
  Mercedes: ["A-Klasse", "C-Klasse", "E-Klasse"],
  Audi: ["A4", "A6", "Q7"]
};

carBrand.addEventListener("change", () => {
  const selectedBrand = sanitizeInput(carBrand.value); // Санитизация выбора марки
  carModel.innerHTML = `<option value="">Wählen Sie ein Modell</option>`; // Очистка предыдущего списка

  if (carModels[selectedBrand]) {
    carModels[selectedBrand].forEach((model) => {
      const option = document.createElement("option");
      option.value = sanitizeInput(model); // Санитизация модели
      option.textContent = sanitizeInput(model); // Санитизация модели
      carModel.appendChild(option); // Добавление новых моделей
    });
  }
  // Скрыть ошибку, если марка выбрана
  if (carBrand.value) {
    carError.style.display = "none";
  }
});

// Проверка выбора модели
carModel.addEventListener("change", () => {
  if (!carBrand.value) {
    carError.textContent = "Bitte wählen Sie zuerst eine Marke.";
    carError.style.display = "block"; // Показываем ошибку
  } else {
    carError.style.display = "none"; // Ошибка скрыта, если марка выбрана
  }
});

// Проверка чекбокса при отправке формы
document.getElementById("diagnostics-form").addEventListener("submit", (e) => {
  if (!privacyCheckbox.checked) {
    e.preventDefault();
    privacyError.textContent = "Bitte akzeptieren Sie die Datenschutzbestimmungen.";
    privacyError.style.display = "block";
  } else {
    privacyError.style.display = "none";
  }
});
