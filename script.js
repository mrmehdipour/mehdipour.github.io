function completeActivity(id) {
  const currentActivity = document.querySelector(`.activity[data-id="${id}"]`);
  const nextActivity = document.querySelector(`.activity[data-id="${id + 1}"]`);
  const currentDecoration = currentActivity.closest(".activity-wrapper").querySelector(".activity-decoration");

  currentDecoration.querySelector(".circle").classList.add("completed");
  currentDecoration.querySelector(".line").classList.add("completed");

  if (nextActivity) {
    nextActivity.classList.add("active");
  } else {
    document.getElementById("congratsMessage").style.display = "block";
  }
}

function navigateTo(page) {
  window.location.href = page;
}
