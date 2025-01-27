let userPoints = 0; // امتیاز کل کاربر

function displayCourses() {
  const container = document.getElementById("coursesContainer");

  courses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("course");

    let contentHTML = course.content
      .map(
        (item) => `
        <div>
          <button 
            class="activity-button" 
            onclick="completeStep(${course.id}, ${item.order})" 
            ${item.order > 1 && !course.content[item.order - 2].completed ? "disabled" : ""}
          >
            ${item.title}
          </button>
        </div>
      `
      )
      .join("");

    courseDiv.innerHTML = `
      <h2>${course.title}</h2>
      <p>${course.description}</p>
      <div>${contentHTML}</div>
    `;

    container.appendChild(courseDiv);
  });
}

function completeStep(courseId, stepOrder) {
  const course = courses.find((c) => c.id === courseId);
  const step = course.content.find((s) => s.order === stepOrder);

  if (!step.completed) {
    step.completed = true;
    userPoints += course.points;

    alert(`Completed: ${step.title}. You earned ${course.points} points!`);
    updateUI();
  }
}

function updateUI() {
  const container = document.getElementById("coursesContainer");
  container.innerHTML = "";
  displayCourses();

  const congratsMessage = document.getElementById("congratsMessage");
  if (courses.every((course) => course.content.every((s) => s.completed))) {
    congratsMessage.style.display = "block";
    document.getElementById("totalPoints").innerText = `Total Points: ${userPoints}`;
  }
}

// Load courses on page load
window.onload = displayCourses;
