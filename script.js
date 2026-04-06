// Fill Day
const daySelect = document.getElementById('daySelect');
daySelect.innerHTML = '<option value="">Select Day</option>';

for (let i = 1; i <= 31; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  daySelect.appendChild(option);
}

// Fill Year
const yearSelect = document.getElementById('yearSelect');
const currentYear = new Date().getFullYear();

yearSelect.innerHTML = '<option value="">Select Year</option>';

for (let i = currentYear; i >= 1920; i--) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  yearSelect.appendChild(option);
}

// Main Function
function calculateAge() {
  const name = document.getElementById('nameInput').value.trim();
  const day = parseInt(daySelect.value);
  const month = parseInt(document.getElementById('monthSelect').value);
  const year = parseInt(yearSelect.value);

  if (!name || !day || !month || !year) {
    alert("Please fill all fields!");
    return;
  }

  const today = new Date();
  const birth = new Date(year, month - 1, day);

  // Invalid date check
  if (
    birth.getFullYear() !== year ||
    birth.getMonth() !== month - 1 ||
    birth.getDate() !== day
  ) {
    alert("Invalid date!");
    return;
  }

  if (birth > today) {
    alert("Future date not allowed!");
    return;
  }

  // Calculate age
  let age = today.getFullYear() - year;
  const m = today.getMonth() - (month - 1);

  if (m < 0 || (m === 0 && today.getDate() < day)) {
    age--;
  }

  // 🎂 NEXT BIRTHDAY CALCULATION
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);

  // If birthday already passed this year
  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, month - 1, day);
  }

  const diffTime = nextBirthday - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Result UI
  const box = document.getElementById('resultBox');
  const text = document.getElementById('resultText');

  box.className = "result-box show";

  let msg = "", color = "", emoji = "";

  if (age <= 12) {
    emoji = "🍼"; color = "blue";
    msg = "Enjoy your childhood!";
  } else if (age <= 17) {
    emoji = "🎒"; color = "blue";
    msg = "Teenage life is awesome!";
  } else if (age <= 25) {
    emoji = "🎉"; color = "green";
    msg = "Life just started!";
  } else if (age <= 40) {
    emoji = "💼"; color = "yellow";
    msg = "Focus on your goals!";
  } else if (age <= 60) {
    emoji = "🔥"; color = "yellow";
    msg = "Experience matters!";
  } else {
    emoji = "👴"; color = "red";
    msg = "Respect! Wisdom level!";
  }

  box.classList.add(color);

  // 🎯 FINAL OUTPUT
  text.innerHTML = `
    ${emoji} <b>${name}, you are ${age} years old.</b><br>
    🎂 Next birthday in <b>${daysLeft} day(s)</b><br>
    ${msg}
  `;
}