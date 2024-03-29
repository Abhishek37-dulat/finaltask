// function handleFormSubmit(event) {
//   event.preventDefault();

//   const form = event.target;
//   const userDetails = {
//     username: event.target.username.value,
//     email: event.target.email.value,
//     phone: event.target.phone.value,
//   };
//   if (!userDetails.email) {
//     alert("please fill email");
//   } else {
//     localStorage.setItem(userDetails.email, JSON.stringify(userDetails));
//     event.target.username.value = "";
//     event.target.email.value = "";
//     event.target.phone.value = "";
//   }
// }

// function displayUsers() {
//   const userList = document.getElementById("user-list");
//   userList.innerHTML = "";
//   for (let x = 0; x < localStorage.length; x++) {
//     const email = localStorage.key(x);
//     const user = JSON.parse(localStorage.getItem(email));

//     const listItem = document.createElement("li");
//     listItem.textContent = `Username: ${user.username}, Email: ${user.email}, Phone: ${user.phone}`;

//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.addEventListener("click", () => {
//       localStorage.removeItem(email);
//       displayUsers();
//     });

//     const editButton = document.createElement("button");
//     editButton.textContent = "Edit";
//     editButton.addEventListener("click", () => {
//       document.getElementById("username").value = user.username;
//       document.getElementById("email").value = user.email;
//       document.getElementById("phone").value = user.phone;
//       localStorage.removeItem(email);
//       displayUsers();
//     });

//     listItem.appendChild(deleteButton);
//     listItem.appendChild(editButton);

//     userList.appendChild(listItem);
//   }
// }
// displayUsers();

// module.exports = handleFormSubmit;

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    e.preventDefault();
  } else {
    handleFormSubmit(e);
  }
  form.classList.add("was-validated");
});

function handleFormSubmit(event) {
  console.log(event.target.categorie.value);
  const formDetails = {
    Amount: event.target.amount.value,
    Description: event.target.description.value,
    Categorie: event.target.categorie.value,
  };
  console.log(formDetails);
  const userExist = JSON.parse(localStorage.getItem("userDetails")) || [];
  userExist.push(formDetails);
  localStorage.setItem("userDetails", JSON.stringify(userExist));
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("categorie").value = "";
  displayUsers();
}

function displayUsers() {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  for (let x = 0; x < userData.length; x++) {
    const listItem = document.createElement("div");
    listItem.className = "row row-cols-5 mt-3";
    const listData1 = document.createElement("div");
    listData1.className = "col-auto";
    listData1.textContent = `Amount: ${userData[x].Amount}`;
    const listData2 = document.createElement("div");
    listData2.className = "col-auto";
    listData2.textContent = `Description: ${userData[x].Description}`;
    const listData3 = document.createElement("div");
    listData3.className = "col-auto";
    listData3.textContent = `Categorie: ${userData[x].Categorie}`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "col-auto m-2";
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor = "#0F0F0F";
    deleteButton.style.color = "#fff";
    deleteButton.style.border = "none";
    deleteButton.style.outline = "none";
    deleteButton.addEventListener("click", () => {
      const data = userData.filter((item, i) => i != x);
      // console.log(data);
      localStorage.setItem("userDetails", JSON.stringify(data));
      displayUsers();
    });

    const editButton = document.createElement("button");
    editButton.className = "col-auto m-2";
    editButton.textContent = "Edit";
    editButton.style.backgroundColor = "#3484E3";
    editButton.style.color = "#fff";
    editButton.style.border = "none";
    editButton.style.outline = "none";

    editButton.addEventListener("click", () => {
      document.getElementById("amount").value = userData[x].Amount;
      document.getElementById("description").value = userData[x].Description;
      document.getElementById("categorie").value = userData[x].Categorie;
      const data = userData.filter((item, i) => i != x);
      // console.log(data);
      localStorage.setItem("userDetails", JSON.stringify(data));
      displayUsers();
    });

    listItem.appendChild(listData1);
    listItem.appendChild(listData2);
    listItem.appendChild(listData3);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    userList.appendChild(listItem);
  }
}
displayUsers();
