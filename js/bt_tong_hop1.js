// hàm renderdate từ mảng
let studentList = [];
let create = false;
function renderData() {
  let render = document.querySelector(".student_list_item");
  render.innerHTML = "";
  for (let i = 0; i < studentList.length; i++) {
    render.innerHTML += `<tr>
                <td>${i + 1}</td>
                <td>${studentList[i][0]}</td>
                <td>${studentList[i][1]}</td>
                <td>${studentList[i][2]}</td>
                <td>${studentList[i][3]}</td>
                <td>${studentList[i][4]}</td>
                <td>${studentList[i][5]}</td>
                <td><a href="#" onclick="editStudent('${
                  studentList[i][0]
                }')">edit</a>| <a href="#" onclick="deleteStudent('${
      studentList[i][0]
    }')">delete</a></td>
              </tr>`;
  }
}
// hàm bắt lỗi dữ liệu nhập vào
function checkValid() {
  let studentId = document.getElementById("student_id").value;
  let fullName = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let hometown = document.getElementById("hometown").value;
  let gender = document.querySelector("input[name='gender']:checked").value;
  //check mã sinh viên
  if (!create) {
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i][0] === studentId) {
        alert("Mã sinh viên đã tồn tại vui lòng nhâp mã khác");
        return false;
      }
    }
  }

  // check name
  if (fullName === "") {
    alert("Vui long nhap ten");
    return false;
  }
  // check email
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    alert("Vui long nhap mail dung dinh dang");
    return false;
  }
  // check phone
  let phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (!phoneRegex.test(phone)) {
    alert("Vui long nhap so dien thoai dung dinh dang so dien thoai Viet Nam");
    return false;
  }
  // check address
  if (hometown == "") {
    alert("Vui long khong de trong que quan");
    return false;
  }
  return true;
}
// ham tim sinh vien trong danh sach
function getStudentByStudentId(studentId) {
  for (let i = 0; i < studentList.length; i++) {
    if (studentList[i][0] === studentId) {
      return i;
    }
  }
  return -1;
}
// hàm xóa thong tin tren truong nhap
function clearInputs() {
  document.getElementById("student_id").value = "";
  document.getElementById("fullname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("hometown").value = "";
  document.getElementById("male").checked = true;
}
//ham luu hoac tao sinh vien
function createOrUpdate() {
  if (checkValid()) {
    let studentId = document.getElementById("student_id").value;
    let fullName = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let hometown = document.getElementById("hometown").value;
    let gender = document.querySelector("input[name='gender']:checked").value;
    let index = getStudentByStudentId(studentId);
    // update student
    if (index >= 0) {
      studentList[index][1] = fullName;
      studentList[index][2] = email;
      studentList[index][3] = phone;
      studentList[index][4] = hometown;
      studentList[index][5] = gender;
    } else {
      //create student
      let student = [];
      student.push(studentId, fullName, email, phone, hometown, gender);
      studentList.push(student);
    }
    console.log(studentList);
    renderData();
    clearInputs();
    document.getElementById("student_id").readOnly = false;
  }
}
// ham edit student
function editStudent(studentId) {
  console.log(studentId);
  let index = getStudentByStudentId(studentId);
  console.log(index);
  document.getElementById("student_id").value = studentList[index][0];
  document.getElementById("fullname").value = studentList[index][1];
  document.getElementById("email").value = studentList[index][2];
  document.getElementById("phone").value = studentList[index][3];
  document.getElementById("hometown").value = studentList[index][4];
  if (studentList[index][5] == "Nam") {
    document.getElementById("male").checked = true;
  } else {
    document.getElementById("female").checked = true;
  }
  create = true;
  document.getElementById("student_id").readOnly = true;
}
// ham delete student
function deleteStudent(studentId) {
  let index = getStudentByStudentId(studentId);
  studentList.splice(index, 1);
  renderData();
}
let saveBtn = document.querySelector(".btn");
saveBtn.addEventListener("click", function (event) {
  createOrUpdate();
});
//hàm tìm kiếm
function searchStudent() {
  debugger;
  let searchStudentInfo = document.querySelector("#student_info").value;
  let searchArr = [];
  for (i = 0; i < studentList.length; i++) {
    if (studentList[i].includes(searchStudentInfo)) {
      searchArr.push(studentList[i]);
    }
  }
  let render = document.querySelector(".student_list_item");
  render.innerHTML = "";
  if (searchArr.length == 0) {
    render.innerHTML = " Khong tim thay ket qua";
  } else {
    for (let i = 0; i < searchArr.length; i++) {
      render.innerHTML += `<tr>
                <td>${i + 1}</td>
                <td>${searchArr[i][0]}</td>
                <td>${searchArr[i][1]}</td>
                <td>${searchArr[i][2]}</td>
                <td>${searchArr[i][3]}</td>
                <td>${searchArr[i][4]}</td>
                <td>${searchArr[i][5]}</td>
                <td><a href="#" onclick="editStudent('${
                  searchArr[i][0]
                }')">edit</a>| <a href="#" onclick="deleteStudent('${
        searchArr[i][0]
      }')">delete</a></td>
              </tr>`;
    }
    document.querySelector("#student_info").value = "";
  }
}
let searchStudents = document.querySelector(".search_btn");
searchStudents.addEventListener("click", function (event) {
  searchStudent();
});
// ham săp xếp studentList
let sortStdents = document.querySelector(".sort");
sortStdents.addEventListener("click", function (event) {
  sortStudentList();
  renderData();
});
function sortStudentList() {
  studentList.sort(compareStudentName);
}
function compareStudentName(a, b) {
  let arrNameA = a[1].split(" ");
  let arrNameB = b[1].split(" ");
  let compare = 0;
  if (arrNameA[arrNameA.length - 1] < arrNameB[arrNameB.length - 1]) {
    return (compare = -1);
  } else if (arrNameA[arrNameA.length - 1] > arrNameB[arrNameB.length - 1]) {
    return (compare = 1);
  }
  return compare;
}
// khi chay thi render data
renderData();
