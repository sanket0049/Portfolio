document.addEventListener("DOMContentLoaded", function() {
    let words = document.querySelectorAll(".word");

    words.forEach((word) => {
        let letters = word.textContent.split("");
        word.textContent = "";
        letters.forEach((letter) => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.className = "letter";
            word.append(span);
        });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    let changeText = () => {
        let currentWord = words[currentWordIndex];
        let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.className = "letter out";
            }, i * 80);
        });

        nextWord.style.opacity = "1";

        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = "letter behind";
            setTimeout(() => {
                letter.className = "letter in";
            }, 340 + i * 80);
        });

        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    changeText();
    setInterval(changeText, 3000);

    const circles = document.querySelectorAll('.circle');
    circles.forEach(elem => {
        let dots = elem.getAttribute("data-dots");
        let marked = elem.getAttribute("data-percent");
        let percent = Math.floor(dots * marked / 100);
        let points = "";
        let rotate = 360 / dots;

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }
        elem.innerHTML = points;

        const pointsMarked = elem.querySelectorAll('.points');
        for (let i = 0; i < percent; i++) {
            pointsMarked[i].classList.add('marked');
        }
    });

    let menuLi = document.querySelectorAll('header ul li a');
    let sections = document.querySelectorAll('section');

    function activeMenu() {
        let len = sections.length;
        while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
        menuLi.forEach(sec => sec.classList.remove("active"));
        menuLi[len].classList.add("active");
    }

    activeMenu();
    window.addEventListener("scroll", activeMenu);

    const header = document.querySelector("header");
    window.addEventListener("scroll", function() {
        header.classList.toggle("sticky", window.scrollY > 50);
    });

    // Contact Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            address: formData.get('address'),
            number: formData.get('number'),
            message: formData.get('message')
        };

        sendEmail(data);
    });

    function sendEmail(data) {
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "sanketh094@gmail.com",
            Password: "7789D53F0620AC78C84CD7F72F5CCDD08FD4",
            To: 'sanketh094@gmail.com',
            From: "sanketh094@gmail.com",
            Subject: `New contact from ${data.name}`,
            Body: `Name: ${data.name}<br>Email: ${data.email}<br>Address: ${data.address}<br>Number: ${data.number}<br>Message: ${data.message}`
        }).then(
            message => alert("Your message has been sent successfully!")
        ).catch(
            error => alert("Failed to send message. Please try again later.")
        );
    }
});
