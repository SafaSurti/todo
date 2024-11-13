const firebaseConfig = {
  apiKey: "AIzaSyAPlZ0cHjV2772KaMVRsWT2EJcDc7o6Gjo",
  authDomain: "todo-app-20948.firebaseapp.com",
  databaseURL: "https://todo-app-20948-default-rtdb.firebaseio.com",
  projectId: "todo-app-20948",
  storageBucket: "todo-app-20948.firebasestorage.app",
  messagingSenderId: "343069246846",
  appId: "1:343069246846:web:76be10dbbdd6bdeccedf2f"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.database();


function add() {
  const input = document.getElementById("inputs");
  const key = Date.now().toString();
  const todoItem = {
    value: input.value,
    key
  };
  db.ref("todos/" + key).set(todoItem);
  input.value = "";
}

db.ref("todos").on("child_added", (data) => {
  const list = document.getElementById("ul-list");
  const listItem = document.createElement("li");
  listItem.setAttribute("id", data.key);
  listItem.textContent = data.val().value;


  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => editItem(data.key);

 
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => deleteItem(data.key);

  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);
  list.appendChild(listItem);
});

function deleteAll() {
  db.ref("todos").remove();
  document.getElementById("ul-list").innerHTML = ""; 
}


function deleteItem(key) {
  db.ref("todos/" + key).remove();
  document.getElementById(key).remove(); 
}

function editItem(key) {
  const newValue = prompt("Enter updated value:");
  if (newValue) {
    db.ref("todos/" + key).update({ value: newValue });
    document.getElementById(key).firstChild.nodeValue = newValue; 
  }
}
