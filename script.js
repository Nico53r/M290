window.addEventListener("scroll", function() {
    let header = document.querySelector("header");
    clearTimeout(timer);
    if (window.scrollY <= 5) {
        header.classList.remove("fade-out");
        header.classList.add("fade-in");
    } else {
        header.classList.remove("fade-in");
        header.classList.add("fade-out");
        timer = setTimeout(function() {
            header.classList.remove("fade-out");
        }, 500);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    showRoomDetails();
    loadComments();
});

function showRoomDetails() {
    var roomSelect = document.getElementById("room");
    roomSelect.addEventListener("change", showRoomDetails);
    var roomInfo = document.getElementById("room-info");

    switch (roomSelect.value) {
        case "classroom":
            roomInfo.textContent = "Klassenzimmer - Kapazität: 25 Personen";
            break;
        case "it-room":
            roomInfo.textContent = "IT-Zimmer - Kapazität: 25 Personen";
            break;
        case "sports-hall":
            roomInfo.textContent = "Sporthalle - Kapazität: 25-50 Personen";
            break;
        default:
            roomInfo.textContent = "Bitte wähle einen Raum aus.";
            break;
    }
}


/*
document.getElementById("reserveButton").addEventListener("click", reserveRoom);

function reserveRoom() {
    var roomSelect = document.getElementById("room").value;
    var date = document.getElementById("date").value;

    var reservationData = {
        room: roomSelect,
        date: date
    };


    fetch('/M290/data.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            if (data) {
                alert('Reservierung erfolgreich gespeichert!');
            }
        })
        .catch(error => {
            console.error('There was a problem with the reservation:', error);
        });
}
*/


function reserveRoom() {
    var roomSelect = document.getElementById("room").value;
    var date = document.getElementById("date").value;
    var prename = document.getElementById("prename-text").value;
    var name = document.getElementById("name-text").value;

    var reservationData = {
        room: roomSelect,
        date: date,
        prename: prename,
        name: name
    };


    localStorage.setItem('reservationData', JSON.stringify(reservationData));

    fetch('/M290/data.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            if (data) {
                alert('Reservierung erfolgreich gespeichert!');
            }
        })
        .catch(error => {
            console.error('There was a problem with the reservation:', error);
        });
}

document.getElementById("reserveButton").addEventListener("click", reserveRoom);

function addComment() {
    var commentText = document.getElementById("comment-text").value;
    var commentList = document.getElementById("comment-list");

    if (commentText.trim() !== "") {
        var li = document.createElement("li");
        li.textContent = commentText;
        commentList.appendChild(li);

        saveCommentToLocalStorage(commentText);

        document.getElementById("comment-text").value = "";
    }
}

function saveCommentToLocalStorage(comment) {
    // Überprüfen, ob bereits Kommentare im localStorage gespeichert sind
    var comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Kommentar hinzufügen
    comments.push(comment);

    // Kommentare im localStorage aktualisieren
    localStorage.setItem('comments', JSON.stringify(comments));
}
function loadComments() {
    var commentList = document.getElementById("comment-list");
    var comments = JSON.parse(localStorage.getItem('comments')) || [];

    commentList.innerHTML = '';

    comments.forEach(function (comment) {
        var li = document.createElement("li");
        li.textContent = comment;
        commentList.appendChild(li);
    });
}

window.addEventListener('load', function () {
    loadComments();
});

function rescheduleReservation() {
    var newDate = document.getElementById("new-date").value;
    alert("Termin verschoben auf: " + newDate);
}
