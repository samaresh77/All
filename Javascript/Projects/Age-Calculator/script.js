const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");
const detailsEl = document.getElementById("details");

btnEl.addEventListener("click", calculateAge);

function calculateAge() {
  const birthdayValue = birthdayEl.value;

  if (!birthdayValue) {
    alert("Please select your birth date.");
    return;
  }

  const birthDate = new Date(birthdayValue);
  const today = new Date();

  if (birthDate > today) {
    resultEl.innerText = "Invalid date!";
    detailsEl.innerHTML = "";
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;

    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );

    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  resultEl.innerText =
    `🎉 ${years} Years, ${months} Months, ${days} Days`;

  const birthDay = getBirthDay(birthDate);
  const zodiac = getZodiacSign(
    birthDate.getDate(),
    birthDate.getMonth() + 1
  );

  const totalDaysLived = Math.floor(
    (today - birthDate) /
    (1000 * 60 * 60 * 24)
  );

  const nextBirthdayDays =
    getNextBirthdayCountdown(birthDate);

  detailsEl.innerHTML = `
    <p>📅 Date of Birth: ${birthDate.toDateString()}</p>
    <p>🗓️ Born on: ${birthDay}</p>
    <p>⭐ Zodiac Sign: ${zodiac}</p>
    <p>⏰ Total Days Lived: ${totalDaysLived.toLocaleString()}</p>
    <p>🎂 Next Birthday In: ${nextBirthdayDays} days</p>
  `;
}

function getBirthDay(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return days[date.getDay()];
}

function getNextBirthdayCountdown(birthDate) {
  const today = new Date();

  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(
      today.getFullYear() + 1
    );
  }

  return Math.ceil(
    (nextBirthday - today) /
    (1000 * 60 * 60 * 24)
  );
}

function getZodiacSign(day, month) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return "Aries ♈";

  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return "Taurus ♉";

  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return "Gemini ♊";

  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return "Cancer ♋";

  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return "Leo ♌";

  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return "Virgo ♍";

  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return "Libra ♎";

  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio ♏";

  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius ♐";

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Capricorn ♑";

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius ♒";

  return "Pisces ♓";
}