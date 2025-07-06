// Функция для открытия модалки
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Блокируем прокрутку страницы
}

// Функция для закрытия модалки
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Возвращаем прокрутку
}

// Закрытие модалки по клику вне контента
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Закрытие по кнопке ×
  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) closeModal(modal.id);
    });
  });
});