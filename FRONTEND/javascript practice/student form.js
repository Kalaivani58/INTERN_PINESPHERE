// function addStudent() {
//     // Get form values
//     var name = document.getElementById('name').value;
//     var age = document.getElementById('age').value;
//     var grade = document.getElementById('grade').value;

//     // Create a new row in the table
//     var table = document.getElementById('studentTable');
//     var newRow = table.insertRow(table.rows.length);

//     // Insert cell values
//     var cell1 = newRow.insertCell(0);
//     var cell2 = newRow.insertCell(1);
//     var cell3 = newRow.insertCell(2);

//     cell1.innerHTML = name;
//     cell2.innerHTML = age;
//     cell3.innerHTML = grade;

//     // Clear the form fields
//     document.getElementById('name').value = '';
//     document.getElementById('age').value = '';
//     document.getElementById('grade').value = '';
// }


function saveStudent() {
    // Get form values
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var course = document.getElementById('course').value;
    var email = document.getElementById('email').value;

    // Create a new row in the student table
    var table = document.getElementById('studentTable');
    var newRow = table.insertRow(table.rows.length);

    // Insert cell values
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    cell1.innerHTML = name;
    cell2.innerHTML = age;
    cell3.innerHTML = gender;
    cell4.innerHTML = course;
    cell5.innerHTML = email;

    // Add "Delete" button to the "Action" column
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function() {
        deleteStudent(newRow);
    };
    cell6.appendChild(deleteButton);

    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById('course').value = '';
    document.getElementById('email').value = '';
}

function deleteStudent(row) {
    // Delete the selected row
    var table = document.getElementById('studentTable');
    table.deleteRow(row.rowIndex);
}
